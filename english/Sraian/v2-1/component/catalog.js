import { createDiv,createHeading,createButton,createIcon,createNode,createInput } from "../js/nodeCreater.js";
// 创建文章目录
export const catalogElement = createDiv("article-catalog", {
    attrs: { id: 'article-catalog' },
    children: [
        // 头部
        createDiv("catalog-header", {
            children: [
                createHeading(3, "文章目录", "catalog-title"),
                createButton("", null, "catalog-close", {
                    attrs: { id: 'catalog-close' },
                    children: [createIcon("bi")]
                })
            ]
        }),
        // 搜索区域
        createDiv("catalog-search", {
            children: [
                createInput("text", "搜索文章标题、标签、作者...(Ctrl+K)", "", "search-input", {
                    attrs: { id: 'catalog-search' }
                })
            ]
        }),
        // 统计信息
        createDiv("catalog-stats", {
            attrs: { id: 'catalog-stats' },
            text: '共加载 0 篇文章'
        }),
        // 文章列表
        createDiv("catalog-list", {
            attrs: { id: 'catalog-list' }
        }),
        // 底部
        createDiv("catalog-footer", {
            children: [
                createButton(" 刷新目录", null, "btn btn-sm btn-outline-secondary", {
                    attrs: { id: 'refresh-catalog' },
                    children: [createIcon("bi-arrow-clockwise", "bi")]
                })
            ]
        })
    ]
});

// 创建文章目录按键 
export const catalogButton = createNode({
    tag: 'button', attrs: {
        id: 'catalog-toggle'
    },
    classes: ["catalog-toggle-btn"],
    children: [{
        tag: 'i',
        classes: ["bi", "bi-list"]
    },
        " 文章目录"
    ]
})

export function buildCatalog(){
    document.body.appendChild(catalogButton);
    document.body.appendChild(catalogElement);
    console.log("丢出自定义事件：");
    document.dispatchEvent(new CustomEvent('initcatalog', { detail: {id:"article-catalog"}}));
    document.dispatchEvent(new CustomEvent('dosomething', { detail: "基本功能加载完成" }));

}

