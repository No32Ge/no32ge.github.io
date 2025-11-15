import { num1to } from './num.js';

import { loadAllChapters } from './loader.js';
import { loadResFromUrl } from '../../js/res.js';

/** 获取 JSON 带容错 */
async function getJson(url) {
    const res = await loadResFromUrl(url, {
        timeout: 500,
        retries: 3,
        retryDelay: 300,
        responseType: "json"
    });

    return res.data;
}

// 根据数量生成章节 URL 列表
const getArticleUrlList = (prefix, chapterCount) =>
    num1to(chapterCount, "english").map(el => `${prefix}${el}.json`);

// 解析 Info 并生成 URL 列表
function parseInfoOfSource(info) {
    if (!info?.source) throw new Error("Invalid Info object: missing 'source' field");

    const { catalog, subPrefix, baseURL, chapterCount } = info.source;
    if (!catalog || !baseURL || !chapterCount)
        throw new Error(`Incomplete source info: ${JSON.stringify(info.source)}`);

    const prefix = `${baseURL}/${catalog}/${subPrefix || ''}`;
    return getArticleUrlList(prefix, chapterCount);
}


async function loadIndex(
    index,
    callback = (done, total, url, result) => {
        console.log(`${done}/${total} loaded: ${url}`, result.ok ? 'OK' : result.error.message);

    }) {
    const urls = parseInfoOfSource(index);

    const results = await loadAllChapters(urls, {
        concurrency: 3,
        passThrough: { timeout: 8000, retries: 2, useCache: true },
        onProgress: callback
    });
    // 处理结果：results[i] = { ok: true, data } 或 { ok:false, error }
    return results.filter((r) => r.ok);
}

export const loadIndexDatas = async (index, callback) => {
    const results = await loadIndex(index, callback);
    return results.map(v => v.data);
};


export async function getLibraryMeta(url, id) {
    const list = await getLibraryList(url); // 加载 index.json

    if (!Array.isArray(list)) {
        throw new Error("Index list must be an array.");
    }

    const item = list.find(el => el.id === id);

    if (!item) {
        throw new Error(`Index item with id "${id}" not found.`);
    }

    return item; // 不加载章节
}


/**
 * 从 URL 加载并校验 library 列表
 * 
 * 返回值必定是 Array
 * 如果传入格式不对，会报错
 * 如果是单个对象，会自动包装为数组
 */
export async function getLibraryList(url) {
    const data = await getJson(url);

    // 1. 完全为空
    if (data == null) {
        throw new Error(`getLibraryList: "${url}" returned null or undefined.`);
    }

    // 2. 允许用户写成单对象：{ id: ..., content: ..., source: ... }
    if (typeof data === "object" && !Array.isArray(data)) {
        console.warn(`getLibraryList: Expected array but got object; auto-wrapped into array.`);
        return [data]; // 自动转成列表
    }

    // 3. 类型必须是 array
    if (!Array.isArray(data)) {
        throw new Error(`getLibraryList: Expected array but got "${typeof data}".`);
    }

    // 4. 检查每个元素必须是 object
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        if (typeof el !== "object" || el == null) {
            throw new Error(`getLibraryList: Element at index ${i} is not a valid object.`);
        }

        // 5. 必须有 id
        if (!("id" in el)) {
            throw new Error(`getLibraryList: Element at index ${i} is missing required field "id".`);
        }

        // 6. 必须有 source 字段（你后续加载章节会用到）
        if (!("source" in el)) {
            throw new Error(`getLibraryList: Item "${el.id}" missing required field "source".`);
        }
    }

    return data;
}







// console.log("得到最终数据:", await getLibraryMeta("http://127.0.0.1:8000/ge32/labs/GeSeed/library/index/libraryIndex.json","wonder"))



