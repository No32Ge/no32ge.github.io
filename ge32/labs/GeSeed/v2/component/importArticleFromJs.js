import { createDiv, createInput, createLabel,createButton,createHeading,createSpan } from "../js/nodeCreater.js";



// 创建模态框元素
export const addArticlesFromJs = createDiv("modal-overlay", {
    attrs: { id: 'dynamic-import-modal' },
    children: [
        createDiv("modal-content", {
            attrs: { style: { maxWidth: '600px' } },
            children: [
                // 头部
                createDiv("modal-header", {
                    children: [createHeading(3, "动态导入JS文章库", "modal-title")]
                }),
                // 主体
                createDiv("modal-body", {
                    children: [
                        // URL输入
                        createFormGroup(
                            createLabel("文件URL", "js-file-url", "form-label required-field"),
                            createInput("text", "例如: https://example.com/articles.js", "", "form-input", {
                                attrs: { id: 'js-file-url' }
                            }),
                            createDiv("field-note", { text: '支持本地文件或远程JS文件，文件应导出文章数组' })
                        ),
                        // 预设库
                        createFormGroup(
                            createLabel("预设文章库", "", "form-label"),
                            createPresetLibraries()
                        ),
                        // 导入选项
                        createFormGroup(
                            createLabel("导入选项", "", "form-label"),
                            createCheckbox("dynamic-overwrite", "覆盖重复文章", true),
                            createCheckbox("dynamic-merge", "合并到现有文章", true),
                            createDiv("field-note", { text: '如果勾选覆盖，遇到相同ID的文章将覆盖；合并选项决定是否保留现有文章' })
                        ),
                        // 进度条
                        createDiv("import-progress", {
                            attrs: { style: { display: 'none' } },
                            children: [
                                createDiv("progress", {
                                    attrs: { style: { height: '20px' } },
                                    children: [
                                        createDiv("progress-bar", {
                                            attrs: {
                                                role: 'progressbar',
                                                style: { width: '0%' }
                                            },
                                            text: '0%'
                                        })
                                    ]
                                }),
                                createDiv("progress-text text-center mt-2")
                            ]
                        }),
                        // 结果
                        createDiv("import-result", {
                            attrs: {
                                id: 'dynamic-import-result',
                                style: { display: 'none' }
                            }
                        })
                    ]
                }),
                // 底部
                createDiv("modal-footer", {
                    children: [
                        createButton("取消", null, "btn btn-secondary", {
                            attrs: { id: 'cancel-dynamic-import-btn' }
                        }),
                        createButton("开始导入", null, "btn btn-primary", {
                            attrs: { id: 'confirm-dynamic-import-btn' }
                        })
                    ]
                })
            ]
        })
    ]
});


/**
* 创建表单组
*/
function createFormGroup(...children) {
    return createDiv("form-group", { children });
}



/**
 * 创建预设库列表
 */
function createPresetLibraries() {
    const presets = [
        {
            url: 'https://ge32english.com/ge32/labs/GeSeed/v1/article-repo/basic-articles.js',
            name: 'Wonder (Part1)',
            desc: '包含30篇基础英语学习文章'
        },
        {
            url: 'https://ge32english.com/ge32/labs/GeSeed/v1/article-repo/advanced-articles.js',
            name: '进阶英语文章库 (150篇)',
            desc: '包含150篇进阶英语学习文章'
        },
        {
            url: 'https://ge32english.com/ge32/labs/GeSeed/v1/article-repo/business-articles.js',
            name: '商务英语文章库 (80篇)',
            desc: '包含80篇商务英语文章'
        }
    ];

    return createDiv("preset-libraries", {
        children: presets.map(preset =>
            createDiv("preset-item", {
                children: [
                    createButton(preset.name, null, "btn btn-outline-primary btn-sm preset-btn", {
                        attrs: {
                            type: 'button',
                            'data-url': preset.url
                        }
                    }),
                    createSpan(preset.desc, "preset-description")
                ]
            })
        )
    });
}

/**
 * 创建复选框
 */
function createCheckbox(id, label, checked = false) {
    return createDiv("form-check", {
        children: [
            createInput("checkbox", "", "", "form-check-input", {
                attrs: {
                    id: id,
                    checked: checked
                }
            }),
            createLabel(label, id, "form-check-label")
        ]
    });
}
