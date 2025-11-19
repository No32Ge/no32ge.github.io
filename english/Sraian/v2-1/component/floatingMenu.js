// 悬浮球功能
import { createNode } from "../js/nodeCreater.js";
import { getScrollPercent } from "./progress.js";
import { initMenu } from "./common/menu.js";

const floatingMenu = createNode({
    tag: 'div',
    classes: ['floating-menu'],
    attrs: { id: 'floating-menu' },
    children: [
        {
            tag: 'div',
            classes: ['menu-header'],
            children: [
                {
                    tag: 'span',
                    text: '学习控制'
                },
                {
                    tag: 'button',
                    classes: ['btn-close'],
                    attrs: {
                        type: 'button',
                        id: 'close-menu'
                    }
                }
            ]
        },
        createNode(
        {   
            tag:"div",
            classes:["menu-content"],
            children: [
                {
                    tag: 'div',
                    classes: ['menu-section'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['menu-section-title'],
                            text: '文章管理'
                        },
                        {
                            tag: 'button',
                            classes: ['menu-item'],
                            attrs: { id: 'article-catalog-btn' },
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['bi', 'bi-list-ul']
                                },
                                ' 文章目录'
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['menu-section'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['menu-section-title'],
                            text: '阅读进度'
                        },
                        {
                            tag: 'div',
                            classes: ['progress-display'],
                            attrs: { id: 'progress-display' },
                            text: '0%'
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['menu-section'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['menu-section-title'],
                            text: '数据管理'
                        },
                        {
                            tag: 'button',
                            classes: ['menu-item'],
                            attrs: { id: 'import-articles-btn' },
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['bi', 'bi-download']
                                },
                                ' 导入文章'
                            ]
                        },
                        {
                            tag: 'button',
                            classes: ['menu-item'],
                            attrs: { id: 'export-articles-btn' },
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['bi', 'bi-upload']
                                },
                                ' 导出文章'
                            ]
                        },
                        {
                            tag: 'button',
                            classes: ['menu-item'],
                            attrs: { id: 'dynamic-import-btn' },
                            children: [
                                {
                                    tag: 'i',
                                    classes: ['bi', 'bi-box-arrow-in-down']
                                },
                                ' 快速加载文章'
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    classes: ['menu-section'],
                    children: [
                        {
                            tag: 'div',
                            classes: ['menu-section-title'],
                            text: '全局设置'
                        },
                        {
                            tag: 'div',
                            classes: ['setting-item'],
                            children: [
                                {
                                    tag: 'span',
                                    classes: ['setting-label'],
                                    text: '显示解析'
                                },
                                {
                                    tag: 'div',
                                    classes: ['form-check', 'form-switch'],
                                    children: [
                                        {
                                            tag: 'input',
                                            classes: ['form-check-input'],
                                            attrs: {
                                                type: 'checkbox',
                                                id: 'toggle-explanations'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })

    ]
});





/**
 * 用于快速测试
 * @param {[Element...]} nodes 
 */

export function initMenuDev(nodes) {
    return initMenu(floatingMenu, nodes, () => {
        // RAF 节流标记
        let ticking = false;
        // 滚动更新进度 UI
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;

                requestAnimationFrame(() => {
                    const percent = Math.round(getScrollPercent());

                    document.getElementById("progress-display").innerText =
                        percent + "%";

                    document.title = `Sraian(${percent})%`;

                    ticking = false;
                });
            }
        });
    })
}




