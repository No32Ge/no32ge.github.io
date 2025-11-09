export async function loadResFromUrl(url, options = {}) {
    const {
        timeout = 10000,
        retries = 3,
        retryDelay = 1000,
        cache = 'default',
        headers = {},
        onProgress = null,
        responseType = 'auto', // 'auto', 'json', 'text', 'blob', 'arrayBuffer'
        validate = null, // 自定义验证函数
        ...fetchOptions
    } = options;

    // 验证URL
    if (!url || typeof url !== 'string') {
        throw new Error('无效的URL');
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            // 添加时间戳防止缓存（如果需要）
            const finalUrl = cache === 'no-cache' ?
                `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}` : url;

            const response = await fetch(finalUrl, {
                signal: controller.signal,
                cache,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ...headers
                },
                ...fetchOptions
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // 自定义验证
            if (validate && typeof validate === 'function') {
                const isValid = await validate(response);
                if (!isValid) {
                    throw new Error('响应未通过验证');
                }
            }

            // 进度回调（如果支持）
            if (onProgress && typeof onProgress === 'function') {
                const contentLength = response.headers.get('content-length');
                if (contentLength) {
                    let loaded = 0;
                    const total = parseInt(contentLength, 10);
                    const reader = response.body.getReader();

                    const chunks = [];
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        chunks.push(value);
                        loaded += value.length;
                        onProgress(loaded, total);
                    }

                    // 重新构建响应
                    const blob = new Blob(chunks);
                    return new Response(blob, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                }
            }

            // 根据响应类型处理
            if (responseType !== 'auto') {
                let data;
                switch (responseType) {
                    case 'json':
                        data = await response.json();
                        break;
                    case 'text':
                        data = await response.text();
                        break;
                    case 'blob':
                        data = await response.blob();
                        break;
                    case 'arrayBuffer':
                        data = await response.arrayBuffer();
                        break;
                    default:
                        return response;
                }
                return {
                    originalResponse: response,
                    data,
                    url: response.url,
                    status: response.status
                };
            }

            return response;

        } catch (error) {
            const isLastAttempt = attempt === retries;

            console.warn(`请求失败 (${url}, 尝试 ${attempt + 1}/${retries + 1}):`, error.message);

            if (isLastAttempt) {
                const enhancedError = new Error(`加载资源失败: ${url}`);
                enhancedError.originalError = error;
                enhancedError.attempts = attempt + 1;
                throw enhancedError;
            }

            // 指数退避策略
            const delay = retryDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}