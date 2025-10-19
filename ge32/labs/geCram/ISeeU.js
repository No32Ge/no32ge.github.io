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
      .iseeu-floating-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 24px;
        transition: all 0.3s ease;
        border: none;
        overflow: hidden;
      }
      
      .iseeu-floating-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      }
      
      .iseeu-floating-btn svg {
        width: 30px;
        height: 30px;
        fill: white;
      }
      
      .iseeu-modal {
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
      
      .iseeu-modal.active {
        display: flex;
      }
      
      .iseeu-content {
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
      
      .iseeu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      
      .iseeu-title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .iseeu-title svg {
        width: 24px;
        height: 24px;
        fill: #3498db;
      }
      
      .iseeu-header-controls {
        display: flex;
        gap: 10px;
      }
      
      .iseeu-header-btn {
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
        background: rgba(255,255,255,0.1);
        color: #fff;
      }
      
      .iseeu-minimize-btn:hover {
        background: rgba(255,193,7,0.4);
      }
      
      .iseeu-close-btn:hover {
        background: rgba(220,53,69,0.4);
      }
      
      .iseeu-body {
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      
      .iseeu-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        width: 100%;
      }
      
      .iseeu-btn {
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.1);
        color: #eee;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 16px;
        min-width: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .iseeu-btn:hover:not(:disabled) {
        background: rgba(255,255,255,0.2);
        transform: translateY(-2px);
      }
      
      .iseeu-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      .iseeu-primary-btn {
        background: linear-gradient(135deg, #3498db, #2980b9);
        border-color: rgba(255,255,255,0.3);
      }
      
      .iseeu-primary-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #3ca0db, #2c88c7);
      }
      
      .iseeu-danger-btn {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        border-color: rgba(255,255,255,0.3);
      }
      
      .iseeu-danger-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #ea6153, #d35400);
      }
      
      .iseeu-success-btn {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        border-color: rgba(255,255,255,0.3);
      }
      
      .iseeu-success-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #36d278, #2ecc71);
      }
      
      .iseeu-status {
        color: #aaa;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        min-height: 20px;
      }
      
      .iseeu-hidden {
        display: none;
      }
      
      /* 最小化状态下的悬浮球 */
      .iseeu-minimized {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 10002;
      }
      
      .iseeu-minimized.hidden {
        display: none;
      }
      
      .iseeu-mini-btn {
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
      
      .iseeu-photo-btn {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
      }
      
      .iseeu-video-btn {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
      }
      
      .iseeu-menu-btn {
        background: linear-gradient(135deg, #3498db, #2980b9);
      }
      
      .iseeu-video-btn.recording {
        animation: iseeu-pulse 1.5s infinite;
      }
      
      @keyframes iseeu-pulse {
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
      
      .iseeu-feedback {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .iseeu-feedback.show {
        opacity: 1;
      }
      
      .iseeu-camera-status {
        color: #ffc107;
        font-size: 14px;
        margin-top: 5px;
        text-align: center;
      }
      
      .iseeu-mini-btn svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
    `;
    document.head.appendChild(style);

    // ISU SVG图标
    const isuSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#3498db" stroke="#2980b9" stroke-width="2"/>
      <text x="50" y="65" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">ISU</text>
    </svg>`;
    
    // 相机SVG图标
    const cameraSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path d="M20 4h-3.17l-1.24-1.35A1 1 0 0 0 15 2H9a1 1 0 0 0-.59.18L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
    </svg>`;
    
    // 视频SVG图标
    const videoSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>`;
    
    // 切换摄像头SVG图标
    const switchSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    </svg>`;

    // 创建主悬浮按钮
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'iseeu-floating-btn';
    floatingBtn.innerHTML = isuSvg;
    floatingBtn.title = 'ISeeU摄像头工具';
    document.body.appendChild(floatingBtn);

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'iseeu-modal';
    modal.innerHTML = `
      <div class="iseeu-content">
        <div class="iseeu-header">
          <h2 class="iseeu-title">
            ${isuSvg}
            ISeeU摄像头工具
          </h2>
          <div class="iseeu-header-controls">
            <button class="iseeu-header-btn iseeu-minimize-btn" title="最小化">−</button>
            <button class="iseeu-header-btn iseeu-close-btn" title="关闭">×</button>
          </div>
        </div>
        <div class="iseeu-body">
          <div class="iseeu-camera-status" id="cameraTypeStatus">当前摄像头: 前置</div>
          <div class="iseeu-controls">
            <button class="iseeu-btn iseeu-primary-btn iseeu-capture-btn">
              ${cameraSvg}
              拍照
            </button>
            <button class="iseeu-btn iseeu-success-btn iseeu-record-btn">
              ${videoSvg}
              开始录像
            </button>
            <button class="iseeu-btn iseeu-danger-btn iseeu-stop-record-btn" disabled>
              ${videoSvg}
              停止录像
            </button>
            <button class="iseeu-btn iseeu-switch-camera-btn">
              ${switchSvg}
              切换摄像头
            </button>
          </div>
          <div class="iseeu-status" id="cameraStatus">点击按钮开始操作</div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // 创建最小化状态下的悬浮球
    const minimizedPanel = document.createElement('div');
    minimizedPanel.className = 'iseeu-minimized hidden';
    minimizedPanel.innerHTML = `
      <div class="iseeu-mini-btn iseeu-photo-btn" title="拍照">
        ${cameraSvg}
        <div class="iseeu-feedback"></div>
      </div>
      <div class="iseeu-mini-btn iseeu-video-btn" title="开始录像">
        ${videoSvg}
        <div class="iseeu-feedback"></div>
      </div>
      <div class="iseeu-mini-btn iseeu-menu-btn" title="打开菜单">
        ${isuSvg}
      </div>
    `;
    document.body.appendChild(minimizedPanel);

    // 创建隐藏的视频和画布元素（用于捕获媒体）
    const video = document.createElement('video');
    video.className = 'iseeu-hidden';
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    canvas.className = 'iseeu-hidden';
    document.body.appendChild(canvas);

    // 获取DOM元素
    const captureBtn = modal.querySelector('.iseeu-capture-btn');
    const recordBtn = modal.querySelector('.iseeu-record-btn');
    const stopRecordBtn = modal.querySelector('.iseeu-stop-record-btn');
    const switchCameraBtn = modal.querySelector('.iseeu-switch-camera-btn');
    const minimizeBtn = modal.querySelector('.iseeu-minimize-btn');
    const closeBtn = modal.querySelector('.iseeu-close-btn');
    const statusElement = modal.querySelector('.iseeu-status');
    const cameraTypeStatus = modal.querySelector('.iseeu-camera-status');

    const photoBtn = minimizedPanel.querySelector('.iseeu-photo-btn');
    const videoBtn = minimizedPanel.querySelector('.iseeu-video-btn');
    const menuBtn = minimizedPanel.querySelector('.iseeu-menu-btn');
    const photoFeedback = photoBtn.querySelector('.iseeu-feedback');
    const videoFeedback = videoBtn.querySelector('.iseeu-feedback');

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

    // 视频配置参数（可由外部API修改）
    let videoConfig = {
      width: 640,
      height: 480,
      scale: 1.0,
      frameRate: 30,
      mirror: true
    };

    // 持续把 video 帧绘制到 canvas
    function startDrawingLoop() {
      // 如果没有流或 video 还没准备好，继续等待并重试
      if (!stream || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(startDrawingLoop);
        return;
      }

      // 应用视频配置
      canvas.width = videoConfig.width;
      canvas.height = videoConfig.height;

      // 绘制当前帧（根据配置决定是否镜像）
      if (currentFacingMode === 'user' && videoConfig.mirror) {
        // 前置摄像头：镜像显示
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width * videoConfig.scale, canvas.height * videoConfig.scale);
        ctx.restore();
      } else {
        // 后置摄像头：正常显示（不镜像）
        ctx.drawImage(video, 0, 0, canvas.width * videoConfig.scale, canvas.height * videoConfig.scale);
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

    // 从IndexedDB获取所有媒体
    function getAllMediaFromDB() {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('数据库未初始化'));
          return;
        }
        
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('timestamp');
        const request = index.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    // 从IndexedDB删除媒体
    function deleteMediaFromDB(id) {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('数据库未初始化'));
          return;
        }
        
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => {
          resolve();
        };
        
        request.onerror = () => reject(request.error);
      });
    }

    // 清空所有存储
    function clearAllStorage() {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('数据库未初始化'));
          return;
        }
        
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        
        request.onsuccess = () => {
          resolve();
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
            width: { ideal: videoConfig.width },
            height: { ideal: videoConfig.height },
            frameRate: { ideal: videoConfig.frameRate },
            facingMode: currentFacingMode
          },
          audio: false
        });

        video.srcObject = stream;
        await video.play();

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
      recordBtn.style.display = 'flex';

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
      if (currentFacingMode === 'user' && videoConfig.mirror) {
        // 前置摄像头：镜像显示
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width * videoConfig.scale, canvas.height * videoConfig.scale);
        ctx.restore();
      } else {
        // 后置摄像头：正常显示（不镜像）
        ctx.drawImage(video, 0, 0, canvas.width * videoConfig.scale, canvas.height * videoConfig.scale);
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
        const canvasStream = canvas.captureStream(videoConfig.frameRate);

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
        stopRecordBtn.style.display = 'flex';
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
        recordBtn.style.display = 'flex';
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
        videoBtn.title = '停止录像';
      } else {
        videoBtn.classList.remove('recording');
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

    // 打开模态框
    function openModal() {
      modal.classList.add('active');
      minimizedPanel.classList.add('hidden');
      floatingBtn.style.display = 'none';
      if (!stream) {
        startCamera();
      }
    }

    // 初始化应用
    async function initApp() {
      try {
        await initDB();
        updateStatus('ISeeU插件已就绪');
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
    floatingBtn.addEventListener('click', openModal);

    // 最小化状态下的按钮事件
    photoBtn.addEventListener('click', capturePhoto);
    videoBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    });
    menuBtn.addEventListener('click', openModal);

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

    // ==================== 公共API方法 ====================
    // 这些方法供外部调用，用于访问存储的媒体文件和视频流
    
    // 获取所有媒体文件列表
    window.ISeeU = window.ISeeU || {};
    window.ISeeU.getMediaList = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        // 按时间戳排序（最新的在前）
        return allMedia.sort((a, b) => b.timestamp - a.timestamp);
      } catch (e) {
        console.error('获取媒体列表失败:', e);
        throw e;
      }
    };

    // 获取所有照片
    window.ISeeU.getPhotos = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        return allMedia
          .filter(item => item.type === 'photo')
          .sort((a, b) => b.timestamp - a.timestamp);
      } catch (e) {
        console.error('获取照片列表失败:', e);
        throw e;
      }
    };

    // 获取所有视频
    window.ISeeU.getVideos = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        return allMedia
          .filter(item => item.type === 'video')
          .sort((a, b) => b.timestamp - a.timestamp);
      } catch (e) {
        console.error('获取视频列表失败:', e);
        throw e;
      }
    };

    // 根据ID获取单个媒体项
    window.ISeeU.getMediaById = async function(id) {
      return new Promise((resolve, reject) => {
        if (!db) {
          reject(new Error('数据库未初始化'));
          return;
        }
        
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    };

    // 根据ID删除媒体项
    window.ISeeU.deleteMedia = async function(id) {
      try {
        await deleteMediaFromDB(id);
        return true;
      } catch (e) {
        console.error('删除媒体失败:', e);
        throw e;
      }
    };

    // 清空所有存储的媒体
    window.ISeeU.clearAllMedia = async function() {
      try {
        await clearAllStorage();
        return true;
      } catch (e) {
        console.error('清空存储失败:', e);
        throw e;
      }
    };

    // 获取存储统计信息
    window.ISeeU.getStorageInfo = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        const photos = allMedia.filter(item => item.type === 'photo');
        const videos = allMedia.filter(item => item.type === 'video');
        
        // 计算总大小
        let totalSize = 0;
        allMedia.forEach(item => {
          totalSize += item.blob.size;
        });
        
        return {
          totalItems: allMedia.length,
          photos: photos.length,
          videos: videos.length,
          totalSize: totalSize,
          totalSizeFormatted: formatBytes(totalSize)
        };
      } catch (e) {
        console.error('获取存储信息失败:', e);
        throw e;
      }
    };

    // ==================== 视频流API ====================
    
    // 获取原始视频流
    window.ISeeU.getVideoStream = function() {
      if (!stream) {
        throw new Error('摄像头未启动，请先调用 startCamera() 或打开插件界面');
      }
      return stream;
    };

    // 获取处理后的视频流（经过canvas处理）
    window.ISeeU.getProcessedVideoStream = function() {
      if (!stream) {
        throw new Error('摄像头未启动，请先调用 startCamera() 或打开插件界面');
      }
      return canvas.captureStream(videoConfig.frameRate);
    };

    // 获取当前视频配置
    window.ISeeU.getVideoConfig = function() {
      return { ...videoConfig };
    };

    // 设置视频配置
    window.ISeeU.setVideoConfig = function(config) {
      // 合并配置
      videoConfig = { ...videoConfig, ...config };
      
      // 如果摄像头正在运行，重新启动以应用新配置
      if (stream) {
        startCamera();
      }
      
      return videoConfig;
    };

    // 设置视频尺寸
    window.ISeeU.setVideoSize = function(width, height) {
      videoConfig.width = width;
      videoConfig.height = height;
      
      // 如果摄像头正在运行，重新启动以应用新尺寸
      if (stream) {
        startCamera();
      }
      
      return videoConfig;
    };

    // 设置视频缩放
    window.ISeeU.setVideoScale = function(scale) {
      videoConfig.scale = Math.max(0.1, Math.min(5, scale)); // 限制缩放范围
      return videoConfig;
    };

    // 设置帧率
    window.ISeeU.setFrameRate = function(frameRate) {
      videoConfig.frameRate = Math.max(1, Math.min(60, frameRate)); // 限制帧率范围
      
      // 如果摄像头正在运行，重新启动以应用新帧率
      if (stream) {
        startCamera();
      }
      
      return videoConfig;
    };

    // 设置镜像模式
    window.ISeeU.setMirrorMode = function(enabled) {
      videoConfig.mirror = enabled;
      return videoConfig;
    };

    // 启动摄像头（外部调用）
    window.ISeeU.startCamera = async function(config) {
      if (config) {
        videoConfig = { ...videoConfig, ...config };
      }
      await startCamera();
      return stream;
    };

    // 停止摄像头（外部调用）
    window.ISeeU.stopCamera = function() {
      stopCamera();
    };

    // 拍照（外部调用）
    window.ISeeU.capturePhoto = function() {
      if (!stream) {
        throw new Error('摄像头未启动');
      }
      capturePhoto();
    };

    // 开始录像（外部调用）
    window.ISeeU.startRecording = async function() {
      if (!stream) {
        throw new Error('摄像头未启动');
      }
      await startRecording();
    };

    // 停止录像（外部调用）
    window.ISeeU.stopRecording = function() {
      stopRecording();
    };

    // 切换摄像头（外部调用）
    window.ISeeU.switchCamera = function() {
      switchCamera();
    };

    // 获取当前摄像头状态
    window.ISeeU.getCameraStatus = function() {
      return {
        isActive: !!stream,
        isRecording: isRecording,
        facingMode: currentFacingMode,
        config: { ...videoConfig }
      };
    };

    // 辅助函数：格式化字节大小
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // 导出数据库操作函数（供高级用户使用）
    window.ISeeU._db = {
      getAllMediaFromDB,
      deleteMediaFromDB,
      clearAllStorage
    };
  }
})();
