function listAvailableVoices() {
    const voices = window.speechSynthesis.getVoices();
    console.log("语音功能-----------")

    voices.forEach(voice => {
        console.log(`Name: ${voice.name}, Lang: ${voice.lang}, Local: ${voice.localService}`);
    });
}
listAvailableVoices()

/**
 * CSS 样式动态生成器类
 * 
 * 功能特点：
 * - 动态创建和管理 CSS 样式规则
 * - 支持伪类、伪元素、媒体查询
 * - 自动注入和清理样式
 * - 响应式设计支持
 * - 样式变量和动画管理
 * 
 * @example
 * const style = new CssStyleMaker(config, 'my-component');
 * style.set({ color: 'red', fontSize: '16px' })
 *      .hover({ color: 'blue' })
 *      .responsive('md', { ':hover': { color: 'green' } });
 */
export class CssStyleMaker {
    /**
     * 创建样式生成器实例
     * @param {Object} config - 配置对象
     * @param {string} config.prefix - 样式类名前缀
     * @param {boolean} config.autoInject - 是否自动注入样式
     * @param {Object} config.mediaQueries - 媒体查询断点配置
     * @param {string} clsName - 基础样式类名
     */
    constructor(config, clsName) {
        /** @private 配置对象 */
        this.config = config;
        /** @private 基础类名 */
        this.clsName = clsName;
        /** @private 实例唯一标识 */
        this.instanceId = `stylemaker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        /** @private 实例是否已被销毁 */
        this.destroyed = false;

        // 初始化注册表
        /** @private 注册表键名 */
        this.registryKey = `${config.prefix}${clsName}`;
        /** @private 注册表条目 */
        this.registryEntry = this.initRegistryEntry();

        // 为当前样式实例打标签并缓存
        this.registerStyleInstance();

        // 初始化自动注入
        if (config.autoInject) {
            this.initAutoInject();
        }
    }

    /**
     * 注册样式实例到全局注册表
     * 用于跟踪和管理所有样式实例
     * @private
     */
    registerStyleInstance() {
        if (!window.__StyleMakerRegistry) {
            window.__StyleMakerRegistry = {};
        }

        // 把当前实例加入全局缓存
        window.__StyleMakerRegistry[this.instanceId] = {
            clsName: this.clsName,
            createdAt: Date.now(),
            elementSelector: `.${this.clsName}`,
        };

        // 直接在DOM元素上标记 data-style-instance
        const elements = document.querySelectorAll(`.${this.clsName}`);
        elements.forEach(el => {
            el.dataset.styleInstance = this.instanceId;
        });
    }

    /**
     * 初始化注册表条目
     * 创建或获取对应的 style 元素
     * @private
     * @returns {Object} 注册表条目
     */
    initRegistryEntry() {
        if (!window.__styleMakerRegistry) {
            window.__styleMakerRegistry = new Map();
        }

        let registryEntry = window.__styleMakerRegistry.get(this.registryKey);

        if (!registryEntry) {
            const styleEl = document.createElement('style');
            styleEl.setAttribute('data-style-maker', this.registryKey);
            document.head.appendChild(styleEl);

            registryEntry = {
                styleEl,                    // 对应的 style 元素
                instanceIds: new Set(),     // 关联的实例ID集合
                injectedElements: new Map(), // 注入样式的元素映射
                rules: new Map(),           // CSS规则映射
                variables: new Map(),       // CSS变量映射
                keyframes: new Map(),       // 关键帧动画映射
                active: false,              // 是否激活状态
                dirty: false                // 是否需要重新渲染
            };
            window.__styleMakerRegistry.set(this.registryKey, registryEntry);
        }

        // ⚙️ 如果样式已经存在，就不重复添加 instanceId
        if (!registryEntry.instanceIds.has(this.instanceId)) {
            // 只有第一次实例化时才添加
            if (registryEntry.instanceIds.size === 0) {
                registryEntry.instanceIds.add(this.instanceId);
                registryEntry.styleEl.setAttribute(
                    'data-style-instance',
                    this.instanceId
                );
            }
        }

        return registryEntry;
    }

    /**
     * 初始化自动注入监听
     * 监听DOM变化，自动激活相关样式
     * @private
     */
    initAutoInject() {
        const checkElements = () => {
            const found = document.querySelector(`.${this.config.prefix}${this.clsName}`);
            const wasActive = this.registryEntry.active;
            this.registryEntry.active = !!found;
            if (this.registryEntry.active !== wasActive) this.scheduleRender();
        };

        this.observer = new MutationObserver(() => checkElements());
        this.observer.observe(document.body, { childList: true, subtree: true });
        checkElements(); // 初始检查一次
    }

    /**
     * 检查实例是否存活
     * @throws {Error} 如果实例已被销毁则抛出错误
     * @private
     */
    checkAlive() {
        if (this.destroyed) throw new Error('This styleMaker instance has been destroyed.');
    }

    /**
     * 立即渲染所有CSS规则到style元素
     * @private
     */
    renderNow() {
        // 若页面中没有对应 class，且没有任何元素被注入，则不渲染
        if (!this.registryEntry.active && !document.querySelector(`.${this.config.prefix}${this.clsName}`)) {
            this.registryEntry.styleEl.textContent = '';
            return;
        }

        const out = [];
        const { variables, keyframes, rules } = this.registryEntry;

        // 生成CSS变量
        variables.forEach((v, scope) => {
            out.push(`${scope} { ${this.generateCSS(v)} }`);
        });

        // 生成关键帧动画
        keyframes.forEach((frames, name) => {
            const content = Object.entries(frames)
                .map(([pct, props]) => `${pct} { ${this.generateCSS(props)} }`)
                .join('\n');
            out.push(`@keyframes ${name} { ${content} }`);
        });

        // 生成媒体查询和普通规则
        const mediaMap = {};
        rules.forEach((value) => {
            const { selector, media, props } = value;
            const css = `${selector} { ${this.generateCSS(props)} }`;
            if (media) (mediaMap[media] ||= []).push(css);
            else out.push(css);
        });

        // 生成媒体查询块
        for (const [mq, arr] of Object.entries(mediaMap)) {
            out.push(`@media ${mq} { ${arr.join('\n')} }`);
        }

        this.registryEntry.styleEl.textContent = out.join('\n');
    }

    /**
     * 调度渲染（防抖）
     * 使用 requestAnimationFrame 避免频繁重绘
     * @private
     */
    scheduleRender() {
        if (this.registryEntry.dirty) return;
        this.registryEntry.dirty = true;
        requestAnimationFrame(() => {
            this.registryEntry.dirty = false;
            this.renderNow();
        });
    }

    /**
     * 将JavaScript样式对象转换为CSS字符串
     * @param {Object} props - 样式属性对象
     * @returns {string} CSS字符串
     * @private
     */
    generateCSS(props) {
        return Object.entries(props)
            .map(([prop, value]) => {
                const cssProp = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
                return `${cssProp}: ${value};`;
            })
            .join(' ');
    }

    /**
     * 向元素注入样式类
     * @param {Element} element - 目标元素
     * @param {string} additionalClasses - 额外类名
     * @returns {Element} 处理后的元素
     * @private
     */
    injectClass(element, additionalClasses = '') {
        if (!element) return null;
        const fullClassName = `${this.config.prefix}${this.clsName}${additionalClasses ? ` ${additionalClasses}` : ''}`;
        const classSet = fullClassName.split(' ');

        if (element.classList) element.classList.add(...classSet);
        else {
            const existingClass = element.getAttribute('class') || '';
            element.setAttribute('class', `${existingClass} ${fullClassName}`.trim());
        }

        this.registryEntry.injectedElements.set(element, classSet);
        this.registryEntry.active = true; // 有元素注入时标记激活
        this.scheduleRender();
        return element;
    }

    /**
     * 移除元素上的注入样式
     * @param {Element} element - 目标元素
     * @private
     */
    removeInjectedClass(element) {
        if (!element) return;
        const classSet = this.registryEntry.injectedElements.get(element);
        if (!classSet) return;

        if (element.classList) classSet.forEach(cls => element.classList.remove(cls));
        else {
            const existingClass = element.getAttribute('class') || '';
            const newClass = existingClass.split(' ')
                .filter(cls => !classSet.includes(cls))
                .join(' ')
                .trim();
            element.setAttribute('class', newClass);
        }

        this.registryEntry.injectedElements.delete(element);
        if (this.registryEntry.injectedElements.size === 0) this.registryEntry.active = false;
        this.scheduleRender();
    }

    // ========== 公共 API 方法 ==========

    /**
     * 设置基础样式规则
     * @param {Object} props - 样式属性对象
     * @param {string} selector - 选择器后缀
     * @param {string} media - 媒体查询条件
     * @returns {CssStyleMaker} 当前实例（支持链式调用）
     */
    set(props, selector = '', media = '') {
        this.checkAlive();
        const sel = (selector.startsWith(':') || selector.startsWith('.') || selector.startsWith(' '))
            ? `.${this.config.prefix}${this.clsName}${selector}`
            : `.${this.config.prefix}${this.clsName} ${selector}`;
        const key = `${sel}@@${media}`;
        this.registryEntry.rules.set(key, { selector: sel, media, props });
        this.scheduleRender();
        return this;
    }

    /** 设置悬停状态样式 */
    hover(props) { return this.set(props, ':hover'); }
    
    /** 设置激活状态样式 */
    active(props) { return this.set(props, ':active'); }
    
    /** 设置焦点状态样式 */
    focus(props) { return this.set(props, ':focus'); }
    
    /** 设置访问过的链接样式 */
    visited(props) { return this.set(props, ':visited'); }
    
    /** 设置伪元素 before 的样式 */
    before(props) { return this.set(props, '::before'); }
    
    /** 设置伪元素 after 的样式 */
    after(props) { return this.set(props, '::after'); }
    
    /** 设置输入框占位符样式 */
    placeholder(props) { return this.set(props, '::placeholder'); }
    
    /** 设置文本选中样式 */
    selection(props) { return this.set(props, '::selection'); }

    /**
     * 设置CSS变量
     * @param {Object} vars - 变量对象
     * @param {string} scope - 作用域（默认 :root）
     * @returns {CssStyleMaker} 当前实例
     */
    setVariables(vars, scope = ':root') {
        this.checkAlive();
        this.registryEntry.variables.set(scope, vars);
        this.scheduleRender();
        return this;
    }

    /**
     * 设置关键帧动画
     * @param {string} name - 动画名称
     * @param {Object} frames - 关键帧对象 { '0%': {...}, '50%': {...}, '100%': {...} }
     * @returns {CssStyleMaker} 当前实例
     */
    setKeyframes(name, frames) {
        this.checkAlive();
        this.registryEntry.keyframes.set(name, frames);
        this.scheduleRender();
        return this;
    }

    /**
     * 响应式样式设置
     * @param {string} bp - 断点名称或媒体查询
     * @param {Object} styles - 样式规则对象 { 选择器: 样式属性 }
     * @returns {CssStyleMaker} 当前实例
     */
    responsive(bp, styles) {
        this.checkAlive();
        const mq = this.config.mediaQueries[bp] || bp;
        Object.entries(styles).forEach(([sel, props]) =>
            this.set(props, sel, mq)
        );
        return this;
    }

    /**
     * 向单个元素注入样式类
     * @param {Element} element - 目标元素
     * @param {string} additionalClasses - 额外类名
     * @returns {Element} 处理后的元素
     */
    inject(element, additionalClasses = '') {
        this.checkAlive();
        return this.injectClass(element, additionalClasses);
    }

    /**
     * 向多个元素注入样式类
     * @param {Element|NodeList|Array|string} elements - 元素、元素列表、选择器
     * @param {string} additionalClasses - 额外类名
     * @returns {CssStyleMaker} 当前实例
     */
    injectAll(elements, additionalClasses = '') {
        this.checkAlive();
        if (!elements) return this;
        if (typeof elements === 'string') elements = document.querySelectorAll(elements);
        if (elements instanceof NodeList || Array.isArray(elements))
            elements.forEach(el => this.injectClass(el, additionalClasses));
        else if (elements instanceof Element)
            this.injectClass(elements, additionalClasses);
        return this;
    }

    /**
     * 移除元素的样式注入
     * @param {Element} element - 目标元素
     * @returns {CssStyleMaker} 当前实例
     */
    removeInjection(element) {
        this.checkAlive();
        this.removeInjectedClass(element);
        return this;
    }

    /**
     * 清除所有注入的样式
     * @returns {CssStyleMaker} 当前实例
     */
    clearInjected() {
        this.checkAlive();
        for (const el of this.registryEntry.injectedElements.keys()) this.removeInjectedClass(el);
        this.registryEntry.injectedElements.clear();
        this.registryEntry.active = false;
        this.scheduleRender();
        return this;
    }

    /**
     * 清除指定类型的样式
     * @param {string} type - 清除类型: 'styles' | 'variables' | 'keyframes' | 'injected' | 'all'
     * @returns {CssStyleMaker} 当前实例
     */
    clear(type = 'all') {
        this.checkAlive();
        switch (type) {
            case 'styles': this.registryEntry.rules.clear(); break;
            case 'variables': this.registryEntry.variables.clear(); break;
            case 'keyframes': this.registryEntry.keyframes.clear(); break;
            case 'injected': this.clearInjected(); break;
            default:
                this.registryEntry.rules.clear();
                this.registryEntry.variables.clear();
                this.registryEntry.keyframes.clear();
        }
        this.scheduleRender();
        return this;
    }

    /**
     * 销毁当前样式实例
     * 清理所有相关资源和监听器
     * @returns {null} 返回null防止继续使用
     */
    destroy() {
        if (this.destroyed) return null;

        this.clearInjected();
        this.registryEntry.rules.clear();
        this.registryEntry.variables.clear();
        this.registryEntry.keyframes.clear();
        this.registryEntry.injectedElements.clear();

        this.registryEntry.instanceIds.delete(this.instanceId);
        const cur = this.registryEntry.styleEl.getAttribute('data-style-instance') || '';
        const newList = cur.split(' ').filter(Boolean).filter(id => id !== this.instanceId).join(' ');
        if (newList) this.registryEntry.styleEl.setAttribute('data-style-instance', newList);
        else this.registryEntry.styleEl.removeAttribute('data-style-instance');

        if (this.registryEntry.instanceIds.size === 0) {
            if (this.registryEntry.styleEl && this.registryEntry.styleEl.parentNode)
                this.registryEntry.styleEl.parentNode.removeChild(this.registryEntry.styleEl);
            window.__styleMakerRegistry.delete(this.registryKey);
        }

        if (this.observer) {
            this.observer.disconnect();
        }

        this.destroyed = true;
        return null;
    }

    // ========== Getter 属性 ==========

    /** 获取生成的CSS文本 */
    get css() { return this.destroyed ? '' : this.registryEntry.styleEl.textContent; }
    
    /** 获取完整的样式类名 */
    get className() { return `${this.config.prefix}${this.clsName}`; }
    
    /** 获取已注入样式的元素数量 */
    get injectedCount() { return this.registryEntry.injectedElements.size; }
    
    /** 检查实例是否已被销毁 */
    get isDestroyed() { return this.destroyed; }
}

// 使用示例：
// const style = new StyleMaker(config, 'my-style');
// style.set({ color: 'red' }).inject(document.getElementById('element'));