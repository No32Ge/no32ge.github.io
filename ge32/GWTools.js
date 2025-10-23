/**
 * Ge32 通用工具库
 * 支持：主要用于把网页内容，转化为对微信公众号的兼容：复制内容、提示信息
 * @author Ge32
 */
const GWTools = {
    /**
     * 复制指定 id 元素的内容到剪贴板
     * @param {string} id - 元素 id
     * @param {string} [errMessage=""] - 错误标志（非空则不复制）
     * @param {Object} [options={}]
     * @param {boolean} [options.asText=false] - 是否复制纯文本（默认复制 HTML）
     */
    copyToClipboard(id, errMessage = "", options = {}) {
        const { asText = false } = options;
        const target = document.getElementById(id);
        if (!target) {
            this.showMessage(`找不到 id="${id}" 的元素`);
            return;
        }

        if (!target.innerHTML.trim()) {
            this.showMessage("请先生成内容");
            return;
        }

        if (errMessage && errMessage.trim() !== "") {
            this.showMessage("复制失败：格式有误");
            return;
        }

        const tempElement = document.createElement("div");
        tempElement.style.position = "absolute";
        tempElement.style.left = "-9999px";
        tempElement.style.whiteSpace = "pre-wrap";
        tempElement.innerHTML = target.innerHTML.replace(/\s+/g, " ").trim();
        document.body.appendChild(tempElement);

        const range = document.createRange();
        range.selectNodeContents(tempElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            if (asText && navigator.clipboard) {
                navigator.clipboard.writeText(tempElement.innerText);
            } else {
                document.execCommand("copy");
            }
            this.showMessage("复制成功！");
        } catch (err) {
            this.showMessage("复制失败：" + err);
        }

        document.body.removeChild(tempElement);
    },

    /**
     * 显示提示信息
     * @param {string} message - 提示内容
     */
    showMessage(message) {
        const msgDiv = document.createElement("div");
        msgDiv.textContent = "Ge32 提示：" + message;
        Object.assign(msgDiv.style, {
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(3, 63, 173, 0.8)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "15px",
            zIndex: 10000,
            fontSize: "14px",
            fontFamily: "sans-serif",
            transition: "opacity 0.3s"
        });
        document.body.appendChild(msgDiv);
        setTimeout(() => {
            msgDiv.style.opacity = "0";
            setTimeout(() => msgDiv.remove(), 300);
        }, 1200);
    },

    /**
     * 标签替换功能：将指定元素的标签从一种替换为另一种
     * @param {string} id - 要替换标签的元素的id
     * @param {string} sourceTag - 原始标签名（如 'div'）
     * @param {string} targetTag - 目标标签名（如 'section'）
     */
    replaceElementTag(id, sourceTag, targetTag) {
        const element = document.getElementById(id);
        if (!element) {
            this.showMessage(`找不到 id="${id}" 的元素`);
            return false;
        }

        // 检查当前元素的标签是否匹配源标签
        if (element.tagName.toLowerCase() !== sourceTag.toLowerCase()) {
            this.showMessage(`元素标签不是 "${sourceTag}"，当前标签为 "${element.tagName.toLowerCase()}"`);
            return false;
        }

        try {
            // 创建新标签元素
            const newElement = document.createElement(targetTag);
            
            // 复制所有属性
            for (let attr of element.attributes) {
                newElement.setAttribute(attr.name, attr.value);
            }
            
            // 复制所有子元素和内容
            newElement.innerHTML = element.innerHTML;
            
            // 用新元素替换旧元素
            element.parentNode.replaceChild(newElement, element);
            
            this.showMessage(`成功将 ${sourceTag} 标签替换为 ${targetTag} 标签`);
            return true;
        } catch (error) {
            this.showMessage(`标签替换失败：${error.message}`);
            return false;
        }
    },

    /**
     * 便捷方法：将div标签转换为section标签（针对公众号优化）
     * @param {string} id - 要转换的元素的id
     */
    divToSection(id) {
        return this.replaceElementTag(id, 'div', 'section');
    },

    /**
     * 便捷方法：将section标签转换回div标签
     * @param {string} id - 要转换的元素的id
     */
    sectionToDiv(id) {
        return this.replaceElementTag(id, 'section', 'div');
    }
};
