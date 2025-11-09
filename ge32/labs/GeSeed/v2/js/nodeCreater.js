// 升级版核心函数：生成节点
export function createNode(config) {
    // 如果已经是节点实例，直接返回
    if (config instanceof Node) {
        if (config.parent) {
            config.parent.appendChild(config);
        }
        return config;
    }

    const { tag, text, classes = [], attrs = {}, events = {}, children = [], parent } = config;

    const el = document.createElement(tag);

    // 文本内容
    if (text) el.textContent = text;

    // 类名
    classes.forEach(cls => el.classList.add(cls));

    // 属性
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));

    // 事件
    Object.entries(events).forEach(([evt, fn]) => el.addEventListener(evt, fn));

    // 子节点递归 - 现在支持节点实例和配置对象
    children.forEach(child => {
        const childNode = createNode(child);
        el.appendChild(childNode);
    });

    // 插入父节点
    if (parent) parent.appendChild(el);

    return el;
}

// 示例用法 1：传统方式（保持不变）
createNode({
    tag: 'div',
    classes: ['card'],
    attrs: { id: 'card1' },
    parent: document.body,
    children: [
        {
            tag: 'h3',
            text: '标题',
            classes: ['card-title']
        },
        {
            tag: 'p',
            text: '这是内容',
            classes: ['card-content']
        },
        {
            tag: 'button',
            text: '点击我',
            classes: ['btn'],
            events: { click: () => alert('按钮被点击！') }
        }
    ]
});

// 示例用法 2：混合方式 - 直接传入节点实例
const existingButton = document.createElement('button');
existingButton.textContent = '已有的按钮';
existingButton.classList.add('existing-btn');

createNode({
    tag: 'div',
    classes: ['container'],
    parent: document.body,
    children: [
        // 配置对象
        {
            tag: 'h1',
            text: '混合示例'
        },
        // 直接传入节点实例
        existingButton,
        // 继续使用配置对象
        {
            tag: 'span',
            text: '结尾文本'
        }
    ]
});

// 示例用法 3：创建工具函数来生成常用元素
function createText(text, className = '') {
    return createNode({
        tag: 'span',
        text: text,
        classes: className ? [className] : []
    });
}

function createButton(text, onClick, className = 'btn') {
    return createNode({
        tag: 'button',
        text: text,
        classes: [className],
        events: { click: onClick }
    });
}

// 使用工具函数
createNode({
    tag: 'div',
    classes: ['toolbar'],
    parent: document.body,
    children: [
        createText('工具栏：', 'toolbar-label'),
        createButton('新建', () => console.log('新建')),
        createButton('保存', () => console.log('保存')),
        createButton('删除', () => console.log('删除'), 'btn-danger')
    ]
});