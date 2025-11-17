// 语法块导入
import { createNode } from "../js/nodeCreater.js";
export const addGrammarModal = createNode({
    tag: 'div',
    classes: ['modal-overlay'],
    attrs: { id: 'add-grammar-modal' },
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
                            text: '语法点'
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['modal-body'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['modal-tabs'],
                            children: [
                                {
                                    tag: 'button',
                                    classes: ['modal-tab', 'active'],
                                    attrs: { 'data-tab': 'form' },
                                    text: '当前语法数据'
                                },
                                {
                                    tag: 'button',
                                    classes: ['modal-tab'],
                                    attrs: { 'data-tab': 'json' },
                                    text: '添加语法数据'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['modal-tab-content', 'active'],
                            attrs: {
                                id: 'grammar-form-tab',
                                'data-tab': 'form'
                            },
                            children: [
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label', 'required-field'],
                                            text: '当前语法数据'
                                        },
                                        {
                                            tag: 'textarea',
                                            classes: ['json-input'],
                                            attrs: {
                                                id: 'grammar-rule-now',
                                                placeholder: 'Ge32 english 语法框框'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['modal-tab-content'],
                            attrs: {
                                id: 'grammar-json-tab',
                                'data-tab': 'json'
                            },
                            children: [
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label', 'required-field'],
                                            text: 'JSON数据'
                                        },
                                        {
                                            tag: 'textarea',
                                            classes: ['json-input'],
                                            attrs: {
                                                id: 'grammar-json',
                                                placeholder: '输入JSON数组，例如：[]'
                                            }
                                        },
                                        {
                                            tag: 'div',
                                            classes: ['add-method-buttons'],
                                            children: [
                                                {
                                                    tag: 'button',
                                                    classes: ['btn', 'batch-add-btn'],
                                                    attrs: { id: 'batch-add-grammar-btn' },
                                                    text: '批量添加JSON'
                                                }
                                            ]
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
                                    attrs: { id: 'cancel-grammar-btn' },
                                    text: '取消'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});