// 词性类型映射
export const posTypes = {
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
};

// 语法类别映射
export const gramTypes = {
    "S": { "en": "Sentence Structure", "cn": "句子结构" },
    "T": { "en": "Tense", "cn": "时态" },
    "C": { "en": "Clause", "cn": "从句" },
    "P": { "en": "Punctuation", "cn": "标点" },
    "W": { "en": "Word Form / Morphology", "cn": "词形变化" },
    "O": { "en": "Others", "cn": "其他" }
};


export const originalArticleData = [
    {
        "id": "failure",
        "title": "The Value of Failure",
        "info": {
            "author": "David Sedaris",
            "source": "Me Talk Pretty One Day",
            "level": "B2",
            "tags": ["learning", "motivation"],
            "link": "[https://example.com/original](https://example.com/original)",
            "variants": null
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
                            "SUBJ + be (past) + not + X + but + Y"
                        ],
                        "constraints": "X 与 Y 必须为语法功能一致（都为名词或都为形容词类）；but 前后保持平行结构。"
                    }
                ]
            },
            {
                "id": 2,
                "en": "Each mistake teaches you what not to do next time. When you try and fail, you collect information — sometimes small, sometimes decisive — that shapes your next attempt.",
                "cn": "每一次错误都会告诉你下一次不要怎么做。尝试并失败时，你会收集信息——有时是微小的，有时是决定性的——这些信息会影响你下一次的尝试。",
                "vocab": [
                    {
                        "word": "mistake",
                        "ph": "/mɪˈsteɪk/",
                        "pos": "n",
                        "mean": "错误；失误",
                        "ex": "A small mistake cost them the game."
                    },
                    {
                        "word": "decisive",
                        "ph": "/dɪˈsaɪsɪv/",
                        "pos": "adj",
                        "mean": "决定性的；关键的",
                        "ex": "A decisive victory ended the season early."
                    },
                    {
                        "word": "attempt",
                        "ph": "/əˈtempt/",
                        "pos": "n",
                        "mean": "尝试",
                        "ex": "Her first attempt failed, but she tried again."
                    }
                ],
                "gram": [
                    {
                        "id": "present_participle_clause",
                        "name": "现在分词短语作伴随状语",
                        "category": "S",
                        "level": "B2",
                        "pattern": "VERB-ing + , + main clause",
                        "components": [
                            { "slot": "VERB-ing", "role": "现在分词短语", "pos": ["v-ing"] },
                            { "slot": "main clause", "role": "主句", "pos": ["clause"] }
                        ],
                        "function": "表示两个动作同时发生或伴随发生，简化句子结构，常用于书面语。",
                        "example": {
                            "en": "Trying and failing, he learned what to change.",
                            "cn": "尝试并失败的过程中，他学会了要改变什么。"
                        },
                        "variants": null,
                        "constraints": "主语要一致，避免造成悬垂分词。"
                    }
                ]
            },
            {
                "id": 3,
                "en": "Successful people often have long lists of failures behind them. They simply see those failures as experiments that didn't produce the intended result — data, not judgment.",
                "cn": "成功的人通常背后有一长串失败。他们只是把那些失败看作未能产生预期结果的实验——是数据，不是评判。",
                "vocab": [
                    {
                        "word": "successful",
                        "ph": "/səkˈsesfəl/",
                        "pos": "adj",
                        "mean": "成功的",
                        "ex": "She is a successful engineer."
                    },
                    {
                        "word": "experiment",
                        "ph": "/ɪkˈsperɪmənt/",
                        "pos": "n",
                        "mean": "实验；尝试",
                        "ex": "The scientists ran the experiment twice."
                    },
                    {
                        "word": "judgment",
                        "ph": "/ˈdʒʌdʒmənt/",
                        "pos": "n",
                        "mean": "评判；判断",
                        "ex": "Try to avoid harsh judgment of yourself."
                    }
                ],
                "gram": [
                    {
                        "id": "noun_phrase_apposition",
                        "name": "名词短语同位语",
                        "category": "P",
                        "level": "B2",
                        "pattern": "noun + , + appositive phrase + ,",
                        "components": [
                            { "slot": "noun", "role": "名词", "pos": ["n"] },
                            { "slot": "appositive phrase", "role": "同位语", "pos": ["phr"] }
                        ],
                        "function": "提供额外信息或解释，常用逗号隔开。",
                        "example": {
                            "en": "They, experiments that failed, provided useful lessons.",
                            "cn": "那些失败的实验为他们提供了有用的教训。"
                        },
                        "variants": [
                            "noun + — + appositive phrase + —",
                            "noun (that + clause) as apposition"
                        ],
                        "constraints": "同位语与名词在意义上应指向同一概念。"
                    }
                ]
            },
            {
                "id": 4,
                "en": "The emotional part of failure — shame, disappointment, embarrassment — is real and must be acknowledged. But treating emotions as the whole story prevents you from extracting the lessons.",
                "cn": "失败的情感部分——羞耻、失望、尴尬——是真实存在且必须承认的。但把情绪当成全部故事会阻止你提取教训。",
                "vocab": [
                    {
                        "word": "shame",
                        "ph": "/ʃeɪm/",
                        "pos": "n",
                        "mean": "羞耻；惭愧",
                        "ex": "He felt shame after the mistake."
                    },
                    {
                        "word": "embarrassment",
                        "ph": "/ɪmˈbærəsmənt/",
                        "pos": "n",
                        "mean": "窘迫；尴尬",
                        "ex": "There was some embarrassment at the meeting."
                    },
                    {
                        "word": "acknowledge",
                        "ph": "/əkˈnɒlɪdʒ/",
                        "pos": "v",
                        "mean": "承认；认可",
                        "ex": "You should acknowledge your progress."
                    }
                ],
                "gram": [
                    {
                        "id": "list_commas",
                        "name": "并列名词或短语的列举（逗号）",
                        "category": "S",
                        "level": "B1",
                        "pattern": "item1, item2, item3",
                        "components": [
                            { "slot": "item", "role": "列表项", "pos": ["n", "phr"] }
                        ],
                        "function": "用逗号或破折号连接多个并列项，强调累积或并列的概念。",
                        "example": {
                            "en": "Shame, disappointment, embarrassment — they all hurt.",
                            "cn": "羞耻、失望、尴尬——它们都会令人痛苦。"
                        },
                        "variants": null,
                        "constraints": "最后两个项之间通常用 and 或者破折号来终结并列。"
                    }
                ]
            },
            {
                "id": 5,
                "en": "What matters is the habit you build after failure: analyze honestly, adapt quickly, and try again. That habit turns temporary setbacks into long-term progress.",
                "cn": "关键是你在失败之后养成的习惯：诚实分析、快速调整并再次尝试。这个习惯会把暂时的挫折变成长期的进步。",
                "vocab": [
                    {
                        "word": "analyze",
                        "ph": "/ˈænəlaɪz/",
                        "pos": "v",
                        "mean": "分析",
                        "ex": "Analyze the results before deciding."
                    },
                    {
                        "word": "adapt",
                        "ph": "/əˈdæpt/",
                        "pos": "v",
                        "mean": "适应；调整",
                        "ex": "You must adapt your plan to new information."
                    },
                    {
                        "word": "setback",
                        "ph": "/ˈsetbæk/",
                        "pos": "n",
                        "mean": "挫折；倒退",
                        "ex": "The delay was only a temporary setback."
                    }
                ],
                "gram": [
                    {
                        "id": "imperative_sequence",
                        "name": "祈使句序列",
                        "category": "S",
                        "level": "B2",
                        "pattern": "Verb, Verb, and Verb.",
                        "components": [
                            { "slot": "Verb", "role": "动词原形（祈使）", "pos": ["v"] }
                        ],
                        "function": "用来列举指导步骤或建议，常见于说明文和指示性语言。",
                        "example": {
                            "en": "Analyze honestly, adapt quickly, and try again.",
                            "cn": "诚实分析、迅速调整并再次尝试。"
                        },
                        "variants": [
                            "Verb + ing, Verb + ing, and Verb + ing.",
                            "Verb + , + Verb + ; + Verb."
                        ],
                        "constraints": "各项应保持语法平行。"
                    }
                ]
            }
        ]
    }

];