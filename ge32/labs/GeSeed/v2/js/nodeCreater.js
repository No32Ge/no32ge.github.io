function test(...arg) {
    console.log("调试:", arg)
}

/**
 * 根据配置对象、字符串、数字或现有节点创建 DOM 元素。
 * 支持递归创建子节点、绑定事件、设置属性与样式。
 *
 * @param {Object|string|number|Node|null|undefined} config - 节点配置或直接内容。
 * @param {string} [config.tag] - 要创建的 HTML 标签名（如 "div"）。
 * @param {string|number} [config.text] - 节点文本内容。
 * @param {string[]} [config.classes] - 要添加的 CSS 类数组。
 * @param {Object} [config.attrs] - 属性对象（键值对），支持 `style` 对象。
 * @param {Object<string, Function>} [config.events] - 事件绑定对象，如 `{ click: fn }`。
 * @param {Array<Object|string|number|Node>} [config.children] - 子节点配置数组。
 * @param {Node} [config.parent] - 可选的父节点，若传入则自动 append。
 * @returns {Node} 创建的节点对象（HTMLElement、TextNode 或 DocumentFragment）。
 *
 * @example
 * // 创建一个带类名和子节点的 div
 * const div = createNode({
 *   tag: 'div',
 *   classes: ['box'],
 *   text: 'Hello world',
 *   attrs: { id: 'main', style: { color: 'red' } },
 *   events: { click: () => console.log('Clicked!') },
 *   children: [
 *     { tag: 'span', text: 'Child node' }
 *   ]
 * });
 *
 * // 直接传入字符串创建文本节点
 * const text = createNode('Hello');
 *
 * // 直接传入现有节点
 * const reused = createNode(document.createElement('p'));
 */

export function createNode(config) {
    // 处理 null 或 undefined
    if (config == null) {
        console.warn('createNode: config is null or undefined');
        return document.createDocumentFragment();
    }

    // 如果已经是节点实例，直接返回
    if (config instanceof Node) {
        if (config.parentNode && config.parentNode !== config.parent) {
            console.warn('createNode: Node already has a parent, it will be moved');
        }
        if (config.parent && config.parent instanceof Node) {
            config.parent.appendChild(config);
        }
        return config;
    }

    // 支持字符串和数字创建文本节点
    if (typeof config === 'string' || typeof config === 'number') {
        const textNode = document.createTextNode(String(config));
        if (config.parent && config.parent instanceof Node) {
            config.parent.appendChild(textNode);
        }
        return textNode;
    }

    // 验证配置对象
    if (typeof config !== 'object') {
        throw new Error('createNode: config must be an object, Node, string, or number');
    }

    const { tag, text, classes = [], attrs = {}, events = {}, children = [], parent } = config;

    // 验证 tag
    if (!tag || typeof tag !== 'string') {
        throw new Error('createNode: tag is required and must be a string');
    }

    let el;
    try {
        el = document.createElement(tag);
    } catch (e) {
        console.error(`createNode: Invalid tag name "${tag}"`, e);
        return document.createDocumentFragment();
    }

    // 文本内容
    if (text != null) el.textContent = text;

    // 类名
    if (Array.isArray(classes)) {
        classes.forEach(cls => {
            if (cls && typeof cls === 'string') el.classList.add(cls);
        });
    }

    // 属性
    if (attrs && typeof attrs === 'object') {
        Object.entries(attrs).forEach(([key, value]) => {
            if (value != null) {
                if (key === 'style' && typeof value === 'object') {
                    Object.assign(el.style, value);
                } else if (typeof value === 'boolean') {
                    if (value) el.setAttribute(key, '');
                    else el.removeAttribute(key);
                } else {
                    el.setAttribute(key, String(value));
                }
            }
        });
    }

    // 事件
    if (events && typeof events === 'object') {
        Object.entries(events).forEach(([eventName, handler]) => {
            if (typeof handler === 'function') {
                el.addEventListener(eventName, handler);
            }
        });
    }

    // 子节点递归
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (child != null) {
                const childNode = createNode(child);
                if (childNode && childNode !== el) {
                    el.appendChild(childNode);
                }
            }
        });
    }

    // 插入父节点
    if (parent && parent instanceof Node) {
        parent.appendChild(el);
    }

    return el;
}

/**
 * 快捷创建 div 元素
 * @param {string|Array} classes - 类名，可以是字符串或数组
 * @param {Object} config - 其他配置选项
 * @returns {HTMLElement}
 */
export function createDiv(classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    return createNode({
        tag: 'div',
        classes: normalizedClasses,
        ...config
    });
}

/**
 * 快捷创建 span 元素
 * @param {string} text - 文本内容
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createSpan(text = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    return createNode({
        tag: 'span',
        text,
        classes: normalizedClasses,
        ...config
    });
}

/**
 * 快捷创建按钮
 * @param {string} text - 按钮文本
 * @param {Function} onClick - 点击事件处理函数
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createButton(text = '', onClick = null, classes = 'btn', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    const events = onClick ? { click: onClick } : {};

    return createNode({
        tag: 'button',
        text,
        classes: normalizedClasses,
        events,
        ...config
    });
}

/**
 * 快捷创建输入框
 * @param {string} type - 输入框类型 (text, email, password等)
 * @param {string} placeholder - 占位符文本
 * @param {string} value - 初始值
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
// 修复 createInput 函数中的问题
export function createInput(type = 'text', placeholder = '', value = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    // 正确处理配置合并
    const { attrs: configAttrs = {}, ...restConfig } = config;

    return createNode({
        tag: 'input',
        classes: normalizedClasses,
        attrs: {
            type,
            placeholder,
            value,
            ...configAttrs
        },
        ...restConfig
    });
}
/**
 * 快捷创建标签元素
 * @param {string} text - 标签文本
 * @param {string} htmlFor - 关联的表单元素ID
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createLabel(text = '', htmlFor = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes)
        ? classes
        : (typeof classes === 'string' && classes ? classes.split(' ') : []);

    const { attrs = {}, ...restConfig } = config;

    return createNode({
        tag: 'label',
        text: text,
        classes: normalizedClasses,
        attrs: {
            for: htmlFor,
            ...attrs
        },
        ...restConfig
    });
}


/**
 * 快捷创建图片元素
 * @param {string} src - 图片URL
 * @param {string} alt - 替代文本
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createImg(src = '', alt = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    return createNode({
        tag: 'img',
        classes: normalizedClasses,
        attrs: {
            src,
            alt,
            ...config.attrs
        },
        ...config
    });
}

/**
 * 快捷创建链接元素
 * @param {string} href - 链接URL
 * @param {string} text - 链接文本
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createLink(href = '#', text = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    return createNode({
        tag: 'a',
        text,
        classes: normalizedClasses,
        attrs: {
            href,
            ...config.attrs
        },
        ...config
    });
}

/**
 * 快捷创建列表项
 * @param {string} text - 列表项文本
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createListItem(text = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    return createNode({
        tag: 'li',
        text,
        classes: normalizedClasses,
        ...config
    });
}

/**
 * 快捷创建标题元素
 * @param {number} level - 标题级别 (1-6)
 * @param {string} text - 标题文本
 * @param {string|Array} classes - 类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createHeading(level = 1, text = '', classes = '', config = {}) {
    const normalizedClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    if (level < 1 || level > 6) {
        console.warn('createHeading: Heading level must be between 1 and 6, defaulting to 1');
        level = 1;
    }

    return createNode({
        tag: `h${level}`,
        text,
        classes: normalizedClasses,
        ...config
    });
}

/**
 * 快捷创建图标元素 (使用Font Awesome或其他图标库)
 * @param {string} iconName - 图标名称
 * @param {string} prefix - 图标前缀 (默认为 'fas' Font Awesome Solid)
 * @param {string|Array} classes - 额外类名
 * @param {Object} config - 其他配置
 * @returns {HTMLElement}
 */
export function createIcon(iconName, prefix = '', classes = '', config = {}) {
    const baseClasses = Array.isArray(classes) ? classes :
        (typeof classes === 'string' && classes ? classes.split(' ') : []);

    const iconClasses = [`${prefix}`, `${iconName}`].concat(baseClasses);

    return createNode({
        tag: 'i',
        classes: iconClasses,
        ...config
    });
}

// 保留原有的工具函数
export function createText(text, className = '') {
    return createNode({
        tag: 'span',
        text: text,
        classes: className ? [className] : []
    });
}

// 使用方法演示
function example() {
    // 快速创建带类名的div
    const container = createDiv('container fluid', {
        attrs: { id: 'main-container' }
    });

    // 快速创建按钮
    const submitBtn = createButton('提交', handleSubmit, 'btn btn-primary', {
        attrs: { type: 'submit', disabled: false }
    });

    // 快速创建输入框
    const emailInput = createInput('email', '请输入邮箱', '', 'form-control', {
        attrs: { required: true }
    });

    // 快速创建标签
    const emailLabel = createLabel('邮箱', 'email-input', 'form-label');

    // 快速创建图片
    const avatar = createImg('/avatar.jpg', '用户头像', 'avatar rounded');

    // 快速创建链接
    const homeLink = createLink('/', '首页', 'nav-link');

    // 快速创建标题
    const title = createHeading(1, '页面标题', 'page-title');

    // 快速创建图标
    const userIcon = createIcon('user', 'fas', 'mr-2');
    const searchIcon = createIcon('search', 'fas');

    // 组合使用
    const card = createDiv('card', {
        children: [
            createDiv('card-header', {
                children: [createHeading(3, '卡片标题')]
            }),
            createDiv('card-body', {
                children: [
                    createDiv('form-group', {
                        children: [
                            createLabel('用户名', 'username', 'form-label'),
                            createInput('text', '请输入用户名', '', 'form-control', {
                                attrs: { id: 'username' }
                            })
                        ]
                    }),
                    createButton('保存', handleSave, 'btn btn-success')
                ]
            })
        ]
    });
}

// // 测试用例 1: 基础功能
// createNode({
//     tag: 'div',
//     attrs: {
//         id: 'test-card-1',
//         'data-test': 'basic-function'
//     },
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 1: 基础功能',
//             classes: ['title']
//         },
//         {
//             tag: 'p',
//             text: '这个测试卡片包含类名、属性和事件',
//             classes: ['content']
//         },
//         {
//             tag: 'button',
//             text: '点击测试事件',
//             classes: ['test-btn'],
//             events: {
//                 click: () => alert('基础事件测试成功!'),
//                 mouseover: (e) => e.target.style.backgroundColor = '#eee',
//                 mouseout: (e) => e.target.style.backgroundColor = ''
//             }
//         }
//     ]
// });

// // 测试用例 2: 混合节点实例
// const existingDiv = document.createElement('div');
// existingDiv.textContent = '这是已有的DOM元素';
// existingDiv.style.border = '1px dashed #999';
// existingDiv.style.padding = '10px';
// existingDiv.style.margin = '10px 0';

// createNode({
//     tag: 'div',
//     classes: ['mixed-container'],
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 2: 混合节点实例'
//         },
//         {
//             tag: 'p',
//             text: '这个容器混合了配置对象和已有的DOM元素'
//         },
//         existingDiv, // 直接传入节点实例
//         {
//             tag: 'span',
//             text: '结尾的文本节点'
//         }
//     ]
// });

// // 测试用例 3: 工具函数使用
// createNode({
//     tag: 'div',
//     classes: ['toolbar-test'],
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 3: 工具函数'
//         },
//         createText('工具栏测试: ', 'label'),
//         createButton('新建', () => console.log('新建操作')),
//         createButton('保存', () => console.log('保存操作')),
//         createButton('删除', () => console.log('删除操作'), 'danger-btn')
//     ]
// });

// // 测试用例 4: 复杂嵌套结构
// createNode({
//     tag: 'div',
//     classes: ['complex-structure'],
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 4: 复杂嵌套'
//         },
//         {
//             tag: 'div',
//             classes: ['nested-level-1'],
//             children: [
//                 {
//                     tag: 'p',
//                     text: '第一层嵌套',
//                     children: [
//                         {
//                             tag: 'strong',
//                             text: '加粗文本',
//                             children: [
//                                 {
//                                     tag: 'em',
//                                     text: '斜体文本'
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     tag: 'ul',
//                     children: [
//                         { tag: 'li', text: '列表项 1' },
//                         { tag: 'li', text: '列表项 2' },
//                         {
//                             tag: 'li',
//                             text: '列表项 3',
//                             children: [
//                                 { tag: 'span', text: '子内容' }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// });

// // 测试用例 5: 边界情况测试
// createNode({
//     tag: 'div',
//     classes: ['edge-cases'],
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 5: 边界情况'
//         },
//         {
//             tag: 'input',
//             attrs: {
//                 type: 'checkbox',
//                 checked: true,
//                 disabled: false,
//                 placeholder: '测试输入框'
//             }
//         },
//         {
//             tag: 'div',
//             attrs: {
//                 style: 'color: blue; font-weight: bold;'
//             },
//             text: '样式属性测试'
//         },
//         "纯文本节点", // 字符串直接作为子节点
//         123, // 数字作为子节点
//         null, // null 会被忽略
//         undefined // undefined 会被忽略
//     ]
// });

// // 测试用例 6: 动态生成内容
// const dynamicContainer = createNode({
//     tag: 'div',
//     classes: ['dynamic-test'],
//     parent: document.body,
//     children: [
//         {
//             tag: 'h3',
//             text: '测试用例 6: 动态内容'
//         },
//         {
//             tag: 'button',
//             text: '点击生成新元素',
//             events: {
//                 click: function () {
//                     createNode({
//                         tag: 'div',
//                         text: '动态生成于: ' + new Date().toLocaleTimeString(),
//                         classes: ['dynamic-item'],
//                         attrs: {
//                             style: 'background: #f0f0f0; margin: 5px; padding: 5px;'
//                         },
//                         parent: this.parentNode
//                     });
//                 }
//             }
//         }
//     ]
// });

// console.log('所有测试用例已加载完成');