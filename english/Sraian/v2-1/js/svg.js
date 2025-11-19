import {loadResFromUrl} from './res.js';

// 示例1: 基本加载
export async function loadBasicSVG(url) {
    try {
        const result = await loadResFromUrl(url, {
            responseType: 'text'
        });
        console.log('SVG加载成功:', result.data);
        return result.data;
    } catch (error) {
        console.error('SVG加载失败:', error.message);
    }
}

// 示例2: 带重试机制的加载
export async function loadSVGWithRetry(url) {
    try {
        const result = await loadResFromUrl(`${url}`, {
            responseType: 'text',
            retries: 3,           // 失败时重试3次
            retryDelay: 500,      // 重试间隔500ms
            timeout: 5000         // 5秒超时
        });
        return result.data;
    } catch (error) {
        console.error(`图标 ${iconName} 加载失败:`, error.message);
        return '<svg><text>加载失败</text></svg>'; // 返回降级内容
    }
}

// 示例3: 验证SVG内容
export async function loadValidSVG(url) {
    try {
        const result = await loadResFromUrl(url, {
            responseType: 'text',
            validate: (response) => {
                // 验证内容类型
                const contentType = response.headers.get('content-type');
                return contentType.includes('svg') || contentType.includes('text');
            }
        });

        // 进一步验证SVG内容
        if (!result.data.includes('<svg')) {
            throw new Error('返回内容不是有效的SVG');
        }

        return result.data;
    } catch (error) {
        console.error('SVG验证失败:', error);
        return null;
    }
}

// 示例4: 带进度显示的加载（适用于大文件）
export async function loadLargeSVGWithProgress(url, progressElement) {
    try {
        const result = await loadResFromUrl(url, {
            responseType: 'text',
            onProgress: (loaded, total) => {
                const percent = Math.round((loaded / total) * 100);
                progressElement.textContent = `加载中: ${percent}%`;
                progressElement.style.width = `${percent}%`;
            }
        });

        progressElement.textContent = '加载完成!';
        return result.data;
    } catch (error) {
        progressElement.textContent = '加载失败';
        console.error('加载失败:', error);
        return null;
    }
}

// 批量加载多个SVG图标

export async function loadMultipleSVGs(iconUrls) {
    const promises = iconUrls.map(url =>
        loadResFromUrl(url, {
            responseType: 'text',
            retries: 1
        }).catch(error => {
            console.warn(`加载 ${url} 失败:`, error.message);
            return null;
        })
    );

    const results = await Promise.all(promises);
    return results
        .filter(result => result !== null)
        .map(result => result.data);
}

// 使用方法

// const icons = await loadMultipleSVGs([
//     '/icons/home.svg',
//     '/icons/user.svg',
//     '/icons/settings.svg'
// ]);