// articles.js
window.externalArticles = [
                {
                "id": "failure",
                "title": "The Value of Failure",
                "info": {
                    "author": "David Sedaris",
                    "source": "Me Talk Pretty One Day",
                    "level": "B2",
                    "tags": ["learning", "motivation", "growth"],
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
                        "en": "Failure is not the opposite of success; it is an integral part of the journey toward it.",
                        "cn": "失败并不是成功的反面；它是通往成功道路上不可或缺的一部分。",
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
                            },
                            {
                                "word": "integral",
                                "ph": "/ˈɪntɪɡrəl/",
                                "pos": "adj",
                                "mean": "构成整体所必需的",
                                "ex": "Practice is an integral part of learning."
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
                        "en": "Many great inventors and thinkers have experienced numerous setbacks before achieving their breakthroughs.",
                        "cn": "许多伟大的发明家和思想家在取得突破之前都经历过无数挫折。",
                        "vocab": [
                            {
                                "word": "inventors",
                                "ph": "/ɪnˈvɛntərz/",
                                "pos": "n",
                                "mean": "发明家",
                                "ex": "Thomas Edison was one of the greatest inventors in history."
                            },
                            {
                                "word": "setbacks",
                                "ph": "/ˈsɛtbæks/",
                                "pos": "n",
                                "mean": "挫折",
                                "ex": "The project faced several setbacks before finally succeeding."
                            },
                            {
                                "word": "breakthroughs",
                                "ph": "/ˈbreɪkθruːz/",
                                "pos": "n",
                                "mean": "突破",
                                "ex": "The research team made a significant breakthrough in cancer treatment."
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
                                "function": "表示过去发生的动作对现在造成的影响或结果，或表示从过去某一时间开始并持续到现在的动作或状态。",
                                "example": {
                                    "en": "They have lived here for ten years.",
                                    "cn": "他们在这里住了十年了。"
                                }
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "en": "When we fail, we gain valuable insights that success alone cannot teach us.",
                        "cn": "当我们失败时，我们获得的是成功本身无法教给我们的宝贵见解。",
                        "vocab": [
                            {
                                "word": "valuable",
                                "ph": "/ˈvæljuəbl/",
                                "pos": "adj",
                                "mean": "宝贵的",
                                "ex": "The experience provided valuable lessons for the future."
                            },
                            {
                                "word": "insights",
                                "ph": "/ˈɪnsaɪts/",
                                "pos": "n",
                                "mean": "深刻见解",
                                "ex": "Her book offers interesting insights into human behavior."
                            }
                        ],
                        "gram": [
                            {
                                "id": "when_clause",
                                "name": "时间状语从句",
                                "category": "C",
                                "level": "A2",
                                "pattern": "When + SUBJ + VERB, MAIN CLAUSE",
                                "components": [
                                    { "slot": "When", "role": "从属连词", "pos": ["conj"] },
                                    { "slot": "SUBJ", "role": "从句主语", "pos": ["n", "pron"] },
                                    { "slot": "VERB", "role": "从句谓语", "pos": ["v"] },
                                    { "slot": "MAIN CLAUSE", "role": "主句", "pos": ["S"] }
                                ],
                                "function": "表示主句动作发生的时间",
                                "example": {
                                    "en": "When it rains, I stay at home.",
                                    "cn": "下雨时，我待在家里。"
                                }
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "en": "Rather than fearing failure, we should embrace it as a necessary step in our learning process.",
                        "cn": "与其害怕失败，不如将其视为学习过程中必要的一步来拥抱它。",
                        "vocab": [
                            {
                                "word": "embrace",
                                "ph": "/ɪmˈbreɪs/",
                                "pos": "v",
                                "mean": "拥抱，接受",
                                "ex": "We should embrace new opportunities with an open mind."
                            },
                            {
                                "word": "necessary",
                                "ph": "/ˈnɛsəsəri/",
                                "pos": "adj",
                                "mean": "必要的",
                                "ex": "Sleep is necessary for good health."
                            }
                        ],
                        "gram": [
                            {
                                "id": "rather_than",
                                "name": "rather than 结构",
                                "category": "S",
                                "level": "B2",
                                "pattern": "Rather than + VERB-ing/NOUN, MAIN CLAUSE",
                                "components": [
                                    { "slot": "Rather than", "role": "比较短语", "pos": ["phr"] },
                                    { "slot": "VERB-ing/NOUN", "role": "被否定的选项", "pos": ["v", "n"] },
                                    { "slot": "MAIN CLAUSE", "role": "主句", "pos": ["S"] }
                                ],
                                "function": "表示'与其……不如……'，用于比较两个选项，强调选择后者而非前者",
                                "example": {
                                    "en": "Rather than complaining, we should find solutions.",
                                    "cn": "与其抱怨，我们不如寻找解决方案。"
                                }
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "en": "Each mistake brings us closer to understanding what works and what doesn't, ultimately guiding us toward better solutions.",
                        "cn": "每一个错误都让我们更接近理解什么方法有效、什么无效，最终指引我们找到更好的解决方案。",
                        "vocab": [
                            {
                                "word": "ultimately",
                                "ph": "/ˈʌltɪmətli/",
                                "pos": "adv",
                                "mean": "最终",
                                "ex": "Ultimately, the decision is yours to make."
                            },
                            {
                                "word": "solutions",
                                "ph": "/səˈluːʃənz/",
                                "pos": "n",
                                "mean": "解决方案",
                                "ex": "We need to find creative solutions to this problem."
                            }
                        ],
                        "gram": [
                            {
                                "id": "what_clause",
                                "name": "what 引导的宾语从句",
                                "category": "C",
                                "level": "B1",
                                "pattern": "VERB + what + CLAUSE",
                                "components": [
                                    { "slot": "VERB", "role": "主句动词", "pos": ["v"] },
                                    { "slot": "what", "role": "关系代词", "pos": ["pron"] },
                                    { "slot": "CLAUSE", "role": "从句", "pos": ["S"] }
                                ],
                                "function": "what 引导名词性从句，在句中作宾语",
                                "example": {
                                    "en": "I don't understand what you mean.",
                                    "cn": "我不明白你的意思。"
                                }
                            }
                        ]
                    }
                ],
                "note": "Failure is not something to avoid, but something to learn from. It provides the essential feedback we need to grow and improve, making it an invaluable teacher on the path to success."
            }
            ,
            {
                "id": "failure",
                "title": "The Value of Failure",
                "info": {
                    "author": "David Sedaris",
                    "source": "Me Talk Pretty One Day",
                    "level": "B2",
                    "tags": ["learning", "motivation"],
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
                                    "SUBJ + be (past) + not + X + but + Y"
                                ],
                                "constraints": "X 与 Y 必须为语法功能一致（都为名词或都为形容词类）；but 前后保持平行结构。"
                            }
                        ]
                    }
                ],
                "note": "Failure is not something to avoid, but something to learn from."
            }
];
