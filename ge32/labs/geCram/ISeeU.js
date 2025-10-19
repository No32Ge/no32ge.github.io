(function() {
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlugin);
  } else {
    initPlugin();
  }

  function initPlugin() {
    // 检查是否已有容器
    let container = document.getElementById('gecram');
    if (!container) {
      container = document.createElement('div');
      container.id = 'gecram';
      document.body.appendChild(container);
    }

    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
      .camera-plugin-floating-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 24px;
        transition: all 0.3s ease;
        border: none;
        overflow: hidden;
      }
      
      .camera-plugin-floating-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(0,0,0,0.4);
      }
      
      .camera-plugin-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        z-index: 10001;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
      }
      
      .camera-plugin-modal.active {
        display: flex;
      }
      
      .camera-plugin-content {
        width: 90%;
        max-width: 500px;
        background: linear-gradient(145deg, #1a1a2e, #16213e);
        color: #fff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
      }
      
      .camera-plugin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      .camera-plugin-title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin: 0;
      }
      
      .camera-plugin-header-controls {
        display: flex;
        gap: 10px;
      }
      
      .camera-plugin-header-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
        font-size: 16px;
        transition: all 0.2s;
      }
      
      .camera-plugin-minimize-btn {
        background: rgba(255,193,7,0.2);
        color: #ffc107;
      }
      
      .camera-plugin-minimize-btn:hover {
        background: rgba(255,193,7,0.4);
      }
      
      .camera-plugin-close-btn {
        background: rgba(220,53,69,0.2);
        color: #dc3545;
      }
      
      .camera-plugin-close-btn:hover {
        background: rgba(220,53,69,0.4);
      }
      
      .camera-plugin-body {
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      
      .camera-plugin-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        width: 100%;
      }
      
      .camera-plugin-btn {
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.1);
        color: #eee;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 16px;
        min-width: 140px;
      }
      
      .camera-plugin-btn:hover:not(:disabled) {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
      }
      
      .camera-plugin-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      .camera-plugin-primary-btn {
        background: linear-gradient(135deg, #0066cc, #004499);
        border-color: rgba(255,255,255,0.3);
      }
      
      .camera-plugin-primary-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #0077dd, #0055aa);
      }
      
      .camera-plugin-danger-btn {
        background: linear-gradient(135deg, #cc3300, #992200);
        border-color: rgba(255,255,255,0.3);
      }
      
      .camera-plugin-danger-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #dd4400, #aa3300);
      }
      
      .camera-plugin-success-btn {
        background: linear-gradient(135deg, #008844, #006633);
        border-color: rgba(255,255,255,0.3);
      }
      
      .camera-plugin-success-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #009955, #007744);
      }
      
      .camera-plugin-status {
        color: #aaa;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        min-height: 20px;
      }
      
      .camera-plugin-hidden {
        display: none;
      }
      
      /* 最小化状态下的悬浮球 */
      .camera-plugin-minimized {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 10002;
      }
      
      .camera-plugin-minimized.hidden {
        display: none;
      }
      
      .camera-plugin-photo-btn, .camera-plugin-video-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        position: relative;
        font-size: 20px;
        font-weight: bold;
      }
      
      .camera-plugin-photo-btn {
        background: linear-gradient(135deg, #2575fc, #6a11cb);
        color: white;
      }
      
      .camera-plugin-video-btn {
        background: linear-gradient(135deg, #00b09b, #96c93d);
        color: white;
      }
      
      .camera-plugin-video-btn.recording {
        animation: camera-plugin-pulse 1.5s infinite;
      }
      
      @keyframes camera-plugin-pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        50% {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      }
      
      .camera-plugin-feedback {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .camera-plugin-feedback.show {
        opacity: 1;
      }
      
      .camera-plugin-camera-status {
        color: #ffc107;
        font-size: 14px;
        margin-top: 5px;
        text-align: center;
      }
    `;
    document.head.appendChild(style);

    // 创建主悬浮按钮
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'camera-plugin-floating-btn';
    floatingBtn.innerHTML = '📷';
    floatingBtn.title = '摄像头工具';
    document.body.appendChild(floatingBtn);

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'camera-plugin-modal';
    modal.innerHTML = `
      <div class="camera-plugin-content">
        <div class="camera-plugin-header">
          <h2 class="camera-plugin-title">摄像头工具</h2>
          <div class="camera-plugin-header-controls">
            <button class="camera-plugin-header-btn camera-plugin-minimize-btn" title="最小化">−</button>
            <button class="camera-plugin-header-btn camera-plugin-close-btn" title="关闭">×</button>
          </div>
        </div>
        <div class="camera-plugin-body">
          <div class="camera-plugin-camera-status" id="cameraTypeStatus">当前摄像头: 前置</div>
          <div class="camera-plugin-controls">
            <button class="camera-plugin-btn camera-plugin-primary-btn camera-plugin-capture-btn">拍照</button>
            <button class="camera-plugin-btn camera-plugin-success-btn camera-plugin-record-btn">开始录像</button>
            <button class="camera-plugin-btn camera-plugin-danger-btn camera-plugin-stop-record-btn" disabled>停止录像</button>
            <button class="camera-plugin-btn camera-plugin-switch-camera-btn">切换摄像头</button>
          </div>
          <div class="camera-plugin-status" id="cameraStatus">点击按钮开始操作</div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 创建最小化状态下的悬浮球
    const minimizedPanel = document.createElement('div');
    minimizedPanel.className = 'camera-plugin-minimized hidden';
    minimizedPanel.innerHTML = `
      <div class="camera-plugin-photo-btn" title="拍照">
        📷
        <div class="camera-plugin-feedback"></div>
      </div>
      <div class="camera-plugin-video-btn" title="开始录像">
        ⚪
        <div class="camera-plugin-feedback"></div>
      </div>
    `;
    document.body.appendChild(minimizedPanel);

    // 创建隐藏的视频和画布元素（用于捕获媒体）
    const video = document.createElement('video');
    video.className = 'camera-plugin-hidden';
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    canvas.className = 'camera-plugin-hidden';
    document.body.appendChild(canvas);

    // 获取DOM元素
    const captureBtn = modal.querySelector('.camera-plugin-capture-btn');
    const recordBtn = modal.querySelector('.camera-plugin-record-btn');
    const stopRecordBtn = modal.querySelector('.camera-plugin-stop-record-btn');
    const switchCameraBtn = modal.querySelector('.camera-plugin-switch-camera-btn');
    const minimizeBtn = modal.querySelector('.camera-plugin-minimize-btn');
    const closeBtn = modal.querySelector('.camera-plugin-close-btn');
    const statusElement = modal.querySelector('.camera-plugin-status');
    const cameraTypeStatus = modal.querySelector('.camera-plugin-camera-status');

    const photoBtn = minimizedPanel.querySelector('.camera-plugin-photo-btn');
    const videoBtn = minimizedPanel.querySelector('.camera-plugin-video-btn');
    const photoFeedback = photoBtn.querySelector('.camera-plugin-feedback');
    const videoFeedback = videoBtn.querySelector('.camera-plugin-feedback');

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;

    // 状态变量
    let stream = null;
    let mediaRecorder = null;
    let recordedChunks = [];
    let currentFacingMode = 'user';
    let db = null;
    const DB_NAME = 'CameraAppDB';
    const DB_VERSION = 1;
    const STORE_NAME = 'media';

    // 音频状态
    let audioStream = null;

    // 录像状态
    let isRecording = false;

    // 持续把 video 帧绘制到 canvas
    function startDrawingLoop() {
      // 如果没有流或 video 还没准备好，继续等待并重试
      if (!stream || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(startDrawingLoop);
        return;
      }

      // 绘制当前帧（前置摄像头镜像）
      if (currentFacingMode === 'user') {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      // 循环
      animationFrameId = requestAnimationFrame(startDrawingLoop);
    }

    // 初始化IndexedDB
    function initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          db = request.result;
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            store.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      });
    }

    // 保存媒体到IndexedDB
    function saveMediaToDB(blob, type) {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('数据库未初始化'));
          return;
        }

        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const mediaItem = {
          blob: blob,
          type: type,
          timestamp: Date.now()
        };

        const request = store.add(mediaItem);

        request.onsuccess = () => {
          resolve(request.result);
          updateStatus(`${type === 'photo' ? '照片' : '视频'}已保存`);
        };

        request.onerror = () => reject(request.error);
      });
    }

    // 开始摄像头
    async function startCamera() {
      try {
        // 停止之前的流
        if (stream) {
          stopCamera();
        }

        // 获取新的媒体流
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: currentFacingMode
          },
          audio: false
        });

        video.srcObject = stream;
        await video.play();

        // 调整 canvas 尺寸匹配视频
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        // 启动画面绘制循环
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        startDrawingLoop();

        // 更新UI状态
        captureBtn.disabled = false;
        recordBtn.disabled = false;

        // 更新摄像头类型显示
        updateCameraTypeStatus();
        updateStatus('摄像头已启动');
      } catch (e) {
        updateStatus('获取摄像头失败：' + (e && e.message));
      }
    }

    // 停止摄像头
    function stopCamera() {
      // 停止录像（如果正在录制）
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
      }

      // 停止音频流
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
      }

      // 停止媒体流
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
      }

      // 更新UI状态
      captureBtn.disabled = true;
      recordBtn.disabled = true;
      stopRecordBtn.disabled = true;
      stopRecordBtn.style.display = 'none';
      recordBtn.style.display = 'inline-block';

      // 更新录像按钮状态
      isRecording = false;
      updateVideoButtonState();

      updateStatus('摄像头已停止');
    }

    // 切换摄像头
    function switchCamera() {
      currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

      // 如果摄像头正在运行，则重新启动
      if (stream) {
        startCamera();
      } else {
        updateCameraTypeStatus();
        updateStatus(`已切换到${currentFacingMode === 'user' ? '前置' : '后置'}摄像头`);
      }
    }

    // 更新摄像头类型显示
    function updateCameraTypeStatus() {
      cameraTypeStatus.textContent = `当前摄像头: ${currentFacingMode === 'user' ? '前置' : '后置'}`;
    }

    // 拍照
    function capturePhoto() {
      if (!stream) return;

      // 绘制当前视频帧到canvas
      if (currentFacingMode === 'user') {
        // 前置摄像头：镜像显示
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        // 后置摄像头：正常显示（不镜像）
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob(async (blob) => {
        try {
          await saveMediaToDB(blob, 'photo');
          showFeedback(photoFeedback, '✓', '#00ff00');
        } catch (e) {
          console.error('保存照片失败:', e);
          updateStatus('保存照片失败: ' + e.message);
          showFeedback(photoFeedback, '✗', '#ff0000');
        }
      }, 'image/png');
    }

    // 显示反馈
    function showFeedback(element, symbol, color) {
      element.textContent = symbol;
      element.style.color = color;
      element.classList.add('show');

      setTimeout(() => {
        element.classList.remove('show');
      }, 1000);
    }

    // 开始录像
    async function startRecording() {
      if (!stream) return;

      try {
        // 创建混合流
        const canvasStream = canvas.captureStream(30);

        // 获取音频流并合并
        try {
          audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioTracks = audioStream.getAudioTracks();
          if (audioTracks.length > 0) {
            canvasStream.addTrack(audioTracks[0]);
          }
        } catch (e) {
          console.warn('无法获取音频流:', e);
          updateStatus('无法访问麦克风，将录制无声视频');
        }

        // 创建媒体记录器
        const options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'video/webm;codecs=vp8';
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm';
          }
        }

        mediaRecorder = new MediaRecorder(canvasStream, options);

        recordedChunks = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          try {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            await saveMediaToDB(blob, 'video');
            showFeedback(videoFeedback, '✓', '#00ff00');
          } catch (e) {
            console.error('保存视频失败:', e);
            updateStatus('保存视频失败: ' + e.message);
            showFeedback(videoFeedback, '✗', '#ff0000');
          }
        };

        // 开始录制
        mediaRecorder.start();

        // 更新UI状态
        recordBtn.style.display = 'none';
        stopRecordBtn.style.display = 'inline-block';
        stopRecordBtn.disabled = false;

        // 更新录像按钮状态
        isRecording = true;
        updateVideoButtonState();

        updateStatus('正在录制视频...');

      } catch (e) {
        console.error('录像启动失败:', e);
        updateStatus('录像启动失败: ' + e.message);
      }
    }

    // 停止录像
    function stopRecording() {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();

        // 停止音频流
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          audioStream = null;
        }

        // 更新UI状态
        recordBtn.style.display = 'inline-block';
        stopRecordBtn.style.display = 'none';

        // 更新录像按钮状态
        isRecording = false;
        updateVideoButtonState();

        updateStatus('视频录制已停止');
      }
    }

    // 更新录像按钮状态
    function updateVideoButtonState() {
      if (isRecording) {
        videoBtn.classList.add('recording');
        videoBtn.innerHTML = '⏹️<div class="camera-plugin-feedback"></div>';
        videoBtn.title = '停止录像';
      } else {
        videoBtn.classList.remove('recording');
        videoBtn.innerHTML = '⚪<div class="camera-plugin-feedback"></div>';
        videoBtn.title = '开始录像';
      }
    }

    // 更新状态显示
    function updateStatus(message) {
      statusElement.textContent = message;
    }

    // 最小化模态框
    function minimizeModal() {
      modal.classList.remove('active');
      minimizedPanel.classList.remove('hidden');
      floatingBtn.style.display = 'none';
    }

    // 关闭模态框
    function closeModal() {
      modal.classList.remove('active');
      minimizedPanel.classList.add('hidden');
      floatingBtn.style.display = 'flex';
      stopCamera();
    }

    // 初始化应用
    async function initApp() {
      try {
        await initDB();
        updateStatus('摄像头工具已就绪');
      } catch (e) {
        console.error('初始化应用失败:', e);
        updateStatus('初始化失败');
      }
    }

    // 事件监听器
    captureBtn.addEventListener('click', capturePhoto);
    recordBtn.addEventListener('click', startRecording);
    stopRecordBtn.addEventListener('click', stopRecording);
    switchCameraBtn.addEventListener('click', switchCamera);

    // 最小化按钮
    minimizeBtn.addEventListener('click', minimizeModal);

    // 关闭按钮
    closeBtn.addEventListener('click', closeModal);

    // 悬浮按钮点击事件
    floatingBtn.addEventListener('click', () => {
      modal.classList.add('active');
      startCamera();
    });

    // 最小化状态下的按钮事件
    photoBtn.addEventListener('click', capturePhoto);
    videoBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // 页面卸载时停止摄像头
    window.addEventListener('beforeunload', stopCamera);

    // 初始化应用
    initApp();
  }
})();
