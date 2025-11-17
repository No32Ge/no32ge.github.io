import { createNode } from "../js/nodeCreater.js";
export const addVocabModal = createNode({
    tag: 'div',
    classes: ['modal-overlay'],
    attrs: { id: 'add-vocab-modal' },
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
                            text: '添加新单词'
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
                                    text: '表单填写'
                                },
                                {
                                    tag: 'button',
                                    classes: ['modal-tab'],
                                    attrs: { 'data-tab': 'json' },
                                    text: 'JSON批量添加'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['modal-tab-content', 'active'],
                            attrs: {
                                id: 'vocab-form-tab',
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
                                            text: '单词/短语'
                                        },
                                        {
                                            tag: 'input',
                                            classes: ['form-input'],
                                            attrs: {
                                                type: 'text',
                                                id: 'vocab-word',
                                                placeholder: '输入单词或短语'
                                            }
                                        },
                                        {
                                            tag: 'div',
                                            classes: ['field-note'],
                                            text: '这是必填字段'
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label'],
                                            text: '词性'
                                        },
                                        {
                                            tag: 'select',
                                            classes: ['form-input'],
                                            attrs: { id: 'vocab-pos' },
                                            children: [
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'n' },
                                                    text: '名词 (noun)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'v' },
                                                    text: '动词 (verb)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'adj' },
                                                    text: '形容词 (adjective)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'adv' },
                                                    text: '副词 (adverb)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'prep' },
                                                    text: '介词 (preposition)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'conj' },
                                                    text: '连词 (conjunction)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'pron' },
                                                    text: '代词 (pronoun)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'det' },
                                                    text: '限定词 (determiner)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'int' },
                                                    text: '感叹词 (interjection)'
                                                },
                                                {
                                                    tag: 'option',
                                                    attrs: { value: 'phr' },
                                                    text: '短语 (phrase)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label'],
                                            text: '发音'
                                        },
                                        {
                                            tag: 'input',
                                            classes: ['form-input'],
                                            attrs: {
                                                type: 'text',
                                                id: 'vocab-pronunciation',
                                                placeholder: '例如: /ˈfeɪljər/'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label'],
                                            text: '含义'
                                        },
                                        {
                                            tag: 'input',
                                            classes: ['form-input'],
                                            attrs: {
                                                type: 'text',
                                                id: 'vocab-meaning',
                                                placeholder: '输入中文含义'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['form-group'],
                                    children: [
                                        {
                                            tag: 'label',
                                            classes: ['form-label'],
                                            text: '例句'
                                        },
                                        {
                                            tag: 'input',
                                            classes: ['form-input'],
                                            attrs: {
                                                type: 'text',
                                                id: 'vocab-example',
                                                placeholder: '输入例句'
                                            }
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['add-method-buttons'],
                                    children: [
                                        {
                                            tag: 'button',
                                            classes: ['btn', 'btn-primary'],
                                            attrs: { id: 'save-vocab-btn' },
                                            text: '保存单个'
                                        },
                                        {
                                            tag: 'button',
                                            classes: ['btn', 'quick-add-btn'],
                                            attrs: { id: 'quick-add-vocab-btn' },
                                            text: '快速添加单个'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            classes: ['modal-tab-content'],
                            attrs: {
                                id: 'vocab-json-tab',
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
                                                id: 'vocab-json',
                                                placeholder: '输入JSON数组，例如：\n[\n  {\n    "word": "example",\n    "pos": "n",\n    "ph": "/ɪɡˈzæmpl/",\n    "mean": "例子",\n    "ex": "This is an example sentence."\n  },\n  {\n    "word": "test",\n    "pos": "v",\n    "ph": "/test/",\n    "mean": "测试",\n    "ex": "This is a test."\n  }\n]'
                                            }
                                        },
                                        {
                                            tag: 'div',
                                            classes: ['field-note'],
                                            text: '支持JSON数组格式，每个对象包含 word, pos, ph, mean, ex 字段'
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
                                            text: '快速添加格式（用逗号分隔单词）：'
                                        },
                                        {
                                            tag: 'div',
                                            text: 'success, opportunity, challenge, development'
                                        },
                                        {
                                            tag: 'div',
                                            classes: ['field-note'],
                                            attrs: { style: { marginTop: '8px' } },
                                            text: '输入用逗号分隔的单词列表，将自动创建为简单单词项'
                                        }
                                    ]
                                },
                                {
                                    tag: 'div',
                                    classes: ['add-method-buttons'],
                                    children: [
                                        {
                                            tag: 'button',
                                            classes: ['btn', 'batch-add-btn'],
                                            attrs: { id: 'batch-add-vocab-btn' },
                                            text: '批量添加JSON'
                                        },
                                        {
                                            tag: 'button',
                                            classes: ['btn', 'quick-add-btn'],
                                            attrs: { id: 'quick-batch-vocab-btn' },
                                            text: '快速批量添加'
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
                            attrs: { id: 'cancel-vocab-btn' },
                            text: '取消'
                        }
                    ]
                }
            ]
        }
    ]
});