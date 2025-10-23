// articles.js
window.externalArticles = [
    {
        "id": "failure",
        "title": "The Value of Failure",
        "info": {
            "author": "David Sedaris",
            "source": "Me Talk Pretty One Day",
            "level": "B2",
            "tags": ["learning", "motivation", "growth", "resilience"],
            "link": "https://example.com/original"
        },
        "gram_types": {
            "S": { "en": "Sentence Structure", "cn": "句子结构" },
            "T": { "en": "Tense", "cn": "时态" },
            "C": { "en": "Clause", "cn": "从句" },
            "P": { "en": "Punctuation", "cn": "标点" },
            "W": { "en": "Word Form / Morphology", "cn": "词形变化" },
            "O": { "en": "Others", "cn": "其他" }
        },
        "posTypes": {
            "n": { "en": "noun", "cn": "名词" },
            "v": { "en": "verb", "cn": "动词" },
            "adj": { "en": "adjective", "cn": "形容词" },
            "adv": { "en": "adverb", "cn": "副词" },
            "prep": { "en": "preposition", "cn": "介词" },
            "conj": { "en": "conjunction", "cn": "连词" },
            "pron": { "en": "pronoun", "cn": "代词" },
            "det": { "en": "determiner", "cn": "限定词" },
            "int": { "en": "interjection", "cn": "感叹词" },
            "phr": { "en": "phrase", "cn": "短语" },
            "S": { "en": "sentence", "cn": "句子" }
        },
        "paras": [
            {
                "id": 1,
                "en": "Failure is not the opposite of success; it is part of success.",
                "cn": "失败并不是成功的反面；它是成功的一部分。",
                "vocab": [
                    {
                        "word": "failure",
                        "ph": "/ˈfeɪljər/",
                        "pos": "n",
                        "mean": "失败",
                        "ex": "He learned a lot from his failure."
                    },
                    {
                        "word": "opposite of",
                        "ph": "/ˈɒpəzɪt/",
                        "pos": "phr",
                        "mean": "相反的事物",
                        "ex": "Love is the opposite of hate."
                    }
                ],
                "gram": [
                    {
                        "id": "not_but_structure",
                        "name": "not ... but ... 结构",
                        "category": "S",
                        "level": "B1",
                        "pattern": "SUBJ + be + not + X + but + Y",
                        "components": [
                            { "slot": "SUBJ", "role": "主语", "pos": ["n", "pron", "phr"] },
                            { "slot": "be", "role": "系动词", "pos": ["v"] },
                            { "slot": "not", "role": "否定词", "pos": ["adv"] },
                            { "slot": "X", "role": "否定内容", "pos": ["n", "adj", "phr"] },
                            { "slot": "but", "role": "转折连词", "pos": ["conj"] },
                            { "slot": "Y", "role": "肯定内容", "pos": ["n", "adj", "phr"] }
                        ],
                        "function": "用于表达'不是……而是……'，强调两者对比，否定前者肯定后者。",
                        "example": {
                            "en": "She is not lazy but tired.",
                            "cn": "她不是懒惰而是累了。"
                        },
                        "variants": [
                            "SUBJ + do/does/did + not + VERB + but + VERB",
                            "SUBJ + be (past) + not + X + but + Y",
                            "Not + X + but + Y + VERB + SUBJ"
                        ],
                        "constraints": "X 与 Y 必须为语法功能一致（都为名词或都为形容词类）；but 前后保持平行结构。"
                    }
                ]
            },
            {
                "id": 2,
                "en": "When we fail, we are given a unique opportunity to learn and grow in ways that success alone cannot teach us.",
                "cn": "当我们失败时，我们获得了一个独特的机会去学习和成长，这是单靠成功无法教会我们的。",
                "vocab": [
                    {
                        "word": "unique",
                        "ph": "/juːˈniːk/",
                        "pos": "adj",
                        "mean": "独特的",
                        "ex": "Each person's fingerprint is unique."
                    },
                    {
                        "word": "opportunity",
                        "ph": "/ˌɒpəˈtjuːnəti/",
                        "pos": "n",
                        "mean": "机会",
                        "ex": "This job is a great opportunity for me."
                    }
                ],
                "gram": [
                    {
                        "id": "when_clause",
                        "name": "When 引导的时间状语从句",
                        "category": "C",
                        "level": "A2",
                        "pattern": "When + SUBJ + VERB, MAIN CLAUSE",
                        "components": [
                            { "slot": "When", "role": "时间连词", "pos": ["conj"] },
                            { "slot": "SUBJ", "role": "从句主语", "pos": ["n", "pron"] },
                            { "slot": "VERB", "role": "从句谓语", "pos": ["v"] }
                        ],
                        "function": "表示主句动作发生的时间背景",
                        "example": {
                            "en": "When it rains, I stay at home.",
                            "cn": "当下雨时，我待在家里。"
                        },
                        "variants": [
                            "MAIN CLAUSE + when + SUBJ + VERB",
                            "When + VERBing, MAIN CLAUSE"
                        ],
                        "constraints": "当主句在前时，when 从句前通常不加逗号；当when从句在前时，后面需要加逗号。"
                    }
                ]
            },
            {
                "id": 3,
                "en": "Many great inventors and thinkers have experienced numerous failures before achieving their breakthroughs.",
                "cn": "许多伟大的发明家和思想家在取得突破之前都经历了无数次的失败。",
                "vocab": [
                    {
                        "word": "inventors",
                        "ph": "/ɪnˈvɛntəz/",
                        "pos": "n",
                        "mean": "发明家",
                        "ex": "Thomas Edison was one of the greatest inventors in history."
                    },
                    {
                        "word": "numerous",
                        "ph": "/ˈnjuːmərəs/",
                        "pos": "adj",
                        "mean": "许多的，大量的",
                        "ex": "She has received numerous awards for her work."
                    },
                    {
                        "word": "breakthroughs",
                        "ph": "/ˈbreɪkθruːz/",
                        "pos": "n",
                        "mean": "突破",
                        "ex": "The research team made a major breakthrough in cancer treatment."
                    }
                ],
                "gram": [
                    {
                        "id": "present_perfect",
                        "name": "现在完成时",
                        "category": "T",
                        "level": "B1",
                        "pattern": "SUBJ + have/has + past participle",
                        "components": [
                            { "slot": "SUBJ", "role": "主语", "pos": ["n", "pron"] },
                            { "slot": "have/has", "role": "助动词", "pos": ["v"] },
                            { "slot": "past participle", "role": "过去分词", "pos": ["v"] }
                        ],
                        "function": "表示过去发生的动作对现在造成的影响或结果，或表示从过去某一时间开始并持续到现在的动作或状态",
                        "example": {
                            "en": "I have finished my homework.",
                            "cn": "我已经完成了我的作业。"
                        },
                        "variants": [
                            "SUBJ + have/has + not + past participle",
                            "Have/Has + SUBJ + past participle?",
                            "SUBJ + have/has + never + past participle"
                        ],
                        "constraints": "使用过去分词形式，不规则动词需要特殊记忆；has 用于第三人称单数主语。"
                    }
                ]
            },
            {
                "id": 4,
                "en": "In fact, some of the most valuable lessons come not from our successes, but from analyzing what went wrong in our failures.",
                "cn": "事实上，一些最有价值的教训并非来自我们的成功，而是来自分析我们在失败中出错的地方。",
                "vocab": [
                    {
                        "word": "valuable",
                        "ph": "/ˈvæljuəbl/",
                        "pos": "adj",
                        "mean": "有价值的",
                        "ex": "The advice he gave me was very valuable."
                    },
                    {
                        "word": "analyzing",
                        "ph": "/ˈænəlaɪzɪŋ/",
                        "pos": "v",
                        "mean": "分析",
                        "ex": "We need to spend more time analyzing the data."
                    }
                ],
                "gram": [
                    {
                        "id": "not_but_extended",
                        "name": "not from...but from... 扩展结构",
                        "category": "S",
                        "level": "B2",
                        "pattern": "SUBJ + VERB + not from X but from Y",
                        "components": [
                            { "slot": "SUBJ", "role": "主语", "pos": ["n", "pron"] },
                            { "slot": "VERB", "role": "谓语动词", "pos": ["v"] },
                            { "slot": "not from", "role": "否定来源", "pos": ["prep"] },
                            { "slot": "X", "role": "否定内容", "pos": ["n", "phr"] },
                            { "slot": "but from", "role": "肯定来源", "pos": ["prep"] },
                            { "slot": "Y", "role": "肯定内容", "pos": ["n", "phr"] }
                        ],
                        "function": "强调来源或原因的对比，否定一个来源而肯定另一个来源",
                        "example": {
                            "en": "True happiness comes not from wealth but from contentment.",
                            "cn": "真正的幸福并非来自财富，而是来自满足。"
                        },
                        "variants": [
                            "SUBJ + VERB + not because of X but because of Y",
                            "SUBJ + VERB + not through X but through Y"
                        ],
                        "constraints": "X 和 Y 必须是平行结构，通常都是名词或名词短语；from 后面接来源或原因。"
                    },
                    {
                        "id": "what_clause",
                        "name": "What 引导的名词性从句",
                        "category": "C",
                        "level": "B1",
                        "pattern": "what + SUBJ + VERB",
                        "components": [
                            { "slot": "what", "role": "关系代词", "pos": ["pron"] },
                            { "slot": "SUBJ", "role": "从句主语", "pos": ["n", "pron"] },
                            { "slot": "VERB", "role": "从句谓语", "pos": ["v"] }
                        ],
                        "function": "作为名词性从句，在句中充当主语、宾语或表语",
                        "example": {
                            "en": "I understand what you mean.",
                            "cn": "我明白你的意思。"
                        },
                        "variants": [
                            "what + VERB",
                            "what little/few + SUBJ + VERB"
                        ],
                        "constraints": "what 在从句中通常充当主语或宾语；从句使用陈述语序。"
                    }
                ]
            }
        ],
        "note": "Failure is not something to avoid, but something to learn from. Each failure brings us closer to success by providing invaluable insights and experiences."
    }
];
