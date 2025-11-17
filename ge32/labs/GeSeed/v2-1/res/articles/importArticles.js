

import { loadIndexDatas, getLibraryList } from "../loadRes/index.js"


export async function getLibraryItemWithChapters(url, id, callback) {
    // 1. 加载 index.json 列表
    const list = await getLibraryList(url);
    if (!Array.isArray(list))
        throw new Error("Index file should be an array.");

    // 2. 根据 id 查找对应项
    const target = list.find(item => item.id === id);
    if (!target)
        throw new Error(`Index item with id "${id}" not found.`);

    // 3. 加载章节数据
    const chapterData = await loadIndexDatas(target, callback);

    // 4. 组装返回结果
    return {
        ...target,
        chapters: chapterData
    };
}