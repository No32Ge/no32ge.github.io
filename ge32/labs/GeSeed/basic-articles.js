// articles.js
const articles = [
    {
        "id": "article_1",
        "title": "文章标题1", 
        "info": { ... },
        "paras": [ ... ]
    }
    // ... 更多文章
];

// 同时支持CommonJS和ES6模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = articles;
} else {
    window.articlesData = articles;
}
