// loader.mjs

// 导入基础加载器函数，这个函数封装了底层的资源加载逻辑
import { loadResFromUrl } from '../../js/res.js';

// 创建缓存Map，用于存储已经加载过的URL和数据，避免重复请求
const _cache = new Map();

/**
 * 休眠函数，用于在重试时添加延迟
 * @param {number} ms - 休眠的毫秒数
 * @returns {Promise} 在指定时间后resolve的Promise
 */
function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

/**
 * 加载单个章节数据的主函数
 * @param {string} url - 要加载的章节URL地址
 * @param {Object} options - 配置选项
 * @param {number} options.timeout - 请求超时时间，默认10秒
 * @param {number} options.retries - 失败重试次数，默认1次
 * @param {number} options.retryDelay - 重试延迟时间，默认500毫秒
 * @param {boolean} options.useCache - 是否使用缓存，默认true
 * @param {Function|null} options.validate - 数据验证函数，可选
 * @param {AbortSignal} options.signal - 用于取消请求的信号，可选
 * @returns {Promise<any>} 解析为章节数据的Promise
 */
export async function loadChapter(url, {
    timeout = 10000,
    retries = 1,
    retryDelay = 500,
    useCache = true,
    validate = null,
    signal = undefined
} = {}) {
    
    // 如果启用缓存且缓存中已有该URL的数据，直接返回缓存数据
    if (useCache && _cache.has(url)) {
        console.log(`从缓存返回数据: ${url}`);
        return _cache.get(url);
    }

    let attempt = 0; // 当前尝试次数计数器
    
    // 无限循环，通过break或return退出，用于实现重试机制
    while (true) {
        attempt++; // 增加尝试次数
        
        try {
            console.log(`开始加载章节 (尝试 ${attempt}/${retries + 1}): ${url}`);
            
            // 使用基础加载器加载资源
            const res = await loadResFromUrl(url, {
                timeout,           // 超时时间
                retries: 0,        // 禁用基础加载器的重试，由本函数控制重试
                responseType: 'json', // 期望响应类型为JSON
                signal,            // 取消信号
                validate: async (response) => {
                    // 如果有自定义验证函数，执行验证
                    if (typeof validate === 'function') {
                        // 克隆响应体进行验证（避免消耗原始响应）
                        const json = await response.clone().json().catch(() => null);
                        // 验证JSON数据是否有效
                        return json && validate(json);
                    }
                    // 没有验证函数则直接通过
                    return true;
                }
            });

            // 获取JSON数据
            const json = res.data;
            console.log(`章节加载成功: ${url}`);

            // 如果启用缓存，将数据存入缓存
            if (useCache) {
                _cache.set(url, json);
                console.log(`数据已缓存: ${url}`);
            }

            // 返回加载的数据
            return json;

        } catch (err) {
            console.error(`章节加载失败 (尝试 ${attempt}/${retries + 1}): ${url}`, err);
            
            // 如果是取消请求的错误，重新抛出更明确的错误信息
            if (err.name === 'AbortError') {
                throw new Error(`请求被取消: ${url}`);
            }

            // 如果还有重试次数，等待一段时间后重试
            if (attempt <= retries) {
                console.log(`等待 ${retryDelay}ms 后重试...`);
                await sleep(retryDelay);
                continue; // 继续下一次循环（重试）
            }

            // 重试次数用完，在错误信息中添加URL信息后抛出
            err.message = `${err.message} (URL: ${url})`;
            throw err;
        }
    }
}


/**
 * 批量加载多个章节数据
 * @param {string[]} urls - 要加载的URL数组
 * @param {Object} options - 配置选项
 * @param {number} options.concurrency - 最大并发数，默认无限制
 * @param {Function|null} options.onProgress - 进度回调函数
 * @param {Object} options.passThrough - 传递给loadChapter的配置参数
 * @returns {Promise<Array>} 解析为结果数组的Promise
 */
export async function loadAllChapters(urls, {
    concurrency = Infinity,  // 默认无并发限制
    onProgress = null,       // 默认无进度回调
    passThrough = {}         // 传递给单个加载函数的配置
} = {}) {
    
    const total = urls.length;           // 总任务数
    const results = new Array(total);    // 存储结果的数组
    let index = 0;                       // 当前要处理的任务索引
    let completed = 0;                   // 已完成的任务计数
    const pool = [];                     // 正在执行的任务池

    console.log(`开始批量加载 ${total} 个章节，并发数: ${concurrency}`);

    /**
     * 执行单个URL的加载任务
     * @param {number} i - 在URL数组中的索引
     */
    const runOne = async (i) => {
        const url = urls[i]; // 获取当前URL
        
        try {
            // 调用loadChapter加载单个章节
            const data = await loadChapter(url, passThrough);
            
            // 存储成功结果
            results[i] = { ok: true, data };
            
            // 如果有进度回调，调用并传递进度信息
            if (typeof onProgress === 'function') {
                onProgress(++completed, total, url, { ok: true, data });
            }
            
        } catch (err) {
            // 存储失败结果
            results[i] = { ok: false, error: err };
            
            // 如果有进度回调，调用并传递错误信息
            if (typeof onProgress === 'function') {
                onProgress(++completed, total, url, { ok: false, error: err });
            }
        }
    };

    // 主循环：控制并发执行
    while (index < total) {
        // 如果任务池未满，添加新任务
        if (pool.length < concurrency) {
            const i = index++; // 获取当前索引并自增
            
            // 创建任务Promise，任务完成后从池中移除
            const taskPromise = runOne(i).finally(() => {
                const idx = pool.indexOf(taskPromise);
                if (idx >= 0) {
                    pool.splice(idx, 1);
                }
            });
            
            // 将任务添加到执行池
            pool.push(taskPromise);
            
        } else {
            // 任务池已满，等待任意一个任务完成
            await Promise.race(pool);
        }
    }

    // 等待所有剩余任务完成
    console.log('所有任务已启动，等待完成...');
    await Promise.all(pool);
    
    console.log(`批量加载完成，成功: ${results.filter(r => r.ok).length}, 失败: ${results.filter(r => !r.ok).length}`);
    
    // 返回所有结果
    return results;
}



function a(b){
    console.log("a");
    const x  = 1;
    const y = 2;
    b(x,y);
}
a((x,y) => {
    console.log(x,y)
})
