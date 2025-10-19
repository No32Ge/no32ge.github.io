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
      
      .iseeu-btn:focus,
      .iseeu-header-btn:focus,
      .iseeu-mini-btn:focus {
        outline: 2px solid #3498db;
        outline-offset: 2px;
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

      /* 新增样式 */
      .iseeu-loading {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;
      }

      .iseeu-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #3498db;
        animation: iseeu-spin 1s ease-in-out infinite;
      }

      @keyframes iseeu-spin {
        to { transform: rotate(360deg); }
      }

      .iseeu-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10003;
        max-width: 300px;
        animation: iseeu-slide-in 0.3s ease-out;
      }

      @keyframes iseeu-slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .iseeu-notification-success {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
      }

      .iseeu-notification-error {
        background: linear-gradient(135deg, #c0392b, #e74c3c);
      }

      .iseeu-notification-warning {
        background: linear-gradient(135deg, #f39c12, #f1c40f);
      }

      .iseeu-notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .iseeu-notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .iseeu-media-manager {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        background: #1a1a2e;
        border-radius: 12px;
        z-index: 10004;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      }

      .iseeu-media-manager.active {
        display: block;
      }

      .iseeu-media-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .iseeu-media-content {
        padding: 20px;
        max-height: 60vh;
        overflow-y: auto;
      }

      .iseeu-media-stats {
        background: rgba(255,255,255,0.05);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
      }

      .iseeu-clear-all-btn {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }

      .iseeu-clear-all-btn:hover {
        background: linear-gradient(135deg, #ea6153, #d35400);
      }

      .iseeu-media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
      }

      .iseeu-media-item {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        background: rgba(255,255,255,0.05);
        transition: transform 0.2s;
      }

      .iseeu-media-item:hover {
        transform: translateY(-2px);
      }

      .iseeu-media-item img,
      .iseeu-media-item video {
        width: 100%;
        height: 120px;
        object-fit: cover;
        display: block;
      }

      .iseeu-media-item-info {
        padding: 8px;
        font-size: 12px;
        color: #aaa;
        text-align: center;
      }

      .iseeu-media-item-actions {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        gap: 5px;
      }

      .iseeu-delete-media {
        background: rgba(231, 76, 60, 0.9);
        border: none;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .iseeu-manager-btn {
        margin-top: 15px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: #eee;
        padding: 10px 15px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .iseeu-manager-btn:hover {
        background: rgba(255,255,255,0.2);
      }

      /* 响应式设计 */
      @media (max-width: 768px) {
        .iseeu-content {
          width: 95%;
          margin: 10px;
        }
        
        .iseeu-controls {
          flex-direction: column;
        }
        
        .iseeu-btn {
          min-width: auto;
          width: 100%;
        }
        
        .iseeu-minimized {
          bottom: 10px;
          right: 10px;
        }
        
        .iseeu-mini-btn {
          width: 45px;
          height: 45px;
        }

        .iseeu-media-grid {
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        }

        .iseeu-media-stats {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      /* 浅色主题支持 */
      @media (prefers-color-scheme: light) {
        .iseeu-content {
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          color: #333;
        }
        
        .iseeu-btn {
          background: rgba(0,0,0,0.05);
          color: #333;
          border-color: rgba(0,0,0,0.1);
        }

        .iseeu-status {
          color: #666;
        }
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

    // 媒体库SVG图标
    const librarySvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
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
            <button class="iseeu-btn iseeu-manager-btn iseeu-open-manager-btn">
              ${librarySvg}
              媒体库
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

    // 创建媒体管理器
    const mediaManager = document.createElement('div');
    mediaManager.className = 'iseeu-media-manager';
    mediaManager.innerHTML = `
      <div class="iseeu-media-header">
        <h3>媒体库</h3>
        <button class="iseeu-header-btn iseeu-close-manager">×</button>
      </div>
      <div class="iseeu-media-content">
        <div class="iseeu-media-stats" id="mediaStats">加载中...</div>
        <div class="iseeu-media-grid" id="mediaGrid"></div>
        <button class="iseeu-manager-btn iseeu-refresh-manager-btn">
          ${librarySvg}
          刷新列表
        </button>
      </div>
    `;
    document.body.appendChild(mediaManager);

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
    const openManagerBtn = modal.querySelector('.iseeu-open-manager-btn');
    const minimizeBtn = modal.querySelector('.iseeu-minimize-btn');
    const closeBtn = modal.querySelector('.iseeu-close-btn');
    const closeManagerBtn = mediaManager.querySelector('.iseeu-close-manager');
    const refreshManagerBtn = mediaManager.querySelector('.iseeu-refresh-manager-btn');
    const statusElement = modal.querySelector('.iseeu-status');
    const cameraTypeStatus = modal.querySelector('.iseeu-camera-status');
    const mediaStats = mediaManager.querySelector('#mediaStats');
    const mediaGrid = mediaManager.querySelector('#mediaGrid');

    const photoBtn = minimizedPanel.querySelector('.iseeu-photo-btn');
    const videoBtn = minimizedPanel.querySelector('.iseeu-video-btn');
    const menuBtn = minimizedPanel.querySelector('.iseeu-menu-btn');
    const photoFeedback = photoBtn.querySelector('.iseeu-feedback');
    const videoFeedback = videoBtn.querySelector('.iseeu-feedback');

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let offscreenCanvas = null;
    let offscreenCtx = null;

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

    // 性能监控
    let frameCount = 0;
    let lastFpsTime = 0;

    // 视频配置参数（可由外部API修改）
    let videoConfig = {
      width: 640,
      height: 480,
      scale: 1.0,
      frameRate: 30,
      maxFPS: 60,
      mirror: true
    };

    // 持续把 video 帧绘制到 canvas（优化版本）
    function optimizedDrawingLoop() {
      if (!stream || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(optimizedDrawingLoop);
        return;
      }

      // 限制绘制频率以提高性能
      const now = performance.now();
      if (now - lastFpsTime < 1000 / videoConfig.maxFPS) {
        animationFrameId = requestAnimationFrame(optimizedDrawingLoop);
        return;
      }
      
      lastFpsTime = now;
      frameCount++;

      // 使用离屏canvas进行绘制优化
      if (!offscreenCanvas) {
        offscreenCanvas = document.createElement('canvas');
        offscreenCtx = offscreenCanvas.getContext('2d');
      }
      
      offscreenCanvas.width = videoConfig.width;
      offscreenCanvas.height = videoConfig.height;
      canvas.width = videoConfig.width;
      canvas.height = videoConfig.height;

      // 绘制到离屏canvas
      if (currentFacingMode === 'user' && videoConfig.mirror) {
        // 前置摄像头：镜像显示
        offscreenCtx.save();
        offscreenCtx.translate(offscreenCanvas.width, 0);
        offscreenCtx.scale(-1, 1);
        offscreenCtx.drawImage(video, 0, 0, offscreenCanvas.width * videoConfig.scale, offscreenCanvas.height * videoConfig.scale);
        offscreenCtx.restore();
      } else {
        // 后置摄像头：正常显示（不镜像）
        offscreenCtx.drawImage(video, 0, 0, offscreenCanvas.width * videoConfig.scale, offscreenCanvas.height * videoConfig.scale);
      }

      // 将离屏canvas绘制到主canvas
      ctx.drawImage(offscreenCanvas, 0, 0);

      // 循环
      animationFrameId = requestAnimationFrame(optimizedDrawingLoop);
    }

    // 配置验证
    function validateConfig(config) {
      const defaults = {
        width: { min: 160, max: 4096, default: 640 },
        height: { min: 120, max: 2160, default: 480 },
        frameRate: { min: 1, max: 60, default: 30 },
        maxFPS: { min: 1, max: 120, default: 60 },
        scale: { min: 0.1, max: 5, default: 1.0 }
      };
      
      const validated = { ...videoConfig };
      Object.keys(config).forEach(key => {
        if (defaults[key]) {
          const value = config[key];
          const range = defaults[key];
          validated[key] = Math.max(range.min, Math.min(range.max, value));
        } else {
          validated[key] = config[key];
        }
      });
      
      return validated;
    }

    // 错误处理增强
    function handleError(error, context) {
      console.error(`ISeeU Error in ${context}:`, error);
      
      const errorMessage = error.message || '未知错误';
      
      // 用户友好的错误消息映射
      const errorMessages = {
        'Permission denied': '摄像头权限被拒绝，请检查浏览器设置',
        'Requested device not found': '未找到摄像头设备',
        'Could not start video source': '无法启动视频源',
        'NotSupportedError': '浏览器不支持此功能',
        'NotAllowedError': '权限被拒绝'
      };
      
      const userMessage = errorMessages[error.name] || 
                         Object.keys(errorMessages).find(key => errorMessage.includes(key)) ? 
                         errorMessages[Object.keys(errorMessages).find(key => errorMessage.includes(key))] : 
                         `操作失败: ${errorMessage}`;
  
      updateStatus(userMessage);
      showNotification(userMessage, 'error');
    }

    // 显示通知
    function showNotification(message, type = 'info', duration = 3000) {
      const notification = document.createElement('div');
      notification.className = `iseeu-notification iseeu-notification-${type}`;
      notification.innerHTML = `
        <div class="iseeu-notification-content">
          <span class="iseeu-notification-message">${message}</span>
          <button class="iseeu-notification-close">×</button>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // 自动消失
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, duration);
      
      // 手动关闭
      notification.querySelector('.iseeu-notification-close').addEventListener('click', () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      });
    }

    // 显示加载状态
    function showLoading(message) {
      statusElement.innerHTML = `
        <div class="iseeu-loading">
          <div class="iseeu-spinner"></div>
          <span>${message}</span>
        </div>
      `;
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
            store.createIndex('type', 'type', { unique: false });
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
          timestamp: Date.now(),
          size: blob.size
        };

        const request = store.add(mediaItem);

        request.onsuccess = () => {
          resolve(request.result);
          updateStatus(`${type === 'photo' ? '照片' : '视频'}已保存`);
          showNotification(`${type === 'photo' ? '照片' : '视频'}保存成功`, 'success');
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
          showNotification('媒体删除成功', 'success');
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
          showNotification('所有媒体已清空', 'success');
        };
        
        request.onerror = () => reject(request.error);
      });
    }

    // 开始摄像头
    async function startCamera() {
      try {
        // 检查浏览器支持
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('浏览器不支持摄像头功能');
        }

        showLoading('正在启动摄像头...');

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
        optimizedDrawingLoop();

        // 更新UI状态
        updateUIState(true);
        updateCameraTypeStatus();
        updateStatus('摄像头已启动');
        showNotification('摄像头启动成功', 'success');

      } catch (e) {
        handleError(e, 'startCamera');
        updateUIState(false);
      }
    }

    // 停止摄像头（修复内存泄漏）
    function stopCamera() {
      // 停止动画帧循环
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      
      // 停止录像
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      
      // 清理媒体流
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        stream = null;
      }
      
      // 清理音频流
      if (audioStream) {
        audioStream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        audioStream = null;
      }
      
      // 清理视频元素
      if (video.srcObject) {
        video.srcObject = null;
      }
      
      // 清理 canvas
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // 清理离屏canvas
      if (offscreenCtx) {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      }
      
      updateUIState(false);
      updateStatus('摄像头已停止');
    }

    // 更新UI状态
    function updateUIState(isActive) {
      captureBtn.disabled = !isActive;
      recordBtn.disabled = !isActive;
      stopRecordBtn.disabled = !isActive;
      
      if (!isActive) {
        stopRecordBtn.style.display = 'none';
        recordBtn.style.display = 'flex';
        isRecording = false;
        updateVideoButtonState();
      }
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

      try {
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
            handleError(e, 'capturePhoto');
            showFeedback(photoFeedback, '✗', '#ff0000');
          }
        }, 'image/png');
      } catch (e) {
        handleError(e, 'capturePhoto');
      }
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
          showNotification('无法访问麦克风，将录制无声视频', 'warning');
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
            handleError(e, 'saveRecording');
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
        showNotification('开始录制视频', 'success');

      } catch (e) {
        console.error('录像启动失败:', e);
        handleError(e, 'startRecording');
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
        showNotification('视频录制已停止', 'success');
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

    // 打开媒体管理器
    async function openMediaManager() {
      mediaManager.classList.add('active');
      await refreshMediaManager();
    }

    // 关闭媒体管理器
    function closeMediaManager() {
      mediaManager.classList.remove('active');
    }

    // 刷新媒体管理器
    async function refreshMediaManager() {
      try {
        mediaGrid.innerHTML = '<div class="iseeu-loading"><div class="iseeu-spinner"></div><span>加载中...</span></div>';
        
        const allMedia = await getAllMediaFromDB();
        const storageInfo = await getStorageInfo(allMedia);
        
        // 更新统计信息
        mediaStats.innerHTML = `
          共 ${storageInfo.totalItems} 个文件 | 
          照片: ${storageInfo.photos} | 
          视频: ${storageInfo.videos} | 
          总大小: ${storageInfo.totalSizeFormatted}
          <button class="iseeu-clear-all-btn">清空所有</button>
        `;
        
        // 清空确认
        mediaStats.querySelector('.iseeu-clear-all-btn').addEventListener('click', async () => {
          if (confirm('确定要清空所有媒体文件吗？此操作不可撤销。')) {
            await clearAllStorage();
            await refreshMediaManager();
          }
        });
        
        // 显示媒体文件
        if (allMedia.length === 0) {
          mediaGrid.innerHTML = '<div style="text-align: center; color: #aaa; padding: 20px;">暂无媒体文件</div>';
          return;
        }
        
        mediaGrid.innerHTML = '';
        
        // 按时间戳排序（最新的在前）
        const sortedMedia = allMedia.sort((a, b) => b.timestamp - a.timestamp);
        
        sortedMedia.forEach(media => {
          const mediaItem = document.createElement('div');
          mediaItem.className = 'iseeu-media-item';
          
          const blobUrl = URL.createObjectURL(media.blob);
          const date = new Date(media.timestamp).toLocaleString();
          
          if (media.type === 'photo') {
            mediaItem.innerHTML = `
              <img src="${blobUrl}" alt="照片 ${date}" />
              <div class="iseeu-media-item-info">
                ${date}<br>
                ${formatBytes(media.size)}
              </div>
              <div class="iseeu-media-item-actions">
                <button class="iseeu-delete-media" data-id="${media.id}">×</button>
              </div>
            `;
          } else {
            mediaItem.innerHTML = `
              <video src="${blobUrl}" preload="metadata"></video>
              <div class="iseeu-media-item-info">
                ${date}<br>
                ${formatBytes(media.size)}
              </div>
              <div class="iseeu-media-item-actions">
                <button class="iseeu-delete-media" data-id="${media.id}">×</button>
              </div>
            `;
          }
          
          // 点击预览
          mediaItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('iseeu-delete-media')) {
              window.open(blobUrl, '_blank');
            }
          });
          
          // 删除功能
          const deleteBtn = mediaItem.querySelector('.iseeu-delete-media');
          deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm('确定要删除这个文件吗？')) {
              try {
                await deleteMediaFromDB(media.id);
                URL.revokeObjectURL(blobUrl); // 清理URL
                await refreshMediaManager();
              } catch (error) {
                handleError(error, 'deleteMedia');
              }
            }
          });
          
          mediaGrid.appendChild(mediaItem);
        });
        
      } catch (e) {
        handleError(e, 'refreshMediaManager');
        mediaGrid.innerHTML = '<div style="text-align: center; color: #e74c3c; padding: 20px;">加载失败</div>';
      }
    }

    // 获取存储信息
    function getStorageInfo(allMedia = []) {
      const photos = allMedia.filter(item => item.type === 'photo');
      const videos = allMedia.filter(item => item.type === 'video');
      
      // 计算总大小
      let totalSize = 0;
      allMedia.forEach(item => {
        totalSize += item.size || item.blob.size;
      });
      
      return {
        totalItems: allMedia.length,
        photos: photos.length,
        videos: videos.length,
        totalSize: totalSize,
        totalSizeFormatted: formatBytes(totalSize)
      };
    }

    // 格式化字节大小
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // 浏览器兼容性检查
    function checkBrowserCompatibility() {
      const requiredAPIs = [
        'indexedDB',
        'MediaRecorder',
        'navigator.mediaDevices.getUserMedia'
      ];
      
      const missingAPIs = requiredAPIs.filter(api => {
        if (api.includes('.')) {
          const parts = api.split('.');
          return !parts.reduce((obj, part) => obj && obj[part], window);
        }
        return !window[api];
      });
      
      if (missingAPIs.length > 0) {
        console.warn('缺少必要的API:', missingAPIs);
        return false;
      }
      
      return true;
    }

    // 键盘快捷键支持
    function initKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // 只在插件激活时响应
        if (!modal.classList.contains('active') && !mediaManager.classList.contains('active')) return;
        
        // 阻止默认行为
        if (e.key === ' ' || e.key === 'Escape') {
          e.preventDefault();
        }
        
        switch(e.key) {
          case ' ': // 空格键拍照
            if (!captureBtn.disabled) capturePhoto();
            break;
          case 'r': // R键开始/停止录像
            if (isRecording) {
              stopRecording();
            } else if (!recordBtn.disabled) {
              startRecording();
            }
            break;
          case 's': // S键切换摄像头
            switchCamera();
            break;
          case 'Escape': // ESC键关闭
            if (mediaManager.classList.contains('active')) {
              closeMediaManager();
            } else {
              closeModal();
            }
            break;
        }
      });
    }

    // 初始化应用
    async function initApp() {
      try {
        // 检查浏览器兼容性
        if (!checkBrowserCompatibility()) {
          throw new Error('浏览器不兼容摄像头功能');
        }
        
        await initDB();
        initKeyboardShortcuts();
        
        updateStatus('ISeeU插件已就绪');
        showNotification('ISeeU插件加载成功', 'success');
        
      } catch (e) {
        handleError(e, 'initApp');
      }
    }

    // 事件监听器
    captureBtn.addEventListener('click', capturePhoto);
    recordBtn.addEventListener('click', startRecording);
    stopRecordBtn.addEventListener('click', stopRecording);
    switchCameraBtn.addEventListener('click', switchCamera);
    openManagerBtn.addEventListener('click', openMediaManager);

    // 最小化按钮
    minimizeBtn.addEventListener('click', minimizeModal);

    // 关闭按钮
    closeBtn.addEventListener('click', closeModal);
    closeManagerBtn.addEventListener('click', closeMediaManager);

    // 刷新媒体库按钮
    refreshManagerBtn.addEventListener('click', refreshMediaManager);

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

    // 点击媒体管理器外部关闭
    mediaManager.addEventListener('click', (e) => {
      if (e.target === mediaManager) {
        closeMediaManager();
      }
    });

    // 页面卸载时清理资源
    window.addEventListener('beforeunload', () => {
      stopCamera();
      // 清理所有blob URL
      document.querySelectorAll('.iseeu-media-item img, .iseeu-media-item video').forEach(el => {
        if (el.src && el.src.startsWith('blob:')) {
          URL.revokeObjectURL(el.src);
        }
      });
    });

    // 初始化应用
    initApp();

    // ==================== 公共API方法 ====================
    window.ISeeU = window.ISeeU || {};
    
    // 获取所有媒体文件列表
    window.ISeeU.getMediaList = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        return allMedia.sort((a, b) => b.timestamp - a.timestamp);
      } catch (e) {
        handleError(e, 'getMediaList');
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
        handleError(e, 'getPhotos');
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
        handleError(e, 'getVideos');
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
        handleError(e, 'deleteMedia');
        throw e;
      }
    };

    // 清空所有存储的媒体
    window.ISeeU.clearAllMedia = async function() {
      try {
        await clearAllStorage();
        return true;
      } catch (e) {
        handleError(e, 'clearAllMedia');
        throw e;
      }
    };

    // 获取存储统计信息
    window.ISeeU.getStorageInfo = async function() {
      try {
        const allMedia = await getAllMediaFromDB();
        return getStorageInfo(allMedia);
      } catch (e) {
        handleError(e, 'getStorageInfo');
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
      // 验证并合并配置
      videoConfig = validateConfig({ ...videoConfig, ...config });
      
      // 如果摄像头正在运行，重新启动以应用新配置
      if (stream) {
        startCamera();
      }
      
      return videoConfig;
    };

    // 设置视频尺寸
    window.ISeeU.setVideoSize = function(width, height) {
      videoConfig.width = Math.max(160, Math.min(4096, width));
      videoConfig.height = Math.max(120, Math.min(2160, height));
      
      if (stream) {
        startCamera();
      }
      
      return videoConfig;
    };

    // 设置视频缩放
    window.ISeeU.setVideoScale = function(scale) {
      videoConfig.scale = Math.max(0.1, Math.min(5, scale));
      return videoConfig;
    };

    // 设置帧率
    window.ISeeU.setFrameRate = function(frameRate) {
      videoConfig.frameRate = Math.max(1, Math.min(60, frameRate));
      
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
        videoConfig = validateConfig({ ...videoConfig, ...config });
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

    // 显示通知（外部调用）
    window.ISeeU.showNotification = showNotification;

    // 打开媒体管理器（外部调用）
    window.ISeeU.openMediaManager = openMediaManager;

    // 导出数据库操作函数（供高级用户使用）
    window.ISeeU._db = {
      getAllMediaFromDB,
      deleteMediaFromDB,
      clearAllStorage
    };
  }
})();
