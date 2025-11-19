


/**
 * 初始化浮动菜单。
 *
 * @param {HTMLElement} floatingMenu - 菜单本体元素。
 * @param {HTMLElement[]} [nodes=[]] - 点击不会关闭菜单的白名单节点。
 */
export function initMenu(floatingMenu, nodes = [], initCallBack = () => { }) {

    // 确保参数有效
    if (!(floatingMenu instanceof HTMLElement)) {
        throw new Error("floatingMenu 必须是一个 DOM 元素");
    }

    if (!Array.isArray(nodes)) nodes = [];

    // 把菜单本体加入白名单
    if (!nodes.includes(floatingMenu)) {
        nodes.push(floatingMenu);
    }

    // 放进 body
    document.body.appendChild(floatingMenu);

    initCallBack();



    // 注册关闭逻辑
    closeMenuExcept(floatingMenu, nodes);
    return floatingMenu;
}


function showFloatingMenu(floatingMenu) {
    console.log("打开菜单");
    floatingMenu.classList.add('show');
}
/**
 * 隐藏菜单（基于传入的菜单元素）
 */
function hideFloatingMenu(floatingMenu) {
    console.log("关闭菜单");
    floatingMenu.classList.remove('show');
}

/**
 * 点击白名单外区域关闭菜单
 *
 * @param {HTMLElement} floatingMenu - 菜单本体
 * @param {HTMLElement[]} nodes - 白名单元素
 */
function closeMenuExcept(floatingMenu, nodes) {
    document.addEventListener('click', (e) => {

        // 判断是否点击在任何白名单元素内部
        const clickedInside = nodes.some(node => node.contains(e.target));

        if (!clickedInside) {
            hideFloatingMenu(floatingMenu);
        }
    });
}