// 文章导入部分
import { createDiv } from "../js/nodeCreater.js";
import { CssStyleMaker } from "../js/cssMaker.js";

function randPrefix(len = 6, prefix = '') {
    let s = '';
    while (len--) s += (Math.random() * 10) | 0;
    return `x${s}-${prefix}`;
}

const prefix = randPrefix(3, 'progress-');

/* -----------------------------
   注入 CSS - 美化版本
------------------------------ */
function initCSS() {
    const config = {
        prefix,
        autoInject: false,
        mediaQueries: {
            sm: '(min-width: 640px)',
            md: '(min-width: 768px)',
            lg: '(min-width: 1024px)'
        }
    };

    // 容器 CSS - 美化版本
    const progressContainer = new CssStyleMaker(config, 'container');
    progressContainer.set({
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '6px', // 稍微加高一点
        background: 'rgba(236, 240, 241, 0.9)', // 半透明背景
        zIndex: '10000',
        backdropFilter: 'blur(4px)', // 毛玻璃效果
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' // 轻微阴影
    });

    // 进度条 CSS - 美化版本
    const progressBar = new CssStyleMaker(config, 'bar');
    progressBar.set({
        height: '100%',
        // 使用渐变色背景，从红到黄到绿
        background: 'linear-gradient(90deg, #ff4757 0%, #ffa502 50%, #2ed573 100%)',
        width: '0%',
        transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 更平滑的缓动函数
        position: 'relative',
        overflow: 'hidden'
    });

    // 添加流光动画效果
    progressBar.setKeyframes('shimmer', {
        '0%': {
            transform: 'translateX(-100%)'
        },
        '100%': {
            transform: 'translateX(100%)'
        }
    });

    // 为进度条添加伪元素实现流光效果
    progressBar.set({
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: 'shimmer 2s infinite'
    }, '::after');

    // 添加加载动画
    progressBar.setKeyframes('pulse-glow', {
        '0%': {
            boxShadow: '0 0 5px rgba(18, 26, 31, 0.64)'
        },
        '50%': {
            boxShadow: '0 0 200px rgba(0, 99, 165, 0.8)'
        },
        '100%': {
            boxShadow: '0 0 25px rgba(2, 126, 241, 0.7)'
        }
    });

    // 手动触发样式渲染
    progressContainer.renderNow();
    progressBar.renderNow();
}

/* -----------------------------
   获取滚动百分比
------------------------------ */
export function getScrollPercent() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;

    const scrollableHeight = docHeight - winHeight;

    if (scrollableHeight <= 0) return 0;

    return Math.min(
        Math.max(scrollTop / scrollableHeight * 100, 0),
        100
    );
}



/* -----------------------------
   更新进度条 - 美化版本
------------------------------ */
function updateProgressBar() {
    const percent = getScrollPercent();
    const bar = document.getElementById(`${prefix}bar`);
    
    if (bar) {
        bar.style.width = percent + "%";
        
        // 动态更新颜色
        bar.style.background = `linear-gradient(90deg, #47f3ffff 0%, #0685a5ff 50%, #037cc2ff 100%)`;
        
        // 根据进度添加发光效果
        if (percent > 90) {
            bar.style.animation = 'pulse-glow 1.5s ease-in-out infinite';
        } else {
            bar.style.animation = 'none';
        }
        
        // 添加完成状态的平滑过渡
        if (percent >= 99.9) {
            bar.style.transition = 'width 0.3s ease, background 0.5s ease';
        } else {
            bar.style.transition = 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }
}

/* -----------------------------
   初始化进度条 - 美化版本
------------------------------ */
export function initProgress(isShow = true) {
    const percent = getScrollPercent();

    // 不显示 → 不创建 UI，不监听事件，直接返回进度
    if (!isShow) {
        return percent;
    }

    // 显示 UI
    initCSS();

    const container = createDiv(`${prefix}container`, {
        attrs: { 
            id: `${prefix}container`,
            'data-progress': 'true' // 添加数据属性便于识别
        }
    });

    const bar = createDiv(`${prefix}bar`, {
        attrs: { 
            id: `${prefix}bar`,
            'data-percent': '0' // 存储当前百分比
        }
    });

    container.appendChild(bar);
    document.body.appendChild(container);

    // 初始化一次
    updateProgressBar();

    // 滚动时更新 UI - 添加防抖优化性能
    let scrollTimeout;
    const handleScroll = () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateProgressBar, 10);
    };

    window.addEventListener('scroll', handleScroll);

    // 添加页面加载完成的庆祝效果
    window.addEventListener('load', () => {
        setTimeout(() => {
            const bar = document.getElementById(`${prefix}bar`);
            if (bar && parseFloat(bar.style.width || 0) > 95) {
                bar.style.animation = 'pulse-glow 0.8s ease-in-out 3';
            }
        }, 500);
    });

    return percent;
}

/* -----------------------------
   额外功能：手动控制进度条
------------------------------ */

/**
 * 手动设置进度条进度
 * @param {number} percent - 进度百分比 (0-100)
 */
export function setProgress(percent) {
    const bar = document.getElementById(`${prefix}bar`);
    if (bar) {
        bar.style.width = Math.max(0, Math.min(100, percent)) + "%";
        bar.setAttribute('data-percent', percent);
        updateProgressBar();
    }
}

/**
 * 显示/隐藏进度条
 * @param {boolean} show - 是否显示
 */
export function toggleProgress(show) {
    const container = document.getElementById(`${prefix}container`);
    if (container) {
        container.style.display = show ? 'block' : 'none';
    }
}

/**
 * 销毁进度条
 */
export function destroyProgress() {
    const container = document.getElementById(`${prefix}container`);
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
    // 移除事件监听器等...
}