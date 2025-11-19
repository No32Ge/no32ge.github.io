// articles.js
const articles = [
    {
                "id": "perseverance",
                "title": "The Power of Perseverance",
                "info": {
                    "author": "Angela Duckworth",
                    "source": "Grit: The Power of Passion and Perseverance",
                    "level": "B2",
                    "tags": ["persistence", "success"],
                    "link": "https://example.com/grit"
                },
                "gram_types": {
                    "S": "Sentence Structure",
                    "T": "Tense",
                    "C": "Clause",
                    "P": "Punctuation",
                    "W": "Word Form / Morphology",
                    "O": "Others"
                },
                "paras": [
                    {
                        "id": 1,
                        "en": "Grit is passion and perseverance for very long-term goals.",
                        "cn": "毅力是对长期目标的热忱和坚持。",
                        "vocab": [
                            {
                                "word": "grit",
                                "ph": "/ɡrɪt/",
                                "mean": "毅力，勇气",
                                "ex": "She showed true grit in overcoming her challenges."
                            },
                            {
                                "word": "perseverance",
                                "ph": "/ˌpɜːsɪˈvɪərəns/",
                                "mean": "坚持不懈",
                                "ex": "Success requires talent and perseverance."
                            }
                        ],
                        "gram": [
                            {
                                "rule": "is ... and ... structure",
                                "cat": "S",
                                "desc": "用于定义某事物，并列描述其组成部分。",
                                "ex": "Happiness is health and freedom."
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "en": "Our potential is one thing. What we do with it is quite another.",
                        "cn": "我们的潜力是一回事，我们如何利用它则是另一回事。",
                        "vocab": [
                            {
                                "word": "potential",
                                "ph": "/pəˈtenʃl/",
                                "mean": "潜力",
                                "ex": "She has the potential to become a great leader."
                            }
                        ],
                        "gram": [
                            {
                                "rule": "contrasting clauses",
                                "cat": "C",
                                "desc": "使用两个独立的句子形成对比，强调差异。",
                                "ex": "Money is important. Happiness is more important."
                            }
                        ]
                    }
                ],
                "note": "Talent is important, but effort counts twice."
            }
    // ... 更多文章
];

// 同时支持CommonJS和ES6模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = articles;
} else {
    window.articlesData = articles;
}
