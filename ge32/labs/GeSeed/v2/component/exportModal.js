import { createDiv, createLabel, createButton, createHeading, createInput, createNode } from "../js/nodeCreater.js";

/**
* 创建表单组
*/
function createFormGroup({ id = null, children = [] } = {}) {
    return createDiv("form-group", {
        children,
        ...(id ? { attrs: { id } } : {})
    });
}



/**
* 创建文章选择区域
*/
function createArticleSelectionArea() {
    return createDiv("form-group", {
        attrs: {
            id: 'article-selection-area',
            style: { display: 'none' }
        },
        children: [
            createLabel("选择要导出的文章", "", "form-label"),
            createDiv("", {
                attrs: {
                    style: {
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        padding: '10px'
                    }
                },
                children: [
                    // 全选复选框
                    createDiv("form-check mb-2", {
                        children: [
                            createInput("checkbox", "", "", "form-check-input", {
                                attrs: { id: 'select-all-articles' }
                            }),
                            createLabel("全选", "select-all-articles", "form-check-label", {
                                children: [createNode({ tag: 'strong', text: '全选' })]
                            })
                        ]
                    }),
                    // 文章复选框容器
                    createDiv("", { attrs: { id: 'article-checkboxes' } })
                ]
            })
        ]
    });
}

/**
 * 创建单选按钮组
 */
function createRadioGroup(name, options) {
    return createDiv("", {  // 空类名，或者可以给一个类名如 "radio-group"
        children: options.map(option =>
            createDiv("form-check", {
                children: [
                    createInput("radio", "", "", "form-check-input", {
                        attrs: {
                            name: name,
                            id: option.id,
                            value: option.value,
                            checked: option.checked || false
                        }
                    }),
                    createLabel(option.label, option.id, "form-check-label")
                ]
            })
        )
    });
}
// 创建导出模态框
export const exportModalElement = createDiv("modal-overlay", {
    attrs: { id: 'export-articles-modal' },
    children: [
        createDiv("modal-content", {
            children: [
                // 头部
                createDiv("modal-header", {
                    children: [createHeading(3, "导出文章", "modal-title")]
                }),
                // 主体
                createDiv("modal-body", {
                    children: [
                        // 导出方式选择
                        createFormGroup({
                            children: [
                                createLabel("选择导出方式", "", "form-label"),
                                createRadioGroup("export-type", [
                                    { id: "export-current", value: "current", label: "导出当前文章", checked: true },
                                    { id: "export-selected", value: "selected", label: "选择文章导出" }
                                ])
                            ]
                        }),
                        // 文章选择区域
                        createArticleSelectionArea(),
                        // 导出格式
                        createFormGroup({
                            children: [
                                createLabel("导出格式", "", "form-label"),
                                createRadioGroup("export-format", [
                                    { id: "export-single", value: "single", label: "导出为单个JSON文件（包含所有选中文章）", checked: true },
                                    { id: "export-multiple", value: "multiple", label: "导出为多个JSON文件（每个文章一个文件）" }
                                ])
                            ]
                        }),

                        // 文件名输入
                        createFormGroup({
                            id:"export-filename-group",
                            children: [
                                createLabel("导出文件名", "", "form-label"),
                                createInput("text", "例如: english_articles", "english_articles", "form-input", {
                                    attrs: { id: 'export-filename' }
                                }),
                                createDiv("field-note", {
                                    text: '对于多文件导出，将在文件名后添加文章标题'
                                })
                            ]
                        })
                    ]
                }),
                // 底部
                createDiv("modal-footer", {
                    children: [
                        createButton("取消", null, "btn btn-secondary", {
                            attrs: { id: 'cancel-export-btn' }
                        }),
                        createButton("导出", null, "btn btn-primary", {
                            attrs: { id: 'confirm-export-btn' }
                        })
                    ]
                })
            ]
        })
    ]
});