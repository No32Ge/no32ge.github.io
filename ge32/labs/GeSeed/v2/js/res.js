/**
 * 增强的资源加载函数，封装了fetch并提供超时、重试、进度跟踪等功能
 * @param {string} url - 要加载的资源URL
 * @param {Object} options - 配置选项
 * @param {number} options.timeout - 请求超时时间（毫秒），默认10000
 * @param {number} options.retries - 失败重试次数，默认3次
 * @param {number} options.retryDelay - 重试基础延迟时间（毫秒），默认1000
 * @param {string} options.cache - 缓存模式，同fetch的cache选项，默认'default'
 * @param {Object} options.headers - 自定义请求头
 * @param {Function} options.onProgress - 下载进度回调函数
 * @param {string} options.responseType - 响应类型：'auto'|'json'|'text'|'blob'|'arrayBuffer'，默认'auto'
 * @param {Function} options.validate - 自定义响应验证函数
 * @param {...Object} fetchOptions - 其他fetch选项
 * @returns {Promise} 返回处理后的响应对象或数据
 */
export async function loadResFromUrl(url, options = {}) {
    // 解构配置参数，设置默认值
    const {
        timeout = 10000,           // 请求超时时间10秒
        retries = 3,               // 最多重试3次
        retryDelay = 1000,         // 重试延迟1秒（会指数增长）
        cache = 'default',         // 使用浏览器默认缓存策略
        headers = {},              // 自定义请求头
        onProgress = null,         // 进度回调函数
        responseType = 'auto',     // 自动检测响应类型
        validate = null,           // 自定义验证函数
        ...fetchOptions            // 其他fetch选项（如method、body等）
    } = options;

    // 验证URL参数有效性
    if (!url || typeof url !== 'string') {
        throw new Error('无效的URL');
    }

    // 重试循环：尝试次数 = 重试次数 + 1（初始尝试）
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            // 创建AbortController用于超时控制
            const controller = new AbortController();
            // 设置超时定时器，超时时取消请求
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            // 处理缓存：如果设置为不缓存，添加时间戳参数避免缓存
            const finalUrl = cache === 'no-cache' ?
                `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}` : url;

            // 执行fetch请求
            const response = await fetch(finalUrl, {
                signal: controller.signal,  // 传入取消信号
                cache,                      // 缓存策略
                headers: {
                    // 设置默认User-Agent，模拟浏览器请求
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ...headers              // 合并自定义请求头
                },
                ...fetchOptions             // 其他fetch选项
            });

            // 请求成功，清除超时定时器
            clearTimeout(timeoutId);

            // 检查HTTP状态码，非200-299范围视为错误
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // 执行自定义验证（如果提供了验证函数）
            if (validate && typeof validate === 'function') {
                const isValid = await validate(response);
                if (!isValid) {
                    throw new Error('响应未通过验证');
                }
            }

            // 进度跟踪处理（如果启用了进度回调且有Content-Length头）
            if (onProgress && typeof onProgress === 'function') {
                const contentLength = response.headers.get('content-length');
                if (contentLength) {
                    let loaded = 0;                         // 已加载字节数
                    const total = parseInt(contentLength, 10); // 总字节数
                    const reader = response.body.getReader(); // 创建流读取器
                    const chunks = [];                      // 存储数据块

                    // 循环读取流数据
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;                    // 读取完成退出循环

                        chunks.push(value);                 // 保存数据块
                        loaded += value.length;             // 更新已加载字节数
                        onProgress(loaded, total);          // 调用进度回调
                    }

                    // 重新构建响应对象（因为原始响应体已被消耗）
                    const blob = new Blob(chunks);
                    return new Response(blob, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                }
            }

            // 根据指定的响应类型处理响应数据
            if (responseType !== 'auto') {
                let data;
                // 根据不同类型调用相应的处理方法
                switch (responseType) {
                    case 'json':
                        data = await response.json();       // 解析为JSON对象
                        break;
                    case 'text':
                        data = await response.text();       // 获取文本内容
                        break;
                    case 'blob':
                        data = await response.blob();       // 获取Blob对象
                        break;
                    case 'arrayBuffer':
                        data = await response.arrayBuffer(); // 获取ArrayBuffer
                        break;
                    default:
                        return response;                    // 未知类型返回原始响应
                }
                
                // 返回格式化后的响应对象
                return {
                    originalResponse: response,  // 原始响应对象
                    data,                        // 解析后的数据
                    url: response.url,           // 最终URL（可能经过重定向）
                    status: response.status      // HTTP状态码
                };
            }

            // responseType为'auto'时返回原始响应对象
            return response;

        } catch (error) {
            // 判断是否为最后一次尝试
            const isLastAttempt = attempt === retries;

            // 输出警告日志（包含尝试次数信息）
            console.warn(`请求失败 (${url}, 尝试 ${attempt + 1}/${retries + 1}):`, error.message);

            // 如果是最后一次尝试，抛出增强的错误信息
            if (isLastAttempt) {
                const enhancedError = new Error(`加载资源失败: ${url}`);
                enhancedError.originalError = error;  // 保留原始错误
                enhancedError.attempts = attempt + 1; // 记录尝试次数
                throw enhancedError;
            }

            // 指数退避策略：每次重试延迟时间翻倍，避免频繁重试
            const delay = retryDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}