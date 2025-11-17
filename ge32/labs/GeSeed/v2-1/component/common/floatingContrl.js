
class FloatingControl {
    /**
     * 创建实例
     * @constructor
     */
    constructor(options = {}) {
        // 默认配置
        this.config = {
            initialX: options.initialX || window.innerWidth - 80,
            initialY: options.initialY || window.innerHeight / 2,
            node: options.node || null,
            clickBack: options.clickBack || ((x, y) => { console.log(`虚拟坐标x:${x} y:${y}`) }),
            dragBack: options.dragBack || ((x, y) => { console.log("拖动事件") }),
            init: options.init || (() => { }),
            handlePointerUp: options.handlePointerUp || ((x, y) => { }),
            ...options
        };

        // 状态管理
        this.state = {
            position: {
                x: this.config.initialX,
                y: this.config.initialY
            }
        };

        // DOM 元素
        this.node = this.config.node;
        this.init();
    }

    /**
     * 初始化悬浮球
     * 创建DOM元素、绑定事件、应用样式
     * @private
     */
    init() {
        this.createContrl();
        this.bindEvents();
        this.updatePosition();

    }
    createContrl = () => { if (!document.body.contains(this.node)) document.body.appendChild(this.node); }

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

    setPostion(x, y) {
        this.state.position.x = x;
        this.state.position.y = y;
    }
    x = () => this.state.position.x;
    y = () => this.state.position.y;

    /**
     * 绑定移动端触摸事件
     * 处理触摸开始、移动、结束事件，支持拖拽和点击
     * @private
     */
    bindTouchEvents() {
        const node = this.node;
        let offsetX = 0, offsetY = 0;
        let dragging = false;
        let rafPending = false;

        const onTouchMove = (e) => {
            node.classList.add('dragging');

            dragging = true;
            e.preventDefault(); // 关键：阻止页面滚动

            const touch = e.touches[0];
            const x = touch.clientX - offsetX;
            const y = touch.clientY - offsetY;

            if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(() => {
                    this.setPostion(x, y);
                    this.updatePosition();
                    rafPending = false;
                });
            }
        };

        const onTouchEnd = () => {
            if (!dragging) {
                this.config.clickBack(this.x, this.y);
            } else {

                this.config.dragBack(this.x, this.y);
            }
            dragging = false;
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            node.classList.remove('dragging');
            this.config.handlePointerUp(this.x(), this.y());
        };

        node.addEventListener("touchstart", (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
                return; // 不处理多指操作
            }
            e.preventDefault(); // 也在这里阻止默认行为
            e.stopPropagation();
            const touch = e.touches[0];
            const rect = node.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
            document.addEventListener("touchmove", onTouchMove, { passive: false });
            document.addEventListener("touchend", onTouchEnd);
        });
    }

    /**
     * 绑定桌面端鼠标事件
     * 处理鼠标点击、拖拽事件
     * @private
     */
    bindMouseEvents() {
        const node = this.node;
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        // 点击显示菜单
        node.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) {
                this.config.clickBack(this.x, this.y);
            }
            else {
                this.config.dragBack(this.x, this.y);
            }
        });

        // 拖动功能
        node.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            node.classList.add('dragging');
            const rect = node.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;

            const onMouseMove = (e) => {
                isDragging = true;
                this.state.position.x = e.clientX - dragOffset.x;
                this.state.position.y = e.clientY - dragOffset.y;
                this.updatePosition();
            };
            const onMouseUp = () => {
                node.classList.remove('dragging');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                requestAnimationFrame(() => {
                    isDragging = false;
                    this.config.handlePointerUp(this.x, this.y);
                });
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }


    updatePosition() {
        if (this.node) {
            this.node.style.left = `${this.state.position.x}px`;
            this.node.style.top = `${this.state.position.y}px`;
        }
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
     * 移除所有DOM元素，清理事件监听器
     * @public
     */
    destroy() {
        if (this.node) {
            this.node.remove();
        }
    }
}

// 导出类
export default FloatingControl;