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
    },
    {
        "id": "time_value",
        "title": "The Value of Time",
        "info": {
            "author": "English Learning Materials",
            "source": "Original Composition",
            "level": "B1",
            "tags": ["life philosophy", "time management", "personal growth"],
            "link": ""
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
                "en": "Time is arguably the most precious and irreplaceable resource in human existence, yet it is often taken for granted until it's too late.",
                "cn": "时间可以说是人类存在中最宝贵且不可替代的资源，然而人们往往直到为时已晚才意识到它的价值。",
                "vocab": [
                    {
                        "word": "arguably",
                        "ph": "/ˈɑːrɡjuəbli/",
                        "pos": "adv",
                        "mean": "可论证地，可以说",
                        "ex": "He is arguably the best player in the team."
                    },
                    {
                        "word": "irreplaceable",
                        "ph": "/ˌɪrɪˈpleɪsəbl/",
                        "pos": "adj",
                        "mean": "不可替代的",
                        "ex": "The museum contains irreplaceable artworks."
                    },
                    {
                        "word": "taken for granted",
                        "ph": "/ˈteɪkən fɔːr ˈɡræntɪd/",
                        "pos": "phr",
                        "mean": "认为理所当然",
                        "ex": "We often take our health for granted until we get sick."
                    }
                ],
                "gram": [
                    {
                        "id": "passive_voice",
                        "name": "被动语态",
                        "category": "T",
                        "level": "B1",
                        "pattern": "SUBJ + be + past participle",
                        "components": [
                            { "slot": "SUBJ", "role": "主语", "pos": ["n", "pron"] },
                            { "slot": "be", "role": "助动词", "pos": ["v"] },
                            { "slot": "past participle", "role": "过去分词", "pos": ["v"] }
                        ],
                        "function": "表示主语是动作的承受者",
                        "example": {
                            "en": "The book was written by a famous author.",
                            "cn": "这本书是由一位著名作家写的。"
                        }
                    }
                ]
            },
            {
                "id": 2,
                "en": "While every person is granted exactly twenty-four hours each day, the manner in which we utilize these hours ultimately determines the quality and direction of our lives.",
                "cn": "虽然每个人每天都被赋予完全相同的二十四小时，但我们利用这些时间的方式最终决定了我们生活的质量和方向。",
                "vocab": [
                    {
                        "word": "granted",
                        "ph": "/ˈɡræntɪd/",
                        "pos": "v",
                        "mean": "授予，给予",
                        "ex": "She was granted a scholarship to study abroad."
                    },
                    {
                        "word": "utilize",
                        "ph": "/ˈjuːtəlaɪz/",
                        "pos": "v",
                        "mean": "利用，使用",
                        "ex": "We should utilize available resources wisely."
                    },
                    {
                        "word": "ultimately",
                        "ph": "/ˈʌltɪmətli/",
                        "pos": "adv",
                        "mean": "最终",
                        "ex": "Ultimately, the decision is yours to make."
                    }
                ],
                "gram": [
                    {
                        "id": "while_clause",
                        "name": "while 引导的让步状语从句",
                        "category": "C",
                        "level": "B2",
                        "pattern": "While + CLAUSE, MAIN CLAUSE",
                        "components": [
                            { "slot": "While", "role": "从属连词", "pos": ["conj"] },
                            { "slot": "CLAUSE", "role": "从句", "pos": ["S"] },
                            { "slot": "MAIN CLAUSE", "role": "主句", "pos": ["S"] }
                        ],
                        "function": "表示'虽然……但是……'，引导让步状语从句",
                        "example": {
                            "en": "While I understand your point, I cannot agree with you.",
                            "cn": "虽然我理解你的观点，但我不能同意你。"
                        }
                    }
                ]
            },
            {
                "id": 3,
                "en": "Some individuals fritter away their precious moments on trivial pursuits and distractions, whereas others approach each day with purpose and determination, steadily advancing toward their goals.",
                "cn": "有些人将宝贵的时间浪费在琐碎的追求和分心事物上，而另一些人则带着目标和决心度过每一天，稳步向目标前进。",
                "vocab": [
                    {
                        "word": "fritter away",
                        "ph": "/ˈfrɪtər əˈweɪ/",
                        "pos": "phr",
                        "mean": "浪费，挥霍",
                        "ex": "He frittered away his inheritance on gambling."
                    },
                    {
                        "word": "trivial",
                        "ph": "/ˈtrɪviəl/",
                        "pos": "adj",
                        "mean": "琐碎的，不重要的",
                        "ex": "Don't waste time on trivial matters."
                    },
                    {
                        "word": "steadily",
                        "ph": "/ˈstedɪli/",
                        "pos": "adv",
                        "mean": "稳定地，持续地",
                        "ex": "Her English has improved steadily over the years."
                    }
                ],
                "gram": [
                    {
                        "id": "whereas",
                        "name": "whereas 对比结构",
                        "category": "C",
                        "level": "B2",
                        "pattern": "CLAUSE, whereas + CONTRASTING CLAUSE",
                        "components": [
                            { "slot": "CLAUSE", "role": "主句", "pos": ["S"] },
                            { "slot": "whereas", "role": "对比连词", "pos": ["conj"] },
                            { "slot": "CONTRASTING CLAUSE", "role": "对比从句", "pos": ["S"] }
                        ],
                        "function": "用于表示两个事物或情况之间的对比",
                        "example": {
                            "en": "He loves classical music, whereas his brother prefers rock.",
                            "cn": "他喜欢古典音乐，而他弟弟更喜欢摇滚乐。"
                        }
                    }
                ]
            },
            {
                "id": 4,
                "en": "In our youth, we often operate under the illusion of limitless time, believing that there will always be a tomorrow to pursue our dreams and correct our mistakes.",
                "cn": "年轻时，我们常常抱有时光无限的错觉，相信总会有明天去追求梦想和纠正错误。",
                "vocab": [
                    {
                        "word": "illusion",
                        "ph": "/ɪˈluːʒn/",
                        "pos": "n",
                        "mean": "错觉，幻觉",
                        "ex": "The idea of getting rich quickly is just an illusion."
                    },
                    {
                        "word": "limitless",
                        "ph": "/ˈlɪmɪtləs/",
                        "pos": "adj",
                        "mean": "无限的",
                        "ex": "The internet provides limitless information."
                    },
                    {
                        "word": "pursue",
                        "ph": "/pərˈsuː/",
                        "pos": "v",
                        "mean": "追求，从事",
                        "ex": "She decided to pursue a career in medicine."
                    }
                ],
                "gram": [
                    {
                        "id": "gerund_phrase",
                        "name": "动名词短语作宾语",
                        "category": "S",
                        "level": "B1",
                        "pattern": "VERB + VERB-ing",
                        "components": [
                            { "slot": "VERB", "role": "主句动词", "pos": ["v"] },
                            { "slot": "VERB-ing", "role": "动名词", "pos": ["v"] }
                        ],
                        "function": "动名词在句中作动词的宾语",
                        "example": {
                            "en": "I enjoy reading books in my free time.",
                            "cn": "我喜欢在空闲时间读书。"
                        }
                    }
                ]
            },
            {
                "id": 5,
                "en": "However, time passes with relentless speed, and before we know it, we find ourselves looking back with regret at missed opportunities and procrastinated ambitions.",
                "cn": "然而，时间以无情的速度流逝，在我们意识到之前，我们发现自己回首往事，对错过的机会和被拖延的抱负感到遗憾。",
                "vocab": [
                    {
                        "word": "relentless",
                        "ph": "/rɪˈlentləs/",
                        "pos": "adj",
                        "mean": "无情的，不间断的",
                        "ex": "The relentless rain continued for three days."
                    },
                    {
                        "word": "procrastinated",
                        "ph": "/prəʊˈkræstɪneɪtɪd/",
                        "pos": "adj",
                        "mean": "被拖延的",
                        "ex": "His procrastinated response caused many problems."
                    },
                    {
                        "word": "ambitions",
                        "ph": "/æmˈbɪʃənz/",
                        "pos": "n",
                        "mean": "抱负，雄心",
                        "ex": "She has great ambitions for her future career."
                    }
                ],
                "gram": [
                    {
                        "id": "before_clause",
                        "name": "before 时间状语从句",
                        "category": "C",
                        "level": "B1",
                        "pattern": "Before + CLAUSE, MAIN CLAUSE",
                        "components": [
                            { "slot": "Before", "role": "从属连词", "pos": ["conj"] },
                            { "slot": "CLAUSE", "role": "时间从句", "pos": ["S"] },
                            { "slot": "MAIN CLAUSE", "role": "主句", "pos": ["S"] }
                        ],
                        "function": "表示主句动作发生在从句动作之前",
                        "example": {
                            "en": "Before you make a decision, think carefully.",
                            "cn": "在你做决定之前，仔细想一想。"
                        }
                    }
                ]
            },
            {
                "id": 6,
                "en": "This sobering realization underscores the critical importance of using each moment wisely and intentionally.",
                "cn": "这一发人深省的认识强调了明智而有意识地利用每一刻的至关重要性。",
                "vocab": [
                    {
                        "word": "sobering",
                        "ph": "/ˈsəʊbərɪŋ/",
                        "pos": "adj",
                        "mean": "发人深省的，使清醒的",
                        "ex": "The accident was a sobering experience for everyone."
                    },
                    {
                        "word": "underscores",
                        "ph": "/ˌʌndərˈskɔːrz/",
                        "pos": "v",
                        "mean": "强调，突出",
                        "ex": "The report underscores the need for immediate action."
                    },
                    {
                        "word": "intentionally",
                        "ph": "/ɪnˈtenʃənəli/",
                        "pos": "adv",
                        "mean": "有意地，故意地",
                        "ex": "She intentionally avoided the controversial topic."
                    }
                ],
                "gram": [
                    {
                        "id": "gerund_subject",
                        "name": "动名词作主语",
                        "category": "S",
                        "level": "B1",
                        "pattern": "VERB-ing + VERB",
                        "components": [
                            { "slot": "VERB-ing", "role": "主语", "pos": ["v"] },
                            { "slot": "VERB", "role": "谓语", "pos": ["v"] }
                        ],
                        "function": "动名词在句中作主语",
                        "example": {
                            "en": "Swimming is good exercise.",
                            "cn": "游泳是很好的锻炼。"
                        }
                    }
                ]
            },
            {
                "id": 7,
                "en": "However, wise time management should not be confused with constant labor; it encompasses maintaining meaningful relationships, acquiring new knowledge, and ensuring adequate rest and rejuvenation.",
                "cn": "然而，明智的时间管理不应与持续劳动混为一谈；它包括维持有意义的关系、获取新知识以及确保充分的休息和恢复。",
                "vocab": [
                    {
                        "word": "encompasses",
                        "ph": "/ɪnˈkʌmpəsɪz/",
                        "pos": "v",
                        "mean": "包含，包括",
                        "ex": "The course encompasses all aspects of business management."
                    },
                    {
                        "word": "acquiring",
                        "ph": "/əˈkwaɪərɪŋ/",
                        "pos": "v",
                        "mean": "获得，获取",
                        "ex": "He is interested in acquiring new language skills."
                    },
                    {
                        "word": "rejuvenation",
                        "ph": "/rɪˌdʒuːvəˈneɪʃən/",
                        "pos": "n",
                        "mean": "恢复活力，焕发青春",
                        "ex": "The vacation provided much-needed rejuvenation."
                    }
                ],
                "gram": [
                    {
                        "id": "semicolon_use",
                        "name": "分号用法",
                        "category": "P",
                        "level": "B2",
                        "pattern": "INDEPENDENT CLAUSE; INDEPENDENT CLAUSE",
                        "components": [
                            { "slot": "INDEPENDENT CLAUSE", "role": "独立分句", "pos": ["S"] },
                            { "slot": ";", "role": "分号", "pos": ["P"] },
                            { "slot": "INDEPENDENT CLAUSE", "role": "独立分句", "pos": ["S"] }
                        ],
                        "function": "连接两个意义相关的独立分句",
                        "example": {
                            "en": "She loves reading; he prefers watching movies.",
                            "cn": "她喜欢阅读；他更喜欢看电影。"
                        }
                    }
                ]
            },
            {
                "id": 8,
                "en": "The essence of effective time utilization lies in achieving a harmonious balance between various life domains—professional responsibilities, personal growth, social connections, and self-care.",
                "cn": "有效利用时间的本质在于在生活的各个领域——职业责任、个人成长、社会关系和自我关怀——之间实现和谐的平衡。",
                "vocab": [
                    {
                        "word": "essence",
                        "ph": "/ˈesns/",
                        "pos": "n",
                        "mean": "本质，精髓",
                        "ex": "The essence of his argument was quite simple."
                    },
                    {
                        "word": "harmonious",
                        "ph": "/hɑːrˈmoʊniəs/",
                        "pos": "adj",
                        "mean": "和谐的，协调的",
                        "ex": "They have a harmonious working relationship."
                    },
                    {
                        "word": "domains",
                        "ph": "/dəˈmeɪnz/",
                        "pos": "n",
                        "mean": "领域，范围",
                        "ex": "She is an expert in several scientific domains."
                    }
                ],
                "gram": [
                    {
                        "id": "dash_usage",
                        "name": "破折号用法",
                        "category": "P",
                        "level": "B2",
                        "pattern": "SENTENCE — EXPLANATION — CONTINUATION",
                        "components": [
                            { "slot": "SENTENCE", "role": "主句", "pos": ["S"] },
                            { "slot": "—", "role": "破折号", "pos": ["P"] },
                            { "slot": "EXPLANATION", "role": "解释内容", "pos": ["n", "adj", "phr"] },
                            { "slot": "—", "role": "破折号", "pos": ["P"] },
                            { "slot": "CONTINUATION", "role": "继续主句", "pos": ["S"] }
                        ],
                        "function": "用于插入解释性或补充性信息",
                        "example": {
                            "en": "Three countries—China, India, and Russia—supported the proposal.",
                            "cn": "三个国家——中国、印度和俄罗斯——支持这项提议。"
                        }
                    }
                ]
            },
            {
                "id": 9,
                "en": "It is crucial to understand that while lost wealth can typically be recovered through diligent effort and strategic planning, time once passed vanishes eternally, never to return.",
                "cn": "至关重要的是要理解，虽然失去的财富通常可以通过勤奋努力和战略规划重新获得，但一旦时间流逝就会永远消失，永不复返。",
                "vocab": [
                    {
                        "word": "diligent",
                        "ph": "/ˈdɪlɪdʒənt/",
                        "pos": "adj",
                        "mean": "勤奋的，刻苦的",
                        "ex": "She is a diligent student who always completes her work on time."
                    },
                    {
                        "word": "strategic",
                        "ph": "/strəˈtiːdʒɪk/",
                        "pos": "adj",
                        "mean": "战略的，策略性的",
                        "ex": "The company made a strategic decision to expand overseas."
                    },
                    {
                        "word": "vanishes",
                        "ph": "/ˈvænɪʃɪz/",
                        "pos": "v",
                        "mean": "消失，突然不见",
                        "ex": "The sun vanished behind the clouds."
                    }
                ],
                "gram": [
                    {
                        "id": "while_contrast",
                        "name": "while 对比结构",
                        "category": "C",
                        "level": "B2",
                        "pattern": "While + CLAUSE A, CLAUSE B",
                        "components": [
                            { "slot": "While", "role": "从属连词", "pos": ["conj"] },
                            { "slot": "CLAUSE A", "role": "对比内容A", "pos": ["S"] },
                            { "slot": "CLAUSE B", "role": "对比内容B", "pos": ["S"] }
                        ],
                        "function": "表示两个分句之间的对比关系",
                        "example": {
                            "en": "While my brother enjoys sports, I prefer reading.",
                            "cn": "虽然我弟弟喜欢运动，但我更喜欢阅读。"
                        }
                    }
                ]
            },
            {
                "id": 10,
                "en": "By learning to cherish and strategically invest our time in pursuits that align with our values and aspirations, we not only enhance our present experiences but also build a foundation for a more meaningful and fulfilling future.",
                "cn": "通过学会珍惜并有策略地将时间投入与我们的价值观和抱负一致的追求中，我们不仅提升了当下的体验，也为更有意义和充实的未来奠定了基础。",
                "vocab": [
                    {
                        "word": "cherish",
                        "ph": "/ˈtʃerɪʃ/",
                        "pos": "v",
                        "mean": "珍惜，珍爱",
                        "ex": "I cherish the memories of our time together."
                    },
                    {
                        "word": "align with",
                        "ph": "/əˈlaɪn wɪð/",
                        "pos": "phr",
                        "mean": "与……一致",
                        "ex": "His actions don't align with his words."
                    },
                    {
                        "word": "fulfilling",
                        "ph": "/fʊlˈfɪlɪŋ/",
                        "pos": "adj",
                        "mean": "令人满足的，有成就感的",
                        "ex": "Teaching is a fulfilling profession for her."
                    }
                ],
                "gram": [
                    {
                        "id": "by_gerund",
                        "name": "by + 动名词表示方式",
                        "category": "S",
                        "level": "B1",
                        "pattern": "By + VERB-ing, MAIN CLAUSE",
                        "components": [
                            { "slot": "By", "role": "介词", "pos": ["prep"] },
                            { "slot": "VERB-ing", "role": "动名词", "pos": ["v"] },
                            { "slot": "MAIN CLAUSE", "role": "主句", "pos": ["S"] }
                        ],
                        "function": "表示通过某种方式或方法实现主句的动作",
                        "example": {
                            "en": "By practicing regularly, you can improve your English.",
                            "cn": "通过定期练习，你可以提高英语水平。"
                        }
                    }
                ]
            }
        ],
        "note": "Time is the most democratic of resources—everyone receives the same daily allocation. How we choose to spend this irreplaceable currency ultimately defines the quality and meaning of our lives. As Benjamin Franklin wisely noted, 'Lost time is never found again.'"
    }

];
