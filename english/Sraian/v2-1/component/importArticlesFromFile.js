// 文章导入部分
import { createNode } from "../js/nodeCreater.js";
export const importArticlesModal = createNode({
    tag: 'div',
    classes: ['modal-overlay'],
    attrs: { id: 'import-articles-modal' },
    children: [
        {
            tag: 'div',
            classes: ['modal-content'],
            children: [
                {
                    tag: 'div',
                    classes: ['modal-header'],
                    children: [
                        {
                            tag: 'h3',
                            classes: ['modal-title'],
                            text: '导入文章'
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['modal-body'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['form-group'],
                            children: [
                                {
                                    tag: 'label',
                                    classes: ['form-label', 'required-field'],
                                    text: '选择JSON文件'
                                },
                                {
                                    tag: 'input',
                                    classes: ['form-input'],
                                    attrs: {
                                        type: 'file',
                                        id: 'import-file',
                                        accept: '.json',
                                        style: { padding: '6px' }
                                    }
                                },
                                {
                                    tag: 'div',
                                    classes: ['field-note'],
                                    text: '支持单个文章JSON文件或包含文章数组的JSON文件'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['json-example'],
                            children: [
                                {
                                    tag: 'div',
                                    classes: ['json-example-title'],
                                    text: '支持的格式示例：'
                                },
                                {
                                    tag: 'div',
                                    children: [
                                        {
                                            tag: 'strong',
                                            text: '单个文章：'
                                        }
                                    ]
                                },
                                {
                                    tag: 'pre',
                                    attrs: {
                                        style: {
                                            fontSize: '0.7rem',
                                            margin: '5px 0'
                                        }
                                    },
                                    text: `{
  "id": "article1",
  "title": "文章标题",
  "info": { ... },
  "paras": [ ... ]
}`
                                },
                                {
                                    tag: 'div',
                                    children: [
                                        {
                                            tag: 'strong',
                                            text: '文章数组：'
                                        }
                                    ]
                                },
                                {
                                    tag: 'pre',
                                    attrs: {
                                        style: {
                                            fontSize: '0.7rem',
                                            margin: '5px 0'
                                        }
                                    },
                                    text: `[
  { "id": "article1", "title": "文章1", ... },
  { "id": "article2", "title": "文章2", ... }
]`
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['form-group'],
                            children: [
                                {
                                    tag: 'div',
                                    classes: ['form-check'],
                                    children: [
                                        {
                                            tag: 'input',
                                            classes: ['form-check-input'],
                                            attrs: {
                                                type: 'checkbox',
                                                id: 'import-overwrite'
                                            }
                                        },
                                        {
                                            tag: 'label',
                                            classes: ['form-check-label'],
                                            text: '覆盖重复文章'
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['field-note'],
                                    text: '如果勾选，遇到相同ID的文章将覆盖；如果不勾选，将跳过重复文章'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['modal-footer'],
                    children: [
                        {
                            tag: 'button',
                            classes: ['btn', 'btn-secondary'],
                            attrs: { id: 'cancel-import-btn' },
                            text: '取消'
                        },
                        {
                            tag: 'button',
                            classes: ['btn', 'btn-primary'],
                            attrs: { id: 'confirm-import-btn' },
                            text: '导入'
                        }
                    ]
                }
            ]
        }
    ]
});
