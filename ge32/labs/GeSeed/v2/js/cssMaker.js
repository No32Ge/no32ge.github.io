        function listAvailableVoices() {
            const voices = window.speechSynthesis.getVoices();
            console.log("语音功能-----------")

            voices.forEach(voice => {
                console.log(`Name: ${voice.name}, Lang: ${voice.lang}, Local: ${voice.localService}`);
            });
        }
        listAvailableVoices()

export class CssStyleMaker {
    constructor(config, clsName) {
        this.config = config;
        this.clsName = clsName;
        this.instanceId = `stylemaker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.destroyed = false;

        // 初始化注册表
        this.registryKey = `${config.prefix}${clsName}`;
        this.registryEntry = this.initRegistryEntry();

        // 初始化自动注入
        if (config.autoInject) {
            this.initAutoInject();
        }
    }

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
                styleEl,
                instanceIds: new Set(),
                injectedElements: new Map(),
                rules: new Map(),
                variables: new Map(),
                keyframes: new Map(),
                active: false,
                dirty: false
            };
            window.__styleMakerRegistry.set(this.registryKey, registryEntry);
        }

        registryEntry.instanceIds.add(this.instanceId);
        registryEntry.styleEl.setAttribute('data-style-instance',
            [...registryEntry.instanceIds].join(' '));

        return registryEntry;
    }

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

    checkAlive() {
        if (this.destroyed) throw new Error('This styleMaker instance has been destroyed.');
    }

    renderNow() {
        // 若页面中没有对应 class，且没有任何元素被注入，则不渲染
        if (!this.registryEntry.active && !document.querySelector(`.${this.config.prefix}${this.clsName}`)) {
            this.registryEntry.styleEl.textContent = '';
            return;
        }

        const out = [];
        const { variables, keyframes, rules } = this.registryEntry;

        variables.forEach((v, scope) => {
            out.push(`${scope} { ${this.generateCSS(v)} }`);
        });

        keyframes.forEach((frames, name) => {
            const content = Object.entries(frames)
                .map(([pct, props]) => `${pct} { ${this.generateCSS(props)} }`)
                .join('\n');
            out.push(`@keyframes ${name} { ${content} }`);
        });

        const mediaMap = {};
        rules.forEach((value) => {
            const { selector, media, props } = value;
            const css = `${selector} { ${this.generateCSS(props)} }`;
            if (media) (mediaMap[media] ||= []).push(css);
            else out.push(css);
        });

        for (const [mq, arr] of Object.entries(mediaMap)) {
            out.push(`@media ${mq} { ${arr.join('\n')} }`);
        }

        this.registryEntry.styleEl.textContent = out.join('\n');
    }

    scheduleRender() {
        if (this.registryEntry.dirty) return;
        this.registryEntry.dirty = true;
        requestAnimationFrame(() => {
            this.registryEntry.dirty = false;
            this.renderNow();
        });
    }

    generateCSS(props) {
        return Object.entries(props)
            .map(([prop, value]) => {
                const cssProp = prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
                return `${cssProp}: ${value};`;
            })
            .join(' ');
    }

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

    // 公共 API 方法
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

    hover(props) { return this.set(props, ':hover'); }
    active(props) { return this.set(props, ':active'); }
    focus(props) { return this.set(props, ':focus'); }
    visited(props) { return this.set(props, ':visited'); }
    before(props) { return this.set(props, '::before'); }
    after(props) { return this.set(props, '::after'); }
    placeholder(props) { return this.set(props, '::placeholder'); }
    selection(props) { return this.set(props, '::selection'); }

    setVariables(vars, scope = ':root') {
        this.checkAlive();
        this.registryEntry.variables.set(scope, vars);
        this.scheduleRender();
        return this;
    }

    setKeyframes(name, frames) {
        this.checkAlive();
        this.registryEntry.keyframes.set(name, frames);
        this.scheduleRender();
        return this;
    }

    responsive(bp, styles) {
        this.checkAlive();
        const mq = this.config.mediaQueries[bp] || bp;
        Object.entries(styles).forEach(([sel, props]) =>
            this.set(props, sel, mq)
        );
        return this;
    }

    inject(element, additionalClasses = '') {
        this.checkAlive();
        return this.injectClass(element, additionalClasses);
    }

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

    removeInjection(element) {
        this.checkAlive();
        this.removeInjectedClass(element);
        return this;
    }

    clearInjected() {
        this.checkAlive();
        for (const el of this.registryEntry.injectedElements.keys()) this.removeInjectedClass(el);
        this.registryEntry.injectedElements.clear();
        this.registryEntry.active = false;
        this.scheduleRender();
        return this;
    }

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

    // Getter 属性
    get css() { return this.destroyed ? '' : this.registryEntry.styleEl.textContent; }
    get className() { return `${this.config.prefix}${this.clsName}`; }
    get injectedCount() { return this.registryEntry.injectedElements.size; }
    get isDestroyed() { return this.destroyed; }
}

// 使用示例：
// const style = new StyleMaker(config, 'my-style');
// style.set({ color: 'red' }).inject(document.getElementById('element'));