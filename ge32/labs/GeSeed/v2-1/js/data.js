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
        "id": "ge32_english_promo",
        "title": "GE32 English — GeSeed v2",
        "info": {
            "author": "GE32 English",
            "source": "Promotional Material",
            "level": "C1",
            "tags": [
                "marketing",
                "education",
                "slang",
                "motivation",
                "ed-tech"
            ],
            "link": "https://ge32english.com/labs/GeSeed/v2",
            "variants": null
        },
        "paras": [
            {
                "id": 1,
                "en": "Wassup, welcome to GE32 English — your hardcore door to mastering English with zero fluff, no more fucking bullshit. You’re about to dive into GeSeed v2, a slick-ass learning engine built by GE32 that’s all about taking your English game from “meh” to “hell yeah”.",
                "cn": "咋样，欢迎来到 GE32 英语——你通往精通英语的硬核之门，零废话，拒绝狗屁。你即将深入体验 GeSeed v2，一个由 GE32 打造的超屌的学习引擎，它就是要让你的英语水平从“一般般”飙到“牛逼”。",
                "vocab": [
                    {
                        "word": "wassup",
                        "ph": "/wəˈsʌp/",
                        "pos": "int",
                        "mean": "（俚语）你好；怎么样",
                        "ex": "He greeted his friend with a casual, 'Wassup, dude?'"
                    },
                    {
                        "word": "hardcore",
                        "ph": "/ˈhɑːrdkɔːr/",
                        "pos": "adj",
                        "mean": "硬核的；毫不妥协的",
                        "ex": "This is a hardcore workout designed for serious athletes."
                    },
                    {
                        "word": "fluff",
                        "ph": "/flʌf/",
                        "pos": "n",
                        "mean": "（非正式）废话；没有实质内容的东西",
                        "ex": "The report was full of fluff and didn't provide any real data."
                    },
                    {
                        "word": "bullshit",
                        "ph": "/ˈbʊlʃɪt/",
                        "pos": "n",
                        "mean": "（粗俗俚语）胡说；废话",
                        "ex": "He claimed he finished the project, but I knew it was bullshit."
                    },
                    {
                        "word": "slick-ass",
                        "ph": "/ˈslɪk æs/",
                        "pos": "adj",
                        "mean": "（粗俗俚语）超屌的；非常酷炫的",
                        "ex": "He just bought a slick-ass sports car."
                    },
                    {
                        "word": "meh / hell yeah",
                        "ph": "/meɪ / hel jeə/",
                        "pos": "int",
                        "mean": "（俚语）一般般 / 太棒了",
                        "ex": "A: 'How was the movie?' B: 'Meh.' / A: 'Want to go to the concert?' B: 'Hell yeah!'"
                    }
                ],
                "gram": [
                    {
                        "id": "aggressive_and_slang_heavy_tone",
                        "name": "攻击性与重俚语的语调",
                        "category": "R",
                        "level": "C1",
                        "pattern": "Use of informal greetings, profanity, and intense slang.",
                        "components": [
                            {
                                "slot": "slang/profanity",
                                "role": "俚语/粗话",
                                "pos": [
                                    "n",
                                    "int"
                                ]
                            }
                        ],
                        "function": "通过使用“Wassup”、“hardcore”、“fucking bullshit”和“slick-ass”等词语，文本立即建立了一种极度非正式、直接且充满“态度”的品牌形象。这种语调旨在吸引那些厌倦传统教学、寻求更“真实”和“硬核”学习体验的目标受众。",
                        "example": {
                            "en": "Forget the old ways. This is the real deal, no excuses.",
                            "cn": "忘了那些老办法。这才是真家伙，没有借口。"
                        },
                        "variants": null,
                        "constraints": "这种语调在正式场合中是完全不合适的，但在特定营销中非常有效。"
                    }
                ]
            },
            {
                "id": 2,
                "en": "Forget boring textbooks and stale grammar drills. GeSeed v2 is built by learners, for learners — lean, mean, and battle-ready. It’s a lean lab-based project hosted at ge32english.com/labs/GeSeed/v2 where every module is designed to throw you into the deep end of English, but with powerful tools to keep you afloat.",
                "cn": "忘掉无聊的教科书和陈腐的语法练习。GeSeed v2 由学习者为学习者而建——精悍、强劲、随时应战。这是一个精简的、基于实验室的项目，托管在 ge32english.com/labs/GeSeed/v2，每个模块都旨在把你扔进英语的深水区，但同时提供强大的工具让你能浮起来。",
                "vocab": [
                    {
                        "word": "stale",
                        "ph": "/steɪl/",
                        "pos": "adj",
                        "mean": "陈腐的；不新鲜的",
                        "ex": "His jokes were stale and no one laughed."
                    },
                    {
                        "word": "drill",
                        "ph": "/drɪl/",
                        "pos": "n",
                        "mean": "（反复的）练习",
                        "ex": "The team practiced defensive drills for an hour."
                    },
                    {
                        "word": "lean, mean, and battle-ready",
                        "ph": "/liːn miːn ænd ˈbætl ˈredi/",
                        "pos": "idiom",
                        "mean": "精悍、强劲、随时应战（形容高效且准备充分）",
                        "ex": "After months of training, the new team was lean, mean, and battle-ready."
                    },
                    {
                        "word": "throw someone into the deep end",
                        "ph": "/θroʊ ˈsʌmwʌn ˈɪntuː ðə diːp end/",
                        "pos": "idiom",
                        "mean": "让某人直接面对困境（以快速学习）",
                        "ex": "On his first day, the new chef was thrown into the deep end during the dinner rush."
                    },
                    {
                        "word": "afloat",
                        "ph": "/əˈfloʊt/",
                        "pos": "adv",
                        "mean": "漂浮着；（经济上）维持下去",
                        "ex": "The company is struggling to stay afloat during the recession."
                    }
                ],
                "gram": [
                    {
                        "id": "em_dash_for_apposition",
                        "name": "破折号（用于同位语或解释）",
                        "category": "P",
                        "level": "B2",
                        "pattern": "Clause — explanation.",
                        "components": [
                            {
                                "slot": "—",
                                "role": "破折号",
                                "pos": [
                                    "punc"
                                ]
                            }
                        ],
                        "function": "用于引出一个补充说明或解释，比逗号更具强调意味。'...for learners — lean, mean, and battle-ready' 破折号后面的部分是对 'built by learners, for learners' 理念的进一步阐释，强调了其高效和实战性。",
                        "example": {
                            "en": "He had one goal in mind — to win the championship.",
                            "cn": "他心中只有一个目标——赢得冠军。"
                        },
                        "variants": null,
                        "constraints": "是一种在非正式和正式写作中都可使用的标点，用于增强节奏和清晰度。"
                    }
                ]
            },
            {
                "id": 3,
                "en": "Real talk, real results: No sugarcoating. GeSeed v2 hits you with real-world English — slang, idioms, spoken flow — so you stop sounding like a textbook zombie. Modular design: Pick your path. Whether you’re grinding basic vocab or ready to spit bars in English rap style, GeSeed v2 adapts. Fast feedback loop: The quicker you try, the quicker you learn. GeSeed v2 is built to keep you engaged, keep you corrected, keep you moving.",
                "cn": "真实对话，真实效果：不加粉饰。GeSeed v2 用真实世界的英语冲击你——俚语、习语、口语流——让你不再听起来像个教科书僵尸。模块化设计：选择你的路径。无论你是在死磕基础词汇，还是准备用英语说唱风格秀技，GeSeed v2 都能适应。快速反馈循环：你尝试得越快，学得就越快。GeSeed v2 的构建就是为了让你保持投入，让你得到纠正，让你不断前进。",
                "vocab": [
                    {
                        "word": "real talk",
                        "ph": "/riːəl tɔːk/",
                        "pos": "phr",
                        "mean": "（俚语）实话实说；真实对话",
                        "ex": "Okay, real talk: we need to finish this project tonight."
                    },
                    {
                        "word": "sugarcoat",
                        "ph": "/ˈʃʊɡərkoʊt/",
                        "pos": "v",
                        "mean": "粉饰；美化",
                        "ex": "Don't sugarcoat the bad news; just tell me what happened."
                    },
                    {
                        "word": "textbook zombie",
                        "ph": "/ˈtekstbʊk ˈzɒmbi/",
                        "pos": "n phr",
                        "mean": "教科书僵尸（指说话生硬、不自然的人）",
                        "ex": "His formal language made him sound like a textbook zombie in a casual conversation."
                    },
                    {
                        "word": "modular",
                        "ph": "/ˈmɒdʒələr/",
                        "pos": "adj",
                        "mean": "模块化的",
                        "ex": "The new software has a modular design, allowing users to add features as they need them."
                    },
                    {
                        "word": "grind",
                        "ph": "/ɡraɪnd/",
                        "pos": "v",
                        "mean": "（非正式）埋头苦干；死磕",
                        "ex": "He had to grind for weeks to prepare for the final exam."
                    },
                    {
                        "word": "spit bars",
                        "ph": "/spɪt bɑːrz/",
                        "pos": "idiom",
                        "mean": "（俚语）说唱；秀说唱技巧",
                        "ex": "The rapper got on stage and started to spit bars."
                    },
                    {
                        "word": "feedback loop",
                        "ph": "/ˈfiːdbæk luːp/",
                        "pos": "n phr",
                        "mean": "反馈循环",
                        "ex": "Good communication creates a positive feedback loop within the team."
                    }
                ],
                "gram": [
                    {
                        "id": "parallelism_in_a_list_keep_you",
                        "name": "列表中的平行结构",
                        "category": "S",
                        "level": "B2",
                        "pattern": "Verb + Object + VERB-ing, Verb + Object + VERB-ing, Verb + Object + VERB-ing",
                        "components": [
                            {
                                "slot": "Verb + Object + VERB-ing",
                                "role": "平行结构单位",
                                "pos": [
                                    "phr"
                                ]
                            }
                        ],
                        "function": "通过重复 'keep you + V-ing' 的结构（'keep you engaged, keep you corrected, keep you moving'），作者创造了一种强有力的、富有节奏感的排比句，强调了该学习引擎持续不断地推动用户前进的核心功能。",
                        "example": {
                            "en": "A good coach will push you, challenge you, and support you.",
                            "cn": "一个好教练会推动你、挑战你、并支持你。"
                        },
                        "variants": null,
                        "constraints": "平行结构中的各项应在语法上保持一致。"
                    }
                ]
            },
            {
                "id": 4,
                "en": "A slick UI at the labs that puts you in the driver’s seat. Structured modules: each designed to level you up in listening, speaking, writing, and rap‑flow—yeah, we go there. Flexibility: Use it anytime. You're a delivery driver with free modules waiting. Smoke break? Open GeSeed. Idle time? Open GeSeed. Zero excuses: Pocket‑friendly, no fancy gear required, just you and your will to level up.",
                "cn": "实验室里流畅的用户界面，让你掌控一切。结构化的模块：每个都旨在提升你的听力、口语、写作和说唱节奏感——是的，我们就是这么硬核。灵活性：随时使用。你是一名有免费模块等着你的外卖司机。抽烟休息？打开GeSeed。空闲时间？打开GeSeed。零借口：价格亲民，无需花哨装备，只需要你和一颗想升级的心。",
                "vocab": [
                    {
                        "word": "UI",
                        "ph": "/ˌjuːˈaɪ/",
                        "pos": "n",
                        "mean": "用户界面（User Interface）",
                        "ex": "A good UI should be intuitive and easy to navigate."
                    },
                    {
                        "word": "in the driver's seat",
                        "ph": "/ɪn ðə ˈdraɪvərz siːt/",
                        "pos": "idiom",
                        "mean": "掌控一切",
                        "ex": "With her new promotion, she is now in the driver's seat of the entire project."
                    },
                    {
                        "word": "level up",
                        "ph": "/ˈlevl ʌp/",
                        "pos": "phr v",
                        "mean": "升级",
                        "ex": "He played the game for hours to level up his character."
                    },
                    {
                        "word": "go there",
                        "ph": "/ɡoʊ ðer/",
                        "pos": "idiom",
                        "mean": "（非正式）触及（某个大胆或禁忌的话题）",
                        "ex": "I can't believe you asked him about his divorce. You really had to go there?"
                    },
                    {
                        "word": "idle time",
                        "ph": "/ˈaɪdl taɪm/",
                        "pos": "n phr",
                        "mean": "空闲时间",
                        "ex": "He uses his idle time on the commute to listen to podcasts."
                    },
                    {
                        "word": "zero excuses",
                        "ph": "/ˈzɪəroʊ ɪkˈskjuːsɪz/",
                        "pos": "phr",
                        "mean": "零借口",
                        "ex": "The coach demanded 100% effort from the team, zero excuses."
                    },
                    {
                        "word": "pocket-friendly",
                        "ph": "/ˈpɒkɪt ˈfrendli/",
                        "pos": "adj",
                        "mean": "价格亲民的",
                        "ex": "They offer several pocket-friendly options on their menu."
                    },
                    {
                        "word": "fancy gear",
                        "ph": "/ˈfænsi ɡɪər/",
                        "pos": "n phr",
                        "mean": "花哨的装备",
                        "ex": "You don't need any fancy gear to start running; just a good pair of shoes."
                    }
                ],
                "gram": [
                    {
                        "id": "use_of_elliptical_questions",
                        "name": "省略问句的使用",
                        "category": "R",
                        "level": "B2",
                        "pattern": "Noun + ?",
                        "components": [
                            {
                                "slot": "Noun?",
                                "role": "省略问句",
                                "pos": [
                                    "n phr"
                                ]
                            }
                        ],
                        "function": "通过使用非常简短的、省略了动词的问句（'Smoke break?', 'Idle time?'），作者创造了一种快速、直接、与读者对话的节奏。这种手法模仿了内心的自问自答，并立即给出解决方案（'Open GeSeed.'），有力地强调了产品的便捷性和随时可用的特点。",
                        "example": {
                            "en": "Need a ride? Call a taxi. Hungry? Order some food.",
                            "cn": "需要搭车？叫辆出租车。饿了？点些吃的。"
                        },
                        "variants": null,
                        "constraints": "是一种在营销文案中常见的、用于创造紧凑节奏的技巧。"
                    }
                ]
            },
            {
                "id": 5,
                "en": "Head to ge32english.com/labs/GeSeed/v2. Choose your starting module — wanna nail numbers in nine languages? Yup, it's in there. Dive in, repeat, spit it out loud, make it yours. Track your mistakes, own them, then crush them. Keep going until you’re not just learning English — you’re wielding it.",
                "cn": "前往 ge32english.com/labs/GeSeed/v2。选择你的初始模块——想搞定九种语言的数字？是的，里面有。投入进去，重复，大声说出来，化为己有。追踪你的错误，直面它们，然后粉碎它们。继续前进，直到你不再只是学习英语——而是在驾驭它。",
                "vocab": [
                    {
                        "word": "head to",
                        "ph": "/hed tuː/",
                        "pos": "phr v",
                        "mean": "前往",
                        "ex": "After work, let's head to the gym."
                    },
                    {
                        "word": "wanna",
                        "ph": "/ˈwɒnə/",
                        "pos": "phr",
                        "mean": "（非正式）want to",
                        "ex": "Wanna grab a coffee later?"
                    },
                    {
                        "word": "nail",
                        "ph": "/neɪl/",
                        "pos": "v",
                        "mean": "（非正式）搞定；完美完成",
                        "ex": "She totally nailed her presentation."
                    },
                    {
                        "word": "yup",
                        "ph": "/jʌp/",
                        "pos": "int",
                        "mean": "（非正式）是的",
                        "ex": "A: 'Are you coming?' B: 'Yup!'"
                    },
                    {
                        "word": "dive in",
                        "ph": "/daɪv ɪn/",
                        "pos": "phr v",
                        "mean": "投入",
                        "ex": "Don't be afraid to just dive in and start learning."
                    },
                    {
                        "word": "spit it out",
                        "ph": "/spɪt ɪt aʊt/",
                        "pos": "phr v",
                        "mean": "说出来",
                        "ex": "He was nervous, but he finally spit it out and told her the truth."
                    },
                    {
                        "word": "own",
                        "ph": "/oʊn/",
                        "pos": "v",
                        "mean": "（非正式）直面；承担",
                        "ex": "You need to own your mistakes and learn from them."
                    },
                    {
                        "word": "crush",
                        "ph": "/krʌʃ/",
                        "pos": "v",
                        "mean": "（非正式）粉碎；彻底击败",
                        "ex": "Our team is going to crush the competition."
                    },
                    {
                        "word": "wield",
                        "ph": "/wiːld/",
                        "pos": "v",
                        "mean": "挥舞（武器）；掌握（权力、语言）",
                        "ex": "A true master can wield their skills with effortless grace."
                    }
                ],
                "gram": [
                    {
                        "id": "imperative_sequence_for_instruction",
                        "name": "用于指令的祈使句序列",
                        "category": "S",
                        "level": "B1",
                        "pattern": "A series of commands using the base form of the verb.",
                        "components": [
                            {
                                "slot": "Verb",
                                "role": "动词原形（祈使）",
                                "pos": [
                                    "v"
                                ]
                            }
                        ],
                        "function": "通过一连串简短、有力的祈使句（'Head to...', 'Choose...', 'Dive in, repeat, spit it out...', 'Track..., own..., then crush...'），作者为用户提供了一套清晰、分步的操作指南。这种结构不仅易于理解，而且充满了动感和激励性。",
                        "example": {
                            "en": "Open the box, read the instructions, and begin assembly.",
                            "cn": "打开盒子，阅读说明，然后开始组装。"
                        },
                        "variants": null,
                        "constraints": "是一种非常直接和有效的给出指令的方式。"
                    }
                ]
            },
            {
                "id": 6,
                "en": "If you’re done with fluff and ready for something that works, GeSeed v2 is your ride or die. It won’t whisper sweet motivational quotes — it’ll push you, challenge you, and make you better. No fucking bullshit. Let’s get it. See you inside, warrior.",
                "cn": "如果你受够了废话，准备好迎接真正有效的东西，GeSeed v2 就是你的死忠伙伴。它不会对你低声说些甜蜜的励志名言——它会推动你，挑战你，让你变得更好。拒绝狗屁。开干吧。回头见，勇士。",
                "vocab": [
                    {
                        "word": "be done with",
                        "ph": "/biː dʌn wɪθ/",
                        "pos": "phr",
                        "mean": "受够了；完成了",
                        "ex": "I'm so done with his excuses."
                    },
                    {
                        "word": "ride or die",
                        "ph": "/raɪd ɔːr daɪ/",
                        "pos": "n phr",
                        "mean": "（俚语）死忠伙伴；绝对忠诚的人",
                        "ex": "She's been my best friend for years; she's my ride or die."
                    },
                    {
                        "word": "motivational quote",
                        "ph": "/ˌmoʊtɪˈveɪʃənl kwoʊt/",
                        "pos": "n phr",
                        "mean": "励志名言",
                        "ex": "His office wall is covered with framed motivational quotes."
                    },
                    {
                        "word": "let's get it",
                        "ph": "/lets ɡet ɪt/",
                        "pos": "idiom",
                        "mean": "（俚语）开始吧；开干吧",
                        "ex": "The team is ready. Let's get it!"
                    },
                    {
                        "word": "warrior",
                        "ph": "/ˈwɔːriər/",
                        "pos": "n",
                        "mean": "勇士",
                        "ex": "He fought like a true warrior and never gave up."
                    }
                ],
                "gram": [
                    {
                        "id": "repetition_of_core_slogan_for_emphasis",
                        "name": "重复核心口号以加强语气",
                        "category": "R",
                        "level": "C1",
                        "pattern": "Repetition of a key phrase or slogan for closure.",
                        "components": [
                            {
                                "slot": "slogan",
                                "role": "口号",
                                "pos": [
                                    "phr"
                                ]
                            }
                        ],
                        "function": "在结尾处再次使用 'No fucking bullshit'，不仅是对开篇的呼应，更是对品牌核心承诺的最终强调。这种循环结构（cyclical structure）使信息完整、有力，并给读者留下深刻、统一的品牌印象。",
                        "example": {
                            "en": "He started his speech by saying, 'We can do better.' He ended it with the same powerful words: 'We can do better.'",
                            "cn": "他以“我们能做得更好”开始他的演讲。他又以同样有力的言辞结束：“我们能做得更好。”"
                        },
                        "variants": null,
                        "constraints": "是一种在演讲和营销中常见的、用于强化核心信息的修辞手法。"
                    }
                ]
            }
        ],
        "gram_types": {
            "S": {
                "en": "Sentence Structure",
                "cn": "句子结构"
            },
            "T": {
                "en": "Tense",
                "cn": "时态"
            },
            "C": {
                "en": "Clause",
                "cn": "从句"
            },
            "P": {
                "en": "Punctuation",
                "cn": "标点"
            },
            "W": {
                "en": "Word Form / Morphology",
                "cn": "词形变化"
            },
            "F": {
                "en": "Figurative Language",
                "cn": "修辞"
            },
            "R": {
                "en": "Rhetoric",
                "cn": "修辞手法"
            },
            "O": {
                "en": "Others",
                "cn": "其他"
            }
        },
        "pos_types": {
            "n": {
                "en": "noun",
                "cn": "名词"
            },
            "v": {
                "en": "verb",
                "cn": "动词"
            },
            "adj": {
                "en": "adjective",
                "cn": "形容词"
            },
            "adv": {
                "en": "adverb",
                "cn": "副词"
            },
            "prep": {
                "en": "preposition",
                "cn": "介词"
            },
            "conj": {
                "en": "conjunction",
                "cn": "连词"
            },
            "pron": {
                "en": "pronoun",
                "cn": "代词"
            },
            "det": {
                "en": "determiner",
                "cn": "限定词"
            },
            "int": {
                "en": "interjection",
                "cn": "感叹词"
            },
            "phr": {
                "en": "phrase",
                "cn": "短语"
            },
            "phr v": {
                "en": "phrasal verb",
                "cn": "动词短语"
            },
            "n phr": {
                "en": "noun phrase",
                "cn": "名词短语"
            },
            "adj phr": {
                "en": "adjective phrase",
                "cn": "形容词短语"
            },
            "modal v": {
                "en": "modal verb",
                "cn": "情态动词"
            },
            "idiom": {
                "en": "idiom",
                "cn": "习语"
            },
            "S": {
                "en": "sentence",
                "cn": "句子"
            }
        }
    }


];