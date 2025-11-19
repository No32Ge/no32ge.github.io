import numberData from './num.json' with { type: 'json' };

/**
 * 获取数字的对应翻译 / Get number translation in specified language
 * @param {number} id - 数字ID / Number ID
 * @param {string} language - 语言代码 / Language code
 * @returns {string|null} 对应语言的数字翻译，如果未找到则返回null / Number translation in specified language, returns null if not found
 */
function getNumberTranslation(id, language) {
    // 验证语言参数是否有效 / Validate language parameter
    const validLanguages = numberData.meta.languages;
    if (!validLanguages.includes(language.toLowerCase())) {
        console.warn(`不支持的语言: ${language}。支持的语言: ${validLanguages.join(', ')} / Unsupported language: ${language}. Supported languages: ${validLanguages.join(', ')}`);
        return null;
    }

    // 查找对应 ID 的条目 / Find entry by ID
    const entry = numberData.entries.find(item => item.id === id);

    if (!entry) {
        console.warn(`未找到 ID 为 ${id} 的数字条目 / No number entry found for ID: ${id}`);
        return null;
    }

    // 返回对应语言的翻译 / Return translation in specified language
    return entry[language.toLowerCase()] || null;
}

/**
 * 创建数字翻译数组 / Create number translation array
 * @param {number} start - 起始数字 / Start number
 * @param {number} end - 结束数字 / End number
 * @param {string} language - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
function createNumRange(start, end, language) {
    // 参数验证 / Parameter validation
    if (typeof start !== 'number' || typeof end !== 'number') {
        throw new Error('start 和 end 必须是数字 / start and end must be numbers');
    }
    
    if (typeof language !== 'string') {
        throw new Error('language 必须是字符串 / language must be a string');
    }
    
    const catalog = [];
    
    // 根据 start 和 end 的大小关系确定方向 / Determine direction based on start and end values
    if (start <= end) {
        // 正序：从 start 到 end / Ascending order: from start to end
        for (let i = start; i <= end; i++) {
            const translation = getNumberTranslation(i, language);
            // 如果翻译不存在，使用占位符 / Use placeholder if translation not found
            catalog.push(translation !== null ? translation : `[${i}]`);
        }
    } else {
        // 倒序：从 start 到 end / Descending order: from start to end
        for (let i = start; i >= end; i--) {
            const translation = getNumberTranslation(i, language);
            // 如果翻译不存在，使用占位符 / Use placeholder if translation not found
            catalog.push(translation !== null ? translation : `[${i}]`);
        }
    }
    
    return catalog;
}

/**
 * 从0到指定数字的翻译数组（正序） / Number translations from 0 to specified number (ascending)
 * @param {number} size - 结束数字 / End number
 * @param {string} lang - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
export const num0to = (size, lang) => createNumRange(0, size, lang);

/**
 * 从1到指定数字的翻译数组（正序） / Number translations from 1 to specified number (ascending)
 * @param {number} size - 结束数字 / End number
 * @param {string} lang - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
export const num1to = (size, lang) => createNumRange(1, size, lang);

/**
 * 从指定数字到0的翻译数组（倒序） / Number translations from specified number to 0 (descending)
 * @param {number} size - 起始数字 / Start number
 * @param {string} lang - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
export const numTo0 = (size, lang) => createNumRange(size, 0, lang);

/**
 * 从指定数字到1的翻译数组（倒序） / Number translations from specified number to 1 (descending)
 * @param {number} size - 起始数字 / Start number
 * @param {string} lang - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
export const numTo1 = (size, lang) => createNumRange(size, 1, lang);

/**
 * 指定范围的数字翻译数组 / Number translations in specified range
 * @param {number} start - 起始数字 / Start number
 * @param {number} end - 结束数字 / End number
 * @param {string} lang - 语言代码 / Language code
 * @returns {Array} 数字翻译数组 / Number translation array
 */
export const nums = (start, end, lang) => createNumRange(start, end, lang);

/**
 * 获取单个数字的翻译 / Get single number translation
 * @param {number} num - 数字 / Number
 * @param {string} language - 语言代码 / Language code
 * @returns {string|null} 对应语言的数字翻译，如果未找到则返回null / Number translation in specified language, returns null if not found
 */
export const singleNum = (num, language) => getNumberTranslation(num, language);