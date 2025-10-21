(function () {
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlugin);
  } else {
    initPlugin();
  }

  function initPlugin() {
    // 检查是否已有容器 - 这是关键修改
    let container = document.getElementById('ISeeU');
    if (!container) {
      // 如果没有找到 id='ISeeU' 的元素，直接返回，不加载插件
      console.log('ISeeU container not found, plugin will not load.');
      return;
    }

    // 如果找到了 id='ISeeU' 的元素，继续加载插件
    console.log('ISeeU container found, loading plugin...');

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

      /* 增强的媒体库样式 - 响应式版本 */
.iseeu-media-manager {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 1200px;
  max-height: 95vh;
  background: #1a1a2e;
  border-radius: 16px;
  z-index: 10004;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.7);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.iseeu-media-manager.active {
  display: flex;
  flex-direction: column;
}

.iseeu-media-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}

.iseeu-media-header h3 {
  margin: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.iseeu-media-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.iseeu-media-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-wrap: wrap;
  gap: 15px;
}

.iseeu-media-filters {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.iseeu-filter-btn {
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
  color: #eee;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.iseeu-filter-btn.active {
  background: #3498db;
  border-color: #3498db;
}

.iseeu-filter-btn:hover {
  background: rgba(255,255,255,0.2);
}

.iseeu-search-box {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 8px 16px;
  min-width: 200px;
}

.iseeu-search-box input {
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  width: 100%;
  outline: none;
}

.iseeu-search-box input::placeholder {
  color: #aaa;
}

.iseeu-media-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.iseeu-action-btn {
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
  color: #eee;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.iseeu-action-btn:hover {
  background: rgba(255,255,255,0.2);
}

.iseeu-action-btn.danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-color: rgba(255,255,255,0.3);
}

.iseeu-action-btn.danger:hover {
  background: linear-gradient(135deg, #ea6153, #d35400);
}

.iseeu-action-btn.primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-color: rgba(255,255,255,0.3);
}

.iseeu-action-btn.primary:hover {
  background: linear-gradient(135deg, #3ca0db, #2c88c7);
}

.iseeu-media-stats {
  background: rgba(255,255,255,0.05);
  padding: 15px 30px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.iseeu-stats-info {
  color: #aaa;
  font-size: 14px;
  flex: 1;
  min-width: 200px;
}

.iseeu-stats-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.iseeu-media-view {
  flex: 1;
  padding: 20px 30px;
  overflow-y: auto;
  min-height: 400px;
}

/* 网格视图 */
.iseeu-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.iseeu-media-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255,255,255,0.05);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.iseeu-media-item:hover {
  transform: translateY(-5px);
  border-color: #3498db;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.iseeu-media-item.selected {
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.1);
}

.iseeu-media-preview {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.iseeu-media-preview img,
.iseeu-media-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.iseeu-media-type {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
}

.iseeu-media-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
}

.iseeu-media-checkbox {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  border: 2px solid #fff;
  display: none;
}

.iseeu-media-item.selectable .iseeu-media-checkbox {
  display: block;
}

.iseeu-media-item.selected .iseeu-media-checkbox {
  background: #2ecc71;
  border-color: #2ecc71;
}

.iseeu-media-item.selected .iseeu-media-checkbox::after {
  content: '✓';
  color: white;
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.iseeu-media-info {
  padding: 12px;
}

.iseeu-media-title {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.iseeu-media-meta {
  display: flex;
  justify-content: space-between;
  color: #aaa;
  font-size: 11px;
}

.iseeu-media-size {
  font-weight: 600;
}

.iseeu-media-date {
  color: #888;
}

.iseeu-media-actions-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  padding: 12px;
  display: flex;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

.iseeu-media-item:hover .iseeu-media-actions-bar {
  opacity: 1;
}

.iseeu-item-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.iseeu-item-action:hover {
  transform: scale(1.1);
  background: #fff;
}

.iseeu-item-action.download {
  color: #3498db;
}

.iseeu-item-action.delete {
  color: #e74c3c;
}

.iseeu-item-action.share {
  color: #2ecc71;
}

/* 列表视图 */
.iseeu-media-list {
  display: none;
}

.iseeu-media-list.active {
  display: block;
}

.iseeu-list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  transition: background 0.2s;
  flex-wrap: wrap;
}

.iseeu-list-item:hover {
  background: rgba(255,255,255,0.05);
}

.iseeu-list-item.selected {
  background: rgba(46, 204, 113, 0.1);
}

.iseeu-list-preview {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
}

.iseeu-list-preview img,
.iseeu-list-preview video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.iseeu-list-info {
  flex: 1;
  min-width: 0;
}

.iseeu-list-title {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.iseeu-list-meta {
  display: flex;
  gap: 12px;
  color: #aaa;
  font-size: 12px;
  flex-wrap: wrap;
}

.iseeu-list-type {
  background: #3498db;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.iseeu-list-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.iseeu-list-item:hover .iseeu-list-actions {
  opacity: 1;
}

/* 空状态 */
.iseeu-media-empty {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.iseeu-empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.iseeu-empty-text {
  font-size: 16px;
  margin-bottom: 8px;
}

.iseeu-empty-subtext {
  font-size: 14px;
  color: #888;
}

/* 预览模态框 */
.iseeu-preview-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  z-index: 10005;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.iseeu-preview-modal.active {
  display: flex;
}

.iseeu-preview-content {
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.iseeu-preview-media {
  max-width: 100%;
  max-height: calc(100vh - 120px);
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  object-fit: contain;
}

.iseeu-preview-info {
  width: 100%;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 15px;
  border-radius: 0 0 8px 8px;
  margin-top: -4px;
  max-width: 800px;
}

.iseeu-preview-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  word-break: break-word;
}

.iseeu-preview-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #ccc;
  flex-wrap: wrap;
}

.iseeu-preview-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.iseeu-preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iseeu-preview-prev {
  left: 10px;
  z-index: 10;
}

.iseeu-preview-next {
  right: 10px;
  z-index: 10;
}

/* ==================== 响应式设计 ==================== */

/* 平板设备 (768px 及以下) */
@media (max-width: 768px) {
  .iseeu-media-manager {
    width: 98%;
    height: 98vh;
    max-height: 98vh;
    border-radius: 12px;
  }
  
  .iseeu-media-header {
    padding: 15px 20px;
  }
  
  .iseeu-media-header h3 {
    font-size: 18px;
  }
  
  .iseeu-media-toolbar {
    padding: 15px 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .iseeu-media-filters {
    justify-content: center;
    width: 100%;
  }
  
  .iseeu-search-box {
    min-width: 150px;
    flex: 1;
  }
  
  .iseeu-media-actions {
    justify-content: center;
    width: 100%;
  }
  
  .iseeu-action-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .iseeu-media-stats {
    padding: 12px 20px;
  }
  
  .iseeu-stats-info {
    font-size: 13px;
    text-align: center;
    min-width: 100%;
    margin-bottom: 8px;
  }
  
  .iseeu-stats-actions {
    justify-content: center;
    width: 100%;
  }
  
  .iseeu-media-view {
    padding: 15px 20px;
  }
  
  .iseeu-media-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .iseeu-media-preview {
    height: 120px;
  }
  
  .iseeu-list-item {
    padding: 10px 12px;
  }
  
  .iseeu-list-preview {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }
  
  .iseeu-list-title {
    font-size: 13px;
  }
  
  .iseeu-list-meta {
    font-size: 11px;
    gap: 8px;
  }
  
  .iseeu-preview-modal {
    padding: 10px;
  }
  
  .iseeu-preview-close {
    top: 5px;
    right: 5px;
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
  
  .iseeu-preview-nav {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .iseeu-preview-prev {
    left: 5px;
  }
  
  .iseeu-preview-next {
    right: 5px;
  }
  
  .iseeu-preview-info {
    padding: 12px;
  }
  
  .iseeu-preview-title {
    font-size: 14px;
  }
  
  .iseeu-preview-meta {
    font-size: 11px;
    gap: 12px;
  }
}

/* 手机设备 (480px 及以下) */
@media (max-width: 480px) {
  .iseeu-media-manager {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
  
  .iseeu-media-header {
    padding: 12px 15px;
  }
  
  .iseeu-media-header h3 {
    font-size: 16px;
  }
  
  .iseeu-media-toolbar {
    padding: 12px 15px;
    gap: 10px;
  }
  
  .iseeu-media-filters {
    gap: 6px;
  }
  
  .iseeu-filter-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .iseeu-search-box {
    min-width: 120px;
    padding: 6px 12px;
  }
  
  .iseeu-search-box input {
    font-size: 13px;
  }
  
  .iseeu-search-box input::placeholder {
    font-size: 13px;
  }
  
  .iseeu-media-actions {
    gap: 6px;
  }
  
  .iseeu-action-btn {
    padding: 5px 10px;
    font-size: 12px;
  }
  
  .iseeu-media-stats {
    padding: 10px 15px;
  }
  
  .iseeu-stats-info {
    font-size: 12px;
  }
  
  .iseeu-media-view {
    padding: 12px 15px;
  }
  
  .iseeu-media-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
  
  .iseeu-media-preview {
    height: 100px;
  }
  
  .iseeu-media-info {
    padding: 8px;
  }
  
  .iseeu-media-title {
    font-size: 12px;
  }
  
  .iseeu-media-meta {
    font-size: 10px;
  }
  
  .iseeu-media-actions-bar {
    padding: 8px;
    gap: 6px;
  }
  
  .iseeu-item-action {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .iseeu-list-item {
    padding: 8px 10px;
  }
  
  .iseeu-list-preview {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  
  .iseeu-list-title {
    font-size: 12px;
  }
  
  .iseeu-list-meta {
    font-size: 10px;
    gap: 6px;
  }
  
  .iseeu-list-actions {
    gap: 6px;
  }
  
  .iseeu-preview-modal {
    padding: 5px;
  }
  
  .iseeu-preview-close {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
  
  .iseeu-preview-nav {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  
  .iseeu-preview-info {
    padding: 10px;
  }
  
  .iseeu-preview-title {
    font-size: 13px;
  }
  
  .iseeu-preview-meta {
    font-size: 10px;
    gap: 8px;
  }
  
  /* 在小屏幕上隐藏分享按钮 */
  .iseeu-item-action.share {
    display: none;
  }
}

/* 超小屏幕设备 (360px 及以下) */
@media (max-width: 360px) {
  .iseeu-media-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 10px;
  }
  
  .iseeu-media-preview {
    height: 90px;
  }
  
  .iseeu-filter-btn {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .iseeu-action-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  
  .iseeu-media-actions {
    gap: 4px;
  }
  
  .iseeu-stats-actions {
    gap: 6px;
  }
}

/* 横屏手机优化 */
@media (max-height: 500px) and (orientation: landscape) {
  .iseeu-media-manager {
    max-height: 98vh;
  }
  
  .iseeu-media-header {
    padding: 10px 15px;
  }
  
  .iseeu-media-toolbar {
    padding: 8px 15px;
  }
  
  .iseeu-media-stats {
    padding: 8px 15px;
  }
  
  .iseeu-media-view {
    padding: 10px 15px;
    min-height: 200px;
  }
  
  .iseeu-media-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .iseeu-media-preview {
    height: 80px;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .iseeu-media-item:hover {
    transform: none;
    border-color: transparent;
  }
  
  .iseeu-media-item:active {
    transform: scale(0.98);
    border-color: #3498db;
  }
  
  .iseeu-media-actions-bar {
    opacity: 1;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
  }
  
  .iseeu-list-actions {
    opacity: 1;
  }
  
  .iseeu-action-btn,
  .iseeu-filter-btn,
  .iseeu-item-action {
    min-height: 44px;
    min-width: 44px;
  }
}

/* 高DPI屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .iseeu-media-preview img,
  .iseeu-media-preview video {
    image-rendering: -webkit-optimize-contrast;
  }
}

/* 加载动画 */
.iseeu-media-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.iseeu-loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: iseeu-spin 1s linear infinite;
  margin-bottom: 16px;
}

/* 选择模式 */
.iseeu-selection-mode .iseeu-media-item {
  cursor: default;
}

.iseeu-selection-mode .iseeu-media-item:hover {
  transform: none;
  border-color: transparent;
}

.iseeu-selection-mode .iseeu-media-item.selected:hover {
  border-color: #2ecc71;
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
        <h3>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
          </svg>
          媒体库
        </h3>
        <button class="iseeu-header-btn iseeu-close-manager">×</button>
      </div>
      <div class="iseeu-media-content">
        <div class="iseeu-media-toolbar">
          <div class="iseeu-media-filters">
            <button class="iseeu-filter-btn active" data-filter="all">全部</button>
            <button class="iseeu-filter-btn" data-filter="photo">照片</button>
            <button class="iseeu-filter-btn" data-filter="video">视频</button>
            <div class="iseeu-search-box">
              <input type="text" placeholder="搜索媒体文件..." id="mediaSearch">
            </div>
          </div>
          <div class="iseeu-media-actions">
            <button class="iseeu-action-btn" id="toggleViewBtn" title="切换视图">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 3h8v4H3zm0 6h8v4H3zm0 6h8v4H3zm10 0h8v4h-8zm0-6h8v4h-8zm0-6h8v4h-8z"/>
              </svg>
            </button>
            <button class="iseeu-action-btn" id="selectAllBtn">全选</button>
            <button class="iseeu-action-btn" id="selectModeBtn">选择</button>
            <button class="iseeu-action-btn danger" id="deleteSelectedBtn">删除选中</button>
            <button class="iseeu-action-btn primary" id="downloadSelectedBtn">下载选中</button>
          </div>
        </div>
        <div class="iseeu-media-stats">
          <div class="iseeu-stats-info" id="mediaStats">加载中...</div>
          <div class="iseeu-stats-actions">
            <button class="iseeu-action-btn" id="clearAllBtn">清空全部</button>
            <button class="iseeu-action-btn" id="refreshManagerBtn">刷新</button>
          </div>
        </div>
        <div class="iseeu-media-view">
          <div class="iseeu-media-grid" id="mediaGrid"></div>
          <div class="iseeu-media-list" id="mediaList"></div>
        </div>
      </div>
    `;
    document.body.appendChild(mediaManager);

    // 创建预览模态框
    const previewModal = document.createElement('div');
    previewModal.className = 'iseeu-preview-modal';
    previewModal.innerHTML = `
      <div class="iseeu-preview-content">
        <button class="iseeu-preview-close">×</button>
        <button class="iseeu-preview-nav iseeu-preview-prev">‹</button>
        <button class="iseeu-preview-nav iseeu-preview-next">›</button>
        <img class="iseeu-preview-media" id="previewImage" style="display: none;">
        <video class="iseeu-preview-media" id="previewVideo" controls style="display: none;"></video>
        <div class="iseeu-preview-info">
          <div class="iseeu-preview-title" id="previewTitle"></div>
          <div class="iseeu-preview-meta" id="previewMeta"></div>
        </div>
      </div>
    `;
    document.body.appendChild(previewModal);

    // 获取新增的DOM元素
    const toggleViewBtn = mediaManager.querySelector('#toggleViewBtn');
    const selectAllBtn = mediaManager.querySelector('#selectAllBtn');
    const selectModeBtn = mediaManager.querySelector('#selectModeBtn');
    const deleteSelectedBtn = mediaManager.querySelector('#deleteSelectedBtn');
    const downloadSelectedBtn = mediaManager.querySelector('#downloadSelectedBtn');
    const clearAllBtn = mediaManager.querySelector('#clearAllBtn');
    const refreshManagerBtn = mediaManager.querySelector('#refreshManagerBtn');
    const mediaSearch = mediaManager.querySelector('#mediaSearch');
    const filterButtons = mediaManager.querySelectorAll('.iseeu-filter-btn');
    const mediaGrid = mediaManager.querySelector('#mediaGrid');
    const mediaList = mediaManager.querySelector('#mediaList');
    const previewClose = previewModal.querySelector('.iseeu-preview-close');
    const previewPrev = previewModal.querySelector('.iseeu-preview-prev');
    const previewNext = previewModal.querySelector('.iseeu-preview-next');
    const previewImage = previewModal.querySelector('#previewImage');
    const previewVideo = previewModal.querySelector('#previewVideo');
    const previewTitle = previewModal.querySelector('#previewTitle');
    const previewMeta = previewModal.querySelector('#previewMeta');

    // 媒体库状态
    let mediaLibraryState = {
      currentView: 'grid', // 'grid' 或 'list'
      currentFilter: 'all', // 'all', 'photo', 'video'
      currentSearch: '',
      isSelectMode: false,
      selectedItems: new Set(),
      allMedia: [],
      filteredMedia: [],
      currentPreviewIndex: -1
    };


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
    stopRecordBtn.style.display = 'none';
    const switchCameraBtn = modal.querySelector('.iseeu-switch-camera-btn');
    const openManagerBtn = modal.querySelector('.iseeu-open-manager-btn');
    const minimizeBtn = modal.querySelector('.iseeu-minimize-btn');
    const closeBtn = modal.querySelector('.iseeu-close-btn');

    const statusElement = modal.querySelector('.iseeu-status');
    const cameraTypeStatus = modal.querySelector('.iseeu-camera-status');
    const mediaStats = mediaManager.querySelector('#mediaStats');


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
      // 聚焦搜索框
      setTimeout(() => mediaSearch.focus(), 100);
    }

    // 关闭媒体管理器
    function closeMediaManager() {
      mediaManager.classList.remove('active');
    }

    // 刷新媒体管理器
    async function refreshMediaManager() {
      try {
        showMediaLoading();

        const allMedia = await getAllMediaFromDB();
        mediaLibraryState.allMedia = allMedia.sort((a, b) => b.timestamp - a.timestamp);

        applyFiltersAndSearch();
        updateMediaDisplay();
        updateStats();

      } catch (e) {
        handleError(e, 'refreshMediaManager');
        showMediaError('加载失败');
      }
    }

    // 显示加载状态
    function showMediaLoading() {
      mediaGrid.innerHTML = `
        <div class="iseeu-media-loading">
          <div class="iseeu-loading-spinner"></div>
          <div>加载媒体文件中...</div>
        </div>
      `;
      mediaList.innerHTML = '';
    }

    // 显示错误状态
    function showMediaError(message) {
      mediaGrid.innerHTML = `
        <div class="iseeu-media-empty">
          <div class="iseeu-empty-icon">⚠️</div>
          <div class="iseeu-empty-text">${message}</div>
        </div>
      `;
      mediaList.innerHTML = '';
    }

    // 显示空状态
    function showMediaEmpty() {
      mediaGrid.innerHTML = `
        <div class="iseeu-media-empty">
          <div class="iseeu-empty-icon">📁</div>
          <div class="iseeu-empty-text">暂无媒体文件</div>
          <div class="iseeu-empty-subtext">使用拍照或录像功能创建内容</div>
        </div>
      `;
      mediaList.innerHTML = '';
    }

    // 应用过滤和搜索
    function applyFiltersAndSearch() {
      let filtered = [...mediaLibraryState.allMedia];

      // 应用类型过滤
      if (mediaLibraryState.currentFilter !== 'all') {
        filtered = filtered.filter(item => item.type === mediaLibraryState.currentFilter);
      }

      // 应用搜索过滤
      if (mediaLibraryState.currentSearch.trim()) {
        const searchTerm = mediaLibraryState.currentSearch.toLowerCase();
        filtered = filtered.filter(item => {
          const date = new Date(item.timestamp).toLocaleString().toLowerCase();
          return date.includes(searchTerm);
        });
      }

      mediaLibraryState.filteredMedia = filtered;
    }

    // 更新媒体显示
    function updateMediaDisplay() {
      if (mediaLibraryState.filteredMedia.length === 0) {
        showMediaEmpty();
        return;
      }

      if (mediaLibraryState.currentView === 'grid') {
        updateGridView();
        mediaGrid.style.display = 'grid';
        mediaList.style.display = 'none';
      } else {
        updateListView();
        mediaGrid.style.display = 'none';
        mediaList.style.display = 'block';
      }
    }

    // 更新网格视图
    function updateGridView() {
      mediaGrid.innerHTML = '';

      mediaLibraryState.filteredMedia.forEach((media, index) => {
        const mediaItem = createGridMediaItem(media, index);
        mediaGrid.appendChild(mediaItem);
      });
    }

    // 创建网格媒体项
    function createGridMediaItem(media, index) {
      const mediaItem = document.createElement('div');
      mediaItem.className = `iseeu-media-item ${mediaLibraryState.isSelectMode ? 'selectable' : ''} ${mediaLibraryState.selectedItems.has(media.id) ? 'selected' : ''}`;
      mediaItem.dataset.id = media.id;
      mediaItem.dataset.index = index;

      const blobUrl = URL.createObjectURL(media.blob);
      const date = new Date(media.timestamp).toLocaleString();
      const size = formatBytes(media.size);
      const typeLabel = media.type === 'photo' ? '照片' : '视频';

      mediaItem.innerHTML = `
        <div class="iseeu-media-preview">
          ${media.type === 'photo' ?
          `<img src="${blobUrl}" alt="${typeLabel} ${date}" loading="lazy">` :
          `<video src="${blobUrl}" preload="metadata"></video>`
        }
          <div class="iseeu-media-type">${typeLabel}</div>
          ${media.type === 'video' ? `<div class="iseeu-media-duration" id="duration-${media.id}">加载中...</div>` : ''}
          <div class="iseeu-media-checkbox"></div>
        </div>
        <div class="iseeu-media-info">
          <div class="iseeu-media-title">${typeLabel} ${new Date(media.timestamp).toLocaleDateString()}</div>
          <div class="iseeu-media-meta">
            <span class="iseeu-media-size">${size}</span>
            <span class="iseeu-media-date">${new Date(media.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
        <div class="iseeu-media-actions-bar">
          <button class="iseeu-item-action download" title="下载">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
          <button class="iseeu-item-action delete" title="删除">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
          <button class="iseeu-item-action share" title="分享">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
      `;

      // 添加事件监听器
      setupMediaItemEvents(mediaItem, media, blobUrl, index);

      // 如果是视频，加载时长信息
      if (media.type === 'video') {
        loadVideoDuration(media, blobUrl);
      }

      return mediaItem;
    }

    // 更新列表视图
    function updateListView() {
      mediaList.innerHTML = '';

      mediaLibraryState.filteredMedia.forEach((media, index) => {
        const listItem = createListMediaItem(media, index);
        mediaList.appendChild(listItem);
      });
    }

    // 创建列表媒体项
    function createListMediaItem(media, index) {
      const listItem = document.createElement('div');
      listItem.className = `iseeu-list-item ${mediaLibraryState.selectedItems.has(media.id) ? 'selected' : ''}`;
      listItem.dataset.id = media.id;
      listItem.dataset.index = index;

      const blobUrl = URL.createObjectURL(media.blob);
      const date = new Date(media.timestamp).toLocaleString();
      const size = formatBytes(media.size);
      const typeLabel = media.type === 'photo' ? '照片' : '视频';

      listItem.innerHTML = `
        <div class="iseeu-list-preview">
          ${media.type === 'photo' ?
          `<img src="${blobUrl}" alt="${typeLabel} ${date}" loading="lazy">` :
          `<video src="${blobUrl}" preload="metadata"></video>`
        }
        </div>
        <div class="iseeu-list-info">
          <div class="iseeu-list-title">${typeLabel} - ${new Date(media.timestamp).toLocaleString()}</div>
          <div class="iseeu-list-meta">
            <span class="iseeu-list-type">${typeLabel}</span>
            <span>${size}</span>
            <span>${new Date(media.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        <div class="iseeu-list-actions">
          <button class="iseeu-item-action download" title="下载">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
          <button class="iseeu-item-action delete" title="删除">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      `;

      // 添加事件监听器
      setupMediaItemEvents(listItem, media, blobUrl, index);

      return listItem;
    }

    // 设置媒体项事件
    function setupMediaItemEvents(element, media, blobUrl, index) {
      // 点击选择/取消选择
      element.addEventListener('click', (e) => {
        if (mediaLibraryState.isSelectMode) {
          e.preventDefault();
          e.stopPropagation();
          toggleMediaSelection(media.id);
        } else if (!e.target.closest('.iseeu-item-action')) {
          // 不是点击操作按钮，打开预览
          openMediaPreview(index);
        }
      });

      // 下载按钮
      const downloadBtn = element.querySelector('.iseeu-item-action.download');
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadMedia(media, blobUrl);
      });

      // 删除按钮
      const deleteBtn = element.querySelector('.iseeu-item-action.delete');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSingleMedia(media.id, blobUrl);
      });

      // 分享按钮（仅网格视图）
      const shareBtn = element.querySelector('.iseeu-item-action.share');
      if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          shareMedia(media, blobUrl);
        });
      }
    }

    // 切换媒体选择
    function toggleMediaSelection(mediaId) {
      if (mediaLibraryState.selectedItems.has(mediaId)) {
        mediaLibraryState.selectedItems.delete(mediaId);
      } else {
        mediaLibraryState.selectedItems.add(mediaId);
      }
      updateMediaDisplay();
      updateSelectionUI();
    }

    // 更新选择UI
    function updateSelectionUI() {
      const selectedCount = mediaLibraryState.selectedItems.size;
      deleteSelectedBtn.disabled = selectedCount === 0;
      downloadSelectedBtn.disabled = selectedCount === 0;

      if (selectedCount > 0) {
        selectModeBtn.textContent = `取消选择 (${selectedCount})`;
      } else {
        selectModeBtn.textContent = '选择';
      }
    }

    // 加载视频时长
    function loadVideoDuration(media, blobUrl) {
      const video = document.createElement('video');
      video.src = blobUrl;
      video.addEventListener('loadedmetadata', () => {
        const duration = formatDuration(video.duration);
        const durationElement = document.getElementById(`duration-${media.id}`);
        if (durationElement) {
          durationElement.textContent = duration;
        }
      });
    }

    // 格式化时长
    function formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // 打开媒体预览
    function openMediaPreview(index) {
      const media = mediaLibraryState.filteredMedia[index];
      if (!media) return;

      mediaLibraryState.currentPreviewIndex = index;
      const blobUrl = URL.createObjectURL(media.blob);

      if (media.type === 'photo') {
        previewImage.src = blobUrl;
        previewImage.style.display = 'block';
        previewVideo.style.display = 'none';
      } else {
        previewVideo.src = blobUrl;
        previewVideo.style.display = 'block';
        previewImage.style.display = 'none';
      }

      previewTitle.textContent = `${media.type === 'photo' ? '照片' : '视频'} - ${new Date(media.timestamp).toLocaleString()}`;
      previewMeta.innerHTML = `
        <div>类型: ${media.type === 'photo' ? '照片' : '视频'}</div>
        <div>大小: ${formatBytes(media.size)}</div>
        <div>日期: ${new Date(media.timestamp).toLocaleString()}</div>
      `;

      previewModal.classList.add('active');
    }

    // 关闭媒体预览
    function closeMediaPreview() {
      previewModal.classList.remove('active');
      previewImage.src = '';
      previewVideo.src = '';
      console.log('点击关闭')

      // 清理URL
      if (previewImage.src.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage.src);
      }
      if (previewVideo.src.startsWith('blob:')) {
        URL.revokeObjectURL(previewVideo.src);
      }
    }

    // 导航到上一个/下一个媒体
    function navigatePreview(direction) {
      const newIndex = mediaLibraryState.currentPreviewIndex + direction;
      if (newIndex >= 0 && newIndex < mediaLibraryState.filteredMedia.length) {
        openMediaPreview(newIndex);
      }
    }

    // 下载单个媒体
    function downloadMedia(media, blobUrl) {
      const a = document.createElement('a');
      const extension = media.type === 'photo' ? 'png' : 'webm';
      const filename = `iseeu-${media.type}-${new Date(media.timestamp).toISOString().replace(/[:.]/g, '-')}.${extension}`;

      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showNotification(`${media.type === 'photo' ? '照片' : '视频'}下载开始`, 'success');
    }

    // 下载选中的媒体
    async function downloadSelectedMedia() {
      if (mediaLibraryState.selectedItems.size === 0) return;

      for (const mediaId of mediaLibraryState.selectedItems) {
        const media = mediaLibraryState.allMedia.find(m => m.id === mediaId);
        if (media) {
          const blobUrl = URL.createObjectURL(media.blob);
          await new Promise(resolve => setTimeout(resolve, 100)); // 避免同时下载太多文件
          downloadMedia(media, blobUrl);
          URL.revokeObjectURL(blobUrl);
        }
      }

      showNotification(`开始下载 ${mediaLibraryState.selectedItems.size} 个文件`, 'success');
    }

    // 删除单个媒体
    async function deleteSingleMedia(mediaId, blobUrl) {
      if (!confirm('确定要删除这个文件吗？')) return;

      try {
        await deleteMediaFromDB(mediaId);
        URL.revokeObjectURL(blobUrl);
        mediaLibraryState.selectedItems.delete(mediaId);
        await refreshMediaManager();
      } catch (error) {
        handleError(error, 'deleteSingleMedia');
      }
    }

    // 删除选中的媒体
    async function deleteSelectedMedia() {
      if (mediaLibraryState.selectedItems.size === 0) return;

      if (!confirm(`确定要删除选中的 ${mediaLibraryState.selectedItems.size} 个文件吗？此操作不可撤销。`)) {
        return;
      }

      try {
        for (const mediaId of mediaLibraryState.selectedItems) {
          await deleteMediaFromDB(mediaId);
        }
        mediaLibraryState.selectedItems.clear();
        await refreshMediaManager();
        exitSelectMode();
      } catch (error) {
        handleError(error, 'deleteSelectedMedia');
      }
    }

    // 分享媒体
    function shareMedia(media, blobUrl) {
      if (navigator.share) {
        const file = new File([media.blob], `iseeu-${media.type}-${media.timestamp}.${media.type === 'photo' ? 'png' : 'webm'}`, {
          type: media.type === 'photo' ? 'image/png' : 'video/webm'
        });

        navigator.share({
          files: [file],
          title: `ISeeU ${media.type === 'photo' ? '照片' : '视频'}`,
          text: `来自ISeeU摄像头的${media.type === 'photo' ? '照片' : '视频'}`
        }).catch(() => {
          // 分享失败，回退到下载
          downloadMedia(media, blobUrl);
        });
      } else {
        // 浏览器不支持分享API，使用下载
        downloadMedia(media, blobUrl);
      }
    }

    // 切换选择模式
    function toggleSelectMode() {
      mediaLibraryState.isSelectMode = !mediaLibraryState.isSelectMode;

      if (mediaLibraryState.isSelectMode) {
        mediaManager.classList.add('iseeu-selection-mode');
        selectModeBtn.textContent = '取消选择';
      } else {
        mediaLibraryState.selectedItems.clear();
        mediaManager.classList.remove('iseeu-selection-mode');
        selectModeBtn.textContent = '选择';
        updateSelectionUI();
      }

      updateMediaDisplay();
    }

    // 退出选择模式
    function exitSelectMode() {
      mediaLibraryState.isSelectMode = false;
      mediaLibraryState.selectedItems.clear();
      mediaManager.classList.remove('iseeu-selection-mode');
      selectModeBtn.textContent = '选择';
      updateMediaDisplay();
    }

    // 全选/取消全选
    function toggleSelectAll() {
      if (mediaLibraryState.selectedItems.size === mediaLibraryState.filteredMedia.length) {
        // 当前已全选，取消全选
        mediaLibraryState.selectedItems.clear();
      } else {
        // 选择所有过滤后的项目
        mediaLibraryState.selectedItems = new Set(
          mediaLibraryState.filteredMedia.map(media => media.id)
        );
      }
      updateMediaDisplay();
      updateSelectionUI();
    }

    // 更新统计信息
    function updateStats() {
      const stats = getStorageInfo(mediaLibraryState.allMedia);
      const filteredCount = mediaLibraryState.filteredMedia.length;
      const totalCount = mediaLibraryState.allMedia.length;

      let statsText = `共 ${totalCount} 个文件`;
      if (filteredCount !== totalCount) {
        statsText += ` (显示 ${filteredCount} 个)`;
      }
      statsText += ` | 照片: ${stats.photos} | 视频: ${stats.videos} | 总大小: ${stats.totalSizeFormatted}`;

      mediaStats.textContent = statsText;
    }

    // 清空所有媒体
    async function clearAllMedia() {
      if (!confirm('确定要清空所有媒体文件吗？此操作不可撤销，所有照片和视频都将被删除。')) {
        return;
      }

      try {
        await clearAllStorage();
        mediaLibraryState.selectedItems.clear();
        await refreshMediaManager();
        exitSelectMode();
      } catch (error) {
        handleError(error, 'clearAllMedia');
      }
    }

    // 切换视图
    function toggleView() {
      mediaLibraryState.currentView = mediaLibraryState.currentView === 'grid' ? 'list' : 'grid';
      updateMediaDisplay();

      // 更新按钮图标
      const icon = toggleViewBtn.querySelector('svg');
      if (mediaLibraryState.currentView === 'grid') {
        icon.innerHTML = `<path d="M3 3h8v4H3zm0 6h8v4H3zm0 6h8v4H3zm10 0h8v4h-8zm0-6h8v4h-8zm0-6h8v4h-8z"/>`;
        toggleViewBtn.title = '切换到列表视图';
      } else {
        icon.innerHTML = `<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2zm4 0h14v-2H7v2zm0-4h14v-2H7v2zm0-4h14v-2H7v2z"/>`;
        toggleViewBtn.title = '切换到网格视图';
      }
    }


    // 事件监听器
    toggleViewBtn.addEventListener('click', toggleView);
    selectAllBtn.addEventListener('click', toggleSelectAll);
    selectModeBtn.addEventListener('click', toggleSelectMode);
    deleteSelectedBtn.addEventListener('click', deleteSelectedMedia);
    downloadSelectedBtn.addEventListener('click', downloadSelectedMedia);
    clearAllBtn.addEventListener('click', clearAllMedia);
    refreshManagerBtn.addEventListener('click', refreshMediaManager);

    // 过滤器按钮事件
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mediaLibraryState.currentFilter = btn.dataset.filter;
        applyFiltersAndSearch();
        updateMediaDisplay();
      });
    });

    // 搜索事件
    mediaSearch.addEventListener('input', (e) => {
      mediaLibraryState.currentSearch = e.target.value;
      applyFiltersAndSearch();
      updateMediaDisplay();
    });

    // 预览模态框事件
    previewClose.addEventListener('click', closeMediaPreview);
    previewPrev.addEventListener('click', () => navigatePreview(-1));
    previewNext.addEventListener('click', () => navigatePreview(1));

    // 键盘导航
    previewModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMediaPreview();
      if (e.key === 'ArrowLeft') navigatePreview(-1);
      if (e.key === 'ArrowRight') navigatePreview(1);
    });

    // 点击模态框外部关闭
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        closeMediaPreview();
      }
    });

    // 原有的媒体库关闭按钮
    const closeManagerBtn = mediaManager.querySelector('.iseeu-close-manager');
    closeManagerBtn.addEventListener('click', closeMediaManager);

    // 原有的关闭媒体管理器函数
    function closeMediaManager() {
      mediaManager.classList.remove('active');
      exitSelectMode();
    }

    // 更新公共API
    window.ISeeU = window.ISeeU || {};
    window.ISeeU.openMediaManager = openMediaManager;
    window.ISeeU.refreshMediaManager = refreshMediaManager;

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

        switch (e.key) {
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
    window.ISeeU.getMediaList = async function () {
      try {
        const allMedia = await getAllMediaFromDB();
        return allMedia.sort((a, b) => b.timestamp - a.timestamp);
      } catch (e) {
        handleError(e, 'getMediaList');
        throw e;
      }
    };

    // 获取所有照片
    window.ISeeU.getPhotos = async function () {
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
    window.ISeeU.getVideos = async function () {
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
    window.ISeeU.getMediaById = async function (id) {
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
    window.ISeeU.deleteMedia = async function (id) {
      try {
        await deleteMediaFromDB(id);
        return true;
      } catch (e) {
        handleError(e, 'deleteMedia');
        throw e;
      }
    };

    // 清空所有存储的媒体
    window.ISeeU.clearAllMedia = async function () {
      try {
        await clearAllStorage();
        return true;
      } catch (e) {
        handleError(e, 'clearAllMedia');
        throw e;
      }
    };

    // 获取存储统计信息
    window.ISeeU.getStorageInfo = async function () {
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
    window.ISeeU.getVideoStream = function () {
      if (!stream) {
        throw new Error('摄像头未启动，请先调用 startCamera() 或打开插件界面');
      }
      return stream;
    };

    // 获取处理后的视频流（经过canvas处理）
    window.ISeeU.getProcessedVideoStream = function () {
      if (!stream) {
        throw new Error('摄像头未启动，请先调用 startCamera() 或打开插件界面');
      }
      return canvas.captureStream(videoConfig.frameRate);
    };

    // 获取当前视频配置
    window.ISeeU.getVideoConfig = function () {
      return { ...videoConfig };
    };

    // 设置视频配置
    window.ISeeU.setVideoConfig = function (config) {
      // 验证并合并配置
      videoConfig = validateConfig({ ...videoConfig, ...config });

      // 如果摄像头正在运行，重新启动以应用新配置
      if (stream) {
        startCamera();
      }

      return videoConfig;
    };

    // 设置视频尺寸
    window.ISeeU.setVideoSize = function (width, height) {
      videoConfig.width = Math.max(160, Math.min(4096, width));
      videoConfig.height = Math.max(120, Math.min(2160, height));

      if (stream) {
        startCamera();
      }

      return videoConfig;
    };

    // 设置视频缩放
    window.ISeeU.setVideoScale = function (scale) {
      videoConfig.scale = Math.max(0.1, Math.min(5, scale));
      return videoConfig;
    };

    // 设置帧率
    window.ISeeU.setFrameRate = function (frameRate) {
      videoConfig.frameRate = Math.max(1, Math.min(60, frameRate));

      if (stream) {
        startCamera();
      }

      return videoConfig;
    };

    // 设置镜像模式
    window.ISeeU.setMirrorMode = function (enabled) {
      videoConfig.mirror = enabled;
      return videoConfig;
    };

    // 启动摄像头（外部调用）
    window.ISeeU.startCamera = async function (config) {
      if (config) {
        videoConfig = validateConfig({ ...videoConfig, ...config });
      }
      await startCamera();
      return stream;
    };

    // 停止摄像头（外部调用）
    window.ISeeU.stopCamera = function () {
      stopCamera();
    };

    // 拍照（外部调用）
    window.ISeeU.capturePhoto = function () {
      if (!stream) {
        throw new Error('摄像头未启动');
      }
      capturePhoto();
    };

    // 开始录像（外部调用）
    window.ISeeU.startRecording = async function () {
      if (!stream) {
        throw new Error('摄像头未启动');
      }
      await startRecording();
    };

    // 停止录像（外部调用）
    window.ISeeU.stopRecording = function () {
      stopRecording();
    };

    // 切换摄像头（外部调用）
    window.ISeeU.switchCamera = function () {
      switchCamera();
    };

    // 获取当前摄像头状态
    window.ISeeU.getCameraStatus = function () {
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

    // ==================== 画布捕获API ====================

    /**
     * 获取当前摄像机画面的画布
     * @param {Object} options - 配置选项
     * @param {number} options.width - 输出画布宽度（默认使用当前视频宽度）
     * @param {number} options.height - 输出画布高度（默认使用当前视频高度）
     * @param {number} options.quality - 图像质量 (0-1，仅对blob格式有效)
     * @param {string} options.format - 输出格式: 'canvas' | 'blob' | 'dataURL' | 'imageData'
     * @param {boolean} options.includeAudio - 是否包含音频轨道（仅对blob格式有效）
     * @param {boolean} options.mirror - 是否镜像（覆盖全局设置）
     * @param {string} options.backgroundColor - 背景颜色（当视频不可用时）
     * @param {boolean} options.autoStartCamera - 如果摄像头未启动，是否自动启动
     * @returns {Promise} 返回包含画布数据的Promise
     */
    window.ISeeU.captureCanvas = async function (options = {}) {
      const {
        width,
        height,
        quality = 0.92,
        format = 'canvas',
        includeAudio = false,
        mirror,
        backgroundColor = '#1a1a2e',
        autoStartCamera = true
      } = options;

      try {
        // 检查摄像头状态
        if (!stream) {
          if (autoStartCamera) {
            updateStatus('自动启动摄像头...');
            await startCamera();
          } else {
            throw new Error('摄像头未启动，请先调用 startCamera() 或设置 autoStartCamera: true');
          }
        }

        // 创建临时画布
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

        // 设置画布尺寸
        const outputWidth = width || videoConfig.width;
        const outputHeight = height || videoConfig.height;
        tempCanvas.width = outputWidth;
        tempCanvas.height = outputHeight;

        // 检查视频是否就绪
        if (video.readyState < 2) {
          // 视频未就绪，绘制等待状态
          drawWaitingState(tempCtx, outputWidth, outputHeight, backgroundColor);
        } else {
          // 绘制当前视频帧
          const useMirror = mirror !== undefined ? mirror :
            (currentFacingMode === 'user' && videoConfig.mirror);

          if (useMirror) {
            // 镜像绘制
            tempCtx.save();
            tempCtx.translate(tempCanvas.width, 0);
            tempCtx.scale(-1, 1);
            tempCtx.drawImage(video, 0, 0, outputWidth, outputHeight);
            tempCtx.restore();
          } else {
            // 正常绘制
            tempCtx.drawImage(video, 0, 0, outputWidth, outputHeight);
          }
        }

        // 添加时间戳和水印
        addTimestampAndWatermark(tempCtx, outputWidth, outputHeight);

        // 根据请求的格式返回数据
        return await convertCanvasToFormat(tempCanvas, format, quality, includeAudio);

      } catch (error) {
        handleError(error, 'captureCanvas');
        throw error;
      }
    };

    /**
     * 绘制等待状态
     */
    function drawWaitingState(ctx, width, height, backgroundColor) {
      // 绘制背景
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // 绘制加载动画
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.1;

      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 1.5);
      ctx.stroke();

      // 绘制提示文字
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('摄像头加载中...', centerX, centerY + radius + 30);
    }

    /**
     * 添加时间戳和水印
     */
    function addTimestampAndWatermark(ctx, width, height) {
      const timestamp = new Date().toLocaleString();
      const watermark = 'ISeeU Camera';

      // 设置样式
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';

      // 绘制时间戳背景
      const timestampMetrics = ctx.measureText(timestamp);
      ctx.fillRect(10, height - 40, timestampMetrics.width + 20, 30);

      // 绘制时间戳文字
      ctx.fillStyle = '#ffffff';
      ctx.fillText(timestamp, 20, height - 20);

      // 绘制水印背景
      const watermarkMetrics = ctx.measureText(watermark);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(width - watermarkMetrics.width - 30, height - 40, watermarkMetrics.width + 20, 30);

      // 绘制水印文字
      ctx.fillStyle = '#3498db';
      ctx.fillText(watermark, width - watermarkMetrics.width - 20, height - 20);
    }

    /**
     * 将画布转换为指定格式
     */
    async function convertCanvasToFormat(canvas, format, quality, includeAudio) {
      switch (format) {
        case 'canvas':
          return canvas;

        case 'dataURL':
          return canvas.toDataURL('image/png');

        case 'blob':
          return new Promise((resolve) => {
            canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/jpeg', quality);
          });

        case 'imageData':
          const ctx = canvas.getContext('2d');
          return ctx.getImageData(0, 0, canvas.width, canvas.height);

        default:
          throw new Error(`不支持的格式: ${format}`);
      }
    }

    /**
     * 连续捕获多帧（用于创建延时摄影或动画）
     * @param {Object} options - 配置选项
     * @param {number} options.frames - 要捕获的帧数
     * @param {number} options.interval - 帧之间的间隔（毫秒）
     * @param {Function} options.onProgress - 进度回调函数
     * @returns {Promise<Array>} 返回包含所有帧的数组
     */
    window.ISeeU.captureMultipleFrames = async function (options = {}) {
      const {
        frames = 10,
        interval = 100,
        onProgress,
        ...captureOptions
      } = options;

      const results = [];

      for (let i = 0; i < frames; i++) {
        try {
          const frame = await this.captureCanvas(captureOptions);
          results.push({
            index: i,
            timestamp: Date.now(),
            data: frame
          });

          // 调用进度回调
          if (onProgress && typeof onProgress === 'function') {
            onProgress(i + 1, frames, frame);
          }

          // 等待指定间隔
          if (i < frames - 1) {
            await new Promise(resolve => setTimeout(resolve, interval));
          }
        } catch (error) {
          console.error(`捕获第 ${i + 1} 帧时出错:`, error);
          results.push({
            index: i,
            timestamp: Date.now(),
            error: error.message,
            data: null
          });
        }
      }

      return results;
    };

    /**
     * 创建视频流从画布（用于屏幕共享等场景）
     * @param {Object} options - 配置选项
     * @returns {MediaStream} 媒体流
     */
    window.ISeeU.createStreamFromCanvas = function (options = {}) {
      if (!stream) {
        throw new Error('摄像头未启动');
      }

      const {
        frameRate = videoConfig.frameRate,
        includeAudio = false
      } = options;

      let canvasStream = canvas.captureStream(frameRate);

      // 如果需要包含音频
      if (includeAudio) {
        // 这里可以合并音频轨道
        // 注意：需要用户授权麦克风权限
      }

      return canvasStream;
    };

    /**
     * 高级截图功能 - 带后处理效果
     * @param {Object} options - 配置选项
     * @returns {Promise} 处理后的图像
     */
    window.ISeeU.captureWithEffects = async function (options = {}) {
      const {
        effects = [],
        ...captureOptions
      } = options;

      // 先获取原始画布
      const originalCanvas = await this.captureCanvas({
        ...captureOptions,
        format: 'canvas'
      });

      const ctx = originalCanvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);

      // 应用效果
      let processedImageData = imageData;
      for (const effect of effects) {
        processedImageData = await applyImageEffect(processedImageData, effect);
      }

      // 将处理后的图像数据放回画布
      ctx.putImageData(processedImageData, 0, 0);

      // 转换为请求的格式
      return await convertCanvasToFormat(
        originalCanvas,
        captureOptions.format || 'canvas',
        captureOptions.quality,
        captureOptions.includeAudio
      );
    };

    /**
     * 应用图像效果
     */
    async function applyImageEffect(imageData, effect) {
      const { type, ...params } = effect;
      const data = imageData.data;

      switch (type) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = avg;
          }
          break;

        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          }
          break;

        case 'invert':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
          break;

        case 'brightness':
          const brightnessValue = params.value || 1.0;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * brightnessValue);
            data[i + 1] = Math.min(255, data[i + 1] * brightnessValue);
            data[i + 2] = Math.min(255, data[i + 2] * brightnessValue);
          }
          break;

        case 'contrast':
          const contrastValue = params.value || 1.0;
          const factor = (259 * (contrastValue + 255)) / (255 * (259 - contrastValue));
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
          }
          break;
      }
      return imageData;
    }
  }
})();
