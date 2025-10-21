export class PixelRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.width = 0;
    this.height = 0;
    this.frames = [];
    this.scale = 4;
    this.fps = 12;
    this.playing = false;
    this.current = 0;
  }

  async fromImageFile(file, layerIndex = 0, frameIndex = 0) {
    const img = await this._loadImage(file);
    const { width, height } = img;
    if (!this.width || !this.height) {
      this.width = width;
      this.height = height;
      this._resizeCanvas();
    }
    const tmp = document.createElement("canvas");
    tmp.width = width;
    tmp.height = height;
    const ctx = tmp.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, width, height).data;

    if (!this.frames[frameIndex]) this.frames[frameIndex] = [];
    const layer = new Array(height);
    for (let y = 0; y < height; y++) {
      layer[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        layer[y][x] = {
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
          a: data[i + 3] / 255,
        };
      }
    }
    this.frames[frameIndex][layerIndex] = layer;
  }

  /** 新功能：从音频文件生成帧序列（频谱或波形） */
  async fromAudioFile(file, mode = "spectrum") {
    // mode 可选 "spectrum" 或 "waveform"
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const raw = audioBuffer.getChannelData(0);
    const frameCount = Math.floor(audioBuffer.duration * this.fps);
    const frameSize = Math.floor(raw.length / frameCount);

    // 默认画布大小
    this.width = 128;
    this.height = 64;
    this._resizeCanvas();
    this.frames = [];

    for (let f = 0; f < frameCount; f++) {
      const start = f * frameSize;
      const end = start + frameSize;
      const segment = raw.slice(start, end);

      // FFT频谱数据
      let values;
      if (mode === "spectrum") {
        values = this._fft(segment, this.width);
      } else {
        values = this._waveform(segment, this.width);
      }

      // 转像素层
      const layer = new Array(this.height);
      for (let y = 0; y < this.height; y++) {
        layer[y] = new Array(this.width).fill({ r: 0, g: 0, b: 0, a: 1 });
      }
      for (let x = 0; x < this.width; x++) {
        const v = values[x];
        const h = Math.floor((v / 1.0) * this.height);
        for (let y = this.height - 1; y >= this.height - h; y--) {
          const c = Math.min(255, 50 + v * 200);
          layer[y][x] = { r: c, g: c * 0.8, b: 255 - c * 0.5, a: 1 };
        }
      }
      this.frames.push([layer]);
    }

    this.render(0);
  }

  /** FFT简化实现（快速频谱生成） */
  _fft(signal, bins) {
    const N = signal.length;
    const step = Math.floor(N / bins);
    const result = new Array(bins).fill(0);
    for (let i = 0; i < bins; i++) {
      let sum = 0;
      for (let j = i * step; j < (i + 1) * step; j++) {
        sum += Math.abs(signal[j] || 0);
      }
      result[i] = sum / step;
    }
    return result;
  }

  /** 波形生成 */
  _waveform(signal, bins) {
    const N = signal.length;
    const step = Math.floor(N / bins);
    const result = new Array(bins).fill(0);
    for (let i = 0; i < bins; i++) {
      let avg = 0;
      for (let j = i * step; j < (i + 1) * step; j++) {
        avg += Math.abs(signal[j] || 0);
      }
      result[i] = avg / step;
    }
    return result;
  }

  toImage(frameIndex = 0, scale = this.scale) {
    const frame = this.frames[frameIndex];
    if (!frame) return;
    const img = this._composeFrame(frame);
    const off = document.createElement("canvas");
    off.width = this.width;
    off.height = this.height;
    const ctx = off.getContext("2d");
    ctx.putImageData(img, 0, 0);
    const scaled = document.createElement("canvas");
    scaled.width = this.width * scale;
    scaled.height = this.height * scale;
    const sctx = scaled.getContext("2d");
    sctx.imageSmoothingEnabled = false;
    sctx.drawImage(off, 0, 0, scaled.width, scaled.height);
    const link = document.createElement("a");
    link.href = scaled.toDataURL("image/png");
    link.download = `frame_${frameIndex}.png`;
    link.click();
  }

  render(frameIndex = this.current) {
    if (!this.frames.length) return;
    const frame = this.frames[frameIndex];
    if (!frame) return;
    const img = this._composeFrame(frame);
    const off = document.createElement("canvas");
    off.width = this.width;
    off.height = this.height;
    const ctx = off.getContext("2d");
    ctx.putImageData(img, 0, 0);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(off, 0, 0, this.canvas.width, this.canvas.height);
  }

  play() {
    if (this.playing) return;
    this.playing = true;
    const loop = () => {
      if (!this.playing) return;
      this.render(this.current);
      this.current = (this.current + 1) % this.frames.length;
      setTimeout(loop, 1000 / this.fps);
    };
    loop();
  }
  pause() {
    this.playing = false;
  }

  exportGEPIC() {
    const header = new TextEncoder().encode("GEPIC");
    const meta = new Uint8Array(6);
    const view = new DataView(meta.buffer);
    view.setUint16(0, this.width, true);
    view.setUint16(2, this.height, true);
    view.setUint8(4, 1);
    view.setUint8(5, this.frames.length);
    const frameSize = this.width * this.height * 3;
    const data = new Uint8Array(frameSize * this.frames.length);
    let offset = 0;
    for (const frame of this.frames) {
      const composed = this._composeFrame(frame);
      for (let i = 0; i < composed.data.length; i += 4) {
        data[offset++] = composed.data[i];
        data[offset++] = composed.data[i + 1];
        data[offset++] = composed.data[i + 2];
      }
    }
    const blob = new Blob([header, meta, data], {
      type: "application/octet-stream",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "output.gepic";
    a.click();
  }

  async importGEPIC(file) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const header = new TextDecoder().decode(bytes.slice(0, 5));
    if (header !== "GEPIC") throw new Error("Invalid GEPIC file.");

    const view = new DataView(buffer, 5, 6);
    const width = view.getUint16(0, true);
    const height = view.getUint16(2, true);
    const layers = view.getUint8(4);
    const frames = view.getUint8(5);

    this.width = width;
    this.height = height;
    this.frames = [];

    let offset = 11;
    for (let f = 0; f < frames; f++) {
      const layer = new Array(height);
      for (let y = 0; y < height; y++) {
        layer[y] = new Array(width);
        for (let x = 0; x < width; x++) {
          const i = offset;
          const r = bytes[i],
            g = bytes[i + 1],
            b = bytes[i + 2];
          layer[y][x] = { r, g, b, a: 1 };
          offset += 3;
        }
      }
      this.frames[f] = [layer];
    }
    this._resizeCanvas();
    this.render(0);
  }

  _composeFrame(layers) {
    const img = this.ctx.createImageData(this.width, this.height);
    const data = img.data;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
        for (let l = 0; l < layers.length; l++) {
          const px = layers[l]?.[y]?.[x];
          if (!px) continue;
          const alpha = px.a ?? 1;
          const pr = px.r * alpha,
            pg = px.g * alpha,
            pb = px.b * alpha;
          r = pr + r * (1 - alpha);
          g = pg + g * (1 - alpha);
          b = pb + b * (1 - alpha);
          a = alpha + a * (1 - alpha);
          if (a > 0.999) break;
        }
        const i = (y * this.width + x) * 4;
        data[i] = Math.round(r / a || 0);
        data[i + 1] = Math.round(g / a || 0);
        data[i + 2] = Math.round(b / a || 0);
        data[i + 3] = Math.round(a * 255);
      }
    }
    return img;
  }

  _resizeCanvas() {
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
  }

  _loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}
