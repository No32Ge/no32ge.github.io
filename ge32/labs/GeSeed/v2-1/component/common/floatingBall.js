/**
 * 悬浮球控件模块
 * 提供一个可拖拽、可点击的悬浮球组件，支持桌面端和移动端
 * @module FloatingBall
 */

// 导入工具函数和样式创建器
import { CssStyleMaker } from "../../js/cssMaker.js";


/**
 * 生成指定长度的随机数字字符串
 * @param {number} len - 字符串长度，默认为6
 * @returns {string} 随机数字字符串
 * @example
 * randDigt(4); // "1234"
 * randDigt(6); // "123456"
 */
function randDigt(len = 6) {
    let s = '';
    while (len--) s += (Math.random() * 10) | 0;
    return `${s}`;
}

/**
 * 悬浮球CSS类名，使用随机后缀避免样式冲突
 * @constant {string}
 */
const ClassfloatingControl = `floating-control-${randDigt(6)}`;

/**
 * 悬浮球DOM元素ID，使用随机后缀确保唯一性
 * @constant {string}
 */
const idFloatingControl = `floating-control-${randDigt(6)}`;

/**
 * 悬浮球主类
 * 提供完整的悬浮球功能，包括拖拽、点击、自动吸附等
 * @class
 * @example
 * const floatingBall = new FloatingBall({
 *   size: 60,
 *   color: '#3498db',
 *   icon: '⚙️',
 *   clickBack: (x, y, setSize) => {
 *     // 处理点击事件
 *   }
 * });
 */
class FloatingBall {
    /**
     * 创建悬浮球实例
     * @constructor
     * @param {Object} options - 配置选项
     * @param {number} [options.initialX=window.innerWidth-80] - 初始X坐标
     * @param {number} [options.initialY=window.innerHeight/2] - 初始Y坐标
     * @param {number} [options.size=60] - 悬浮球直径（px）
     * @param {string} [options.color='#3498db'] - 悬浮球背景色
     * @param {string} [options.icon='⚙️'] - 悬浮球图标（支持HTML或emoji）
     * @param {Function} [options.clickBack] - 点击回调函数
     * @param {number} options.clickBack.x - 目标位置的X坐标
     * @param {number} options.clickBack.y - 目标位置的Y坐标
     * @param {Function} options.clickBack.z - 设置目标组件尺寸的回调函数
     */
    constructor(options = {}) {
        // 默认配置
        this.config = {
            initialX: options.initialX || window.innerWidth - 80,
            initialY: options.initialY || window.innerHeight / 2,
            size: options.size || 60,
            color: options.color || '#3498db',
            icon: options.icon || '⚙️',
            clickBack: options.clickBack || ((x, y, z) => { console.log(`虚拟坐标x:${x} y:${y}`) }),
            dragBack: options.dragBack || (()=>{console.log("拖动事件")}),
            ...options
        };

        // 状态管理
        this.state = {
            isMobileLocked: false,
            position: {
                x: this.config.initialX,
                y: this.config.initialY
            },
            targetSize: {
                width: 200,
                height: 200
            }
        };

        // DOM 元素
        this.elements = {
            ball: null,
            menu: null
        };

        this.init();
    }

    /**
     * 初始化悬浮球
     * 创建DOM元素、绑定事件、应用样式
     * @private
     */
    init() {
        this.createBall();
        this.bindEvents();
        this.updatePosition();
        this.refrash();
        initCSS();
    }

    refrash() {
        window.addEventListener('resize', () => {
            this.autoSnapToEdge();
        });
    }

    /**
     * 创建悬浮球DOM元素并添加到页面
     * @private
     */
    createBall() {
        this.elements.ball = document.createElement('div');
        this.elements.ball.className = ClassfloatingControl;
        this.elements.ball.id = idFloatingControl;
        this.elements.ball.innerHTML = this.config.icon;

        // 应用样式
        Object.assign(this.elements.ball.style, {
            width: `${this.config.size}px`,
            height: `${this.config.size}px`,
            backgroundColor: this.config.color,
            fontSize: `${this.config.size * 0.4}px`
        });

        document.body.appendChild(this.elements.ball);
    }

    /**
     * 绑定事件监听器
     * 根据设备类型绑定相应的事件（触摸或鼠标）
     * @private
     */
    bindEvents() {
        const isTouch = this.isTouchDevice();

        if (isTouch) {
            this.bindTouchEvents();
        } else {
            this.bindMouseEvents();
        }
    }

    /**
     * 绑定移动端触摸事件
     * 处理触摸开始、移动、结束事件，支持拖拽和点击
     * @private
     */
    bindTouchEvents() {
        const ball = this.elements.ball;
        let offsetX = 0, offsetY = 0;
        let dragging = false;
        let rafPending = false;

        const onTouchMove = (e) => {
            ball.classList.add('dragging');

            dragging = true;
            e.preventDefault(); // 关键：阻止页面滚动

            const touch = e.touches[0];
            const x = touch.clientX - offsetX;
            const y = touch.clientY - offsetY;

            if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(() => {
                    this.state.position.x = x;
                    this.state.position.y = y;
                    this.updatePosition();
                    rafPending = false;
                });
            }
        };

        const onTouchEnd = () => {
            if (!dragging) {
                const position = this.positionTarget();
                this.config.clickBack(position.targetLeft, position.targetTop, (node) => {
                    const rect = node.getBoundingClientRect();
                    this._setTargetSize(rect.width, rect.height);
                });
            }else{
                const position = this.positionTarget();
                this.config.dragBack(position.targetLeft,position.targetTop);
            }
            dragging = false;
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            ball.classList.remove('dragging');
            this.autoSnapToEdge();
        };

        ball.addEventListener("touchstart", (e) => {
            this.updatePosition()
            if (e.touches.length > 1) {
                e.preventDefault();
                return; // 不处理多指操作
            }
            e.preventDefault(); // 也在这里阻止默认行为
            e.stopPropagation();
            const touch = e.touches[0];
            const rect = ball.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
            document.addEventListener("touchmove", onTouchMove, { passive: false });
            document.addEventListener("touchend", onTouchEnd);
        });
    }

    /**
     * 设置目标组件尺寸
     * @private
     * @param {number} width - 目标宽度
     * @param {number} height - 目标高度
     */
    _setTargetSize(width, height) {
        this.state.targetSize.width = width;
        this.state.targetSize.height = height;
    }

    /**
     * 绑定桌面端鼠标事件
     * 处理鼠标点击、拖拽事件
     * @private
     */
    bindMouseEvents() {
        const ball = this.elements.ball;
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        // 点击显示菜单
        ball.addEventListener('click', (e) => {
            this.updatePosition();
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) {
                const position = this.positionTarget();
                this.config.clickBack(position.targetLeft, position.targetTop, (node) => {
                    const rect = node.getBoundingClientRect();
                    this._setTargetSize(rect.width, rect.height);
                });
            }
            else{
                const position = this.positionTarget();
                this.config.dragBack(position.targetLeft,position.targetTop);
            }
        });

        // 拖动功能
        ball.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();

            ball.classList.add('dragging');

            const rect = ball.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;

            const onMouseMove = (e) => {
                isDragging = true;
                this.state.position.x = e.clientX - dragOffset.x;
                this.state.position.y = e.clientY - dragOffset.y;
                this.updatePosition();
            };

            const onMouseUp = () => {

                ball.classList.remove('dragging');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                requestAnimationFrame(() => {
                    isDragging = false;
                    this.autoSnapToEdge();
                    this.state.originalPosition = { ...this.state.position };
                });
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    /**
     * 自动吸附到屏幕边缘
     * 当悬浮球靠近屏幕边缘时自动吸附，提高用户体验
     * @private
     */
    autoSnapToEdge() {

        const controlSize = this.config.size;
        const edgeThreshold = 80;
        const x = this.state.position.x;
        const y = this.state.position.y;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const toLeft = x;
        const toRight = width - x - controlSize;
        const toTop = y;
        const toBottom = height - y - controlSize;

        const minDistance = Math.min(toLeft, toRight, toTop, toBottom);
        const ball = this.elements.ball;

        // 移除所有边缘类
        ['left-edge', 'right-edge', 'top-edge', 'bottom-edge'].forEach(edgeClass => {
            ball.classList.remove(edgeClass);
        });

        if (minDistance < edgeThreshold) {
            if (minDistance === toLeft) {
                this.state.position.x = -controlSize / 2;
                ball.classList.add('left-edge');
            } else if (minDistance === toRight) {
                this.state.position.x = width - controlSize / 2;
                ball.classList.add('right-edge');
            } else if (minDistance === toTop) {
                this.state.position.y = -controlSize / 2;
                ball.classList.add('top-edge');
            } else if (minDistance === toBottom) {
                this.state.position.y = height - controlSize / 2;
                ball.classList.add('bottom-edge');
            }

            this.updatePosition();
            this.state.originalPosition = { ...this.state.position };
        }
    }

    /**
     * 更新悬浮球位置
     * 将状态中的位置信息应用到DOM元素上
     * @private
     */
    updatePosition() {
        if (this.elements.ball) {
            this.elements.ball.style.left = `${this.state.position.x}px`;
            this.elements.ball.style.top = `${this.state.position.y}px`;
        }
    }

    /**
     * 计算目标组件位置
     * 返回虚拟坐标，确保目标组件不会超出屏幕边界
     * @private
     * @returns {Object} 目标位置信息
     * @returns {number} return.targetLeft - 目标组件的左侧位置
     * @returns {number} return.targetTop - 目标组件的顶部位置
     */
    positionTarget() {
        const componentWidth = this.state.targetSize.width;
        const componentHeight = this.state.targetSize.height;
        const ball = this.elements.ball;
        const controlRect = ball.getBoundingClientRect();
        let targetLeft = controlRect.left;
        let targetTop = controlRect.bottom + 10;

        // 确保目标不会超出屏幕
        if (targetLeft + componentWidth > window.innerWidth) {
            targetLeft = window.innerWidth - componentWidth - 10;
        }
        if (targetLeft < 0) {
            targetLeft = 15;
        }
        if (targetTop + componentHeight > window.innerHeight) {
            targetTop = controlRect.top - componentHeight - 10;
        }

        return { targetLeft, targetTop }
    }

    /**
     * 检测是否为触摸设备
     * 判断当前环境是否支持触摸操作
     * @private
     * @returns {boolean} 是否为触摸设备
     */
    isTouchDevice() {
        return 'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }

    /**
     * 获取屏幕信息
     * 根据百分比坐标计算实际像素位置
     * @param {number} [px=0] - X轴百分比（0-100）
     * @param {number} [py=0] - Y轴百分比（0-100）
     * @returns {Object} 屏幕信息对象
     * @returns {number} return.x - X坐标（px）
     * @returns {number} return.y - Y坐标（px）
     * @returns {number} return.width - 屏幕宽度（px）
     * @returns {number} return.height - 屏幕高度（px）
     * @returns {number} return.ratio - 屏幕宽高比
     */
    getScreenInfo(px = 0, py = 0) {
        px = Math.min(Math.max(px, 0), 100);
        py = Math.min(Math.max(py, 0), 100);

        const xRatio = px / 100;
        const yRatio = py / 100;

        return {
            x: window.innerWidth * xRatio,
            y: window.innerHeight * yRatio,
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight
        };
    }

    /**
     * 更新悬浮球配置
     * 动态修改悬浮球的样式和配置
     * @public
     * @param {Object} newConfig - 新的配置选项
     * @param {number} [newConfig.size] - 新的尺寸
     * @param {string} [newConfig.color] - 新的颜色
     * @param {string} [newConfig.icon] - 新的图标
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };

        // 更新样式
        if (this.elements.ball) {
            Object.assign(this.elements.ball.style, {
                width: `${this.config.size}px`,
                height: `${this.config.size}px`,
                backgroundColor: this.config.color,
                fontSize: `${this.config.size * 0.4}px`
            });
        }
    }

    /**
     * 销毁悬浮球实例
     * 移除所有DOM元素，清理事件监听器
     * @public
     */
    destroy() {
        if (this.elements.ball) {
            this.elements.ball.remove();
        }
        if (this.elements.menu) {
            this.elements.menu.remove();
        }
    }
}

/**
 * 初始化悬浮球CSS样式
 * 创建并注入悬浮球的所有样式规则，包括基础样式、悬停状态、拖拽状态等
 * @private
 */
function initCSS() {
    // 创建悬浮球样式实例
    const floatingControlStyle = new CssStyleMaker({
        prefix: '',
        autoInject: true,
        mediaQueries: {
            mobile: '(max-width: 767px)'
        }
    }, ClassfloatingControl);

    // 基础样式
    floatingControlStyle.set({
        position: 'fixed',
        width: '60px',
        height: '60px',
        background: '#3498db',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        zIndex: 9999,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
    });

    // 悬停状态
    floatingControlStyle.hover({
        transform: 'scale(1.1)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
    });

    // 拖拽状态
    floatingControlStyle.set({
        transition: 'none',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)'
    }, '.dragging');

    // 边缘位置样式
    floatingControlStyle.set({ left: '-30px' }, '.left-edge');
    floatingControlStyle.set({ right: '-30px' }, '.right-edge');
    floatingControlStyle.set({ top: '-30px' }, '.top-edge');
    floatingControlStyle.set({ bottom: '-30px' }, '.bottom-edge');

    // 移动端响应式样式
    floatingControlStyle.responsive('mobile', {
        '': {
            width: '65px',
            height: '65px',
            fontSize: '1.8rem'
        },
        '.mobile-locked': {
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'auto'
        },
        '.mobile-returning': {
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '.dragging': {
            transition: 'none'
        }
    });
    floatingControlStyle.inject();
}

// 导出类
export default FloatingBall;