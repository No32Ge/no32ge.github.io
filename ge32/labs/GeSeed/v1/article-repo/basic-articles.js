// articles.js
window.externalArticles = [
    {
  "id": "survive_heat_death_full_detailed",
  "title": "How to Survive the Heat Death of the Universe",
  "info": {
    "author": "Kurzgesagt – In a Nutshell",
    "source": "YouTube Video Script",
    "level": "C1",
    "tags": ["cosmology", "futurism", "physics", "consciousness", "science"],
    "link": "https://www.youtube.com/watch?v=Qam5pXbQkA"
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
      "en": "Can we survive the heat death of the universe? One day, the last star will die, galaxies will dissolve, and black holes will evaporate. The cosmos will become a forever-expanding, empty void where nothing happens, forever. A place without life, purpose, or meaning.",
      "cn": "我们能在宇宙的热寂中幸存下来吗？终有一天，最后一颗恒星将会熄灭，星系将会消散，黑洞将会蒸发。宇宙将变成一个永远膨胀、空无一物的虚空，在那里，永远不会有任何事情发生。一个没有生命、目标或意义的地方。",
      "vocab": [
        { "word": "heat death", "ph": "/hiːt deθ/", "pos": "phr", "mean": "热寂" },
        { "word": "dissolve", "ph": "/dɪˈzɒlv/", "pos": "v", "mean": "消散；溶解" },
        { "word": "evaporate", "ph": "/ɪˈvæpəreɪt/", "pos": "v", "mean": "蒸发；消失" }
      ],
      "gram": [
        {
          "id": "defining_relative_clause",
          "name": "Defining Relative Clause (限定性定语从句)",
          "category": "C",
          "level": "B1",
          "pattern": "NOUN + where + CLAUSE (SUBJ + VERB...)",
          "components": [
            { "slot": "NOUN", "role": "先行词 (Antecedent)", "pos": ["n"], "desc": "被从句修饰的名词，此处为 'void'。" },
            { "slot": "where", "role": "关系副词 (Relative Adverb)", "pos": ["adv"], "desc": "指代地点，在从句中作地点状语，相当于 'in which'。" },
            { "slot": "CLAUSE", "role": "定语从句", "pos": ["S"], "desc": "用于修饰和限定先行词 'void' 的具体内容。" }
          ],
          "function": "用于提供必要信息来明确先行词的身份或范围，缺少该从句则句意不清。此处 'where nothing happens, forever' 定义了这是一个什么样的 'void'。",
          "example": { "en": "This is the house where I grew up.", "cn": "这就是我长大的那所房子。" },
          "variants": [
            "NOUN + which/that + ... (指代事物)",
            "NOUN + who + ... (指代人)",
            "NOUN + when + ... (指代时间)"
          ],
          "constraints": "限定性定语从句前通常没有逗号，它与先行词紧密相连，不可分割。"
        }
      ]
    },
    {
      "id": 2,
      "en": "Lame and depressing. But there might be a loophole in the laws of physics for a future civilization to survive the death of everything, and go on having fun and internet arguments for Googles of years, maybe even forever.",
      "cn": "真是无聊又令人沮丧。但在物理定律中，或许存在一个漏洞，能让未来的文明在万物寂灭后幸存下来，并继续享受乐趣、进行网络辩论长达古戈尔年，甚至可能直到永远。",
      "vocab": [
        { "word": "loophole", "ph": "/ˈluːphəʊl/", "pos": "n", "mean": "漏洞；空子" },
        { "word": "go on", "ph": "/ɡəʊ ɒn/", "pos": "phr", "mean": "继续" }
      ],
      "gram": [
        {
          "id": "infinitive_of_purpose_with_logical_subject",
          "name": "Infinitive of Purpose with 'for' (带逻辑主语的目的不定式)",
          "category": "C",
          "level": "B2",
          "pattern": "NOUN + for + LOGICAL_SUBJ + to-infinitive",
          "components": [
            { "slot": "NOUN", "role": "被说明目的的名词", "pos": ["n"], "desc": "此处为 'loophole'。" },
            { "slot": "for + LOGICAL_SUBJ", "role": "不定式的逻辑主语", "pos": ["phr"], "desc": "指明不定式动作的执行者，此处为 'a future civilization'。" },
            { "slot": "to-infinitive", "role": "目的状语", "pos": ["phr"], "desc": "说明前面名词的目的或功能，此处为 'to survive... and go on...'" }
          ],
          "function": "详细说明某事物的目的，并明确指出该目的的实现者（即不定式动作的执行者）。它比简单的目的不定式提供了更丰富的信息。",
          "example": { "en": "He bought some flowers for his wife to apologize.", "cn": "他买了一些花给他的妻子以表示歉意。" },
          "variants": [],
          "constraints": "逻辑主语 'for' 后面的名词或代词是 'to do' 这个动作的发出者。"
        }
      ]
    },
    {
      "id": 3,
      "en": "To explain how this works, we need to go through a few steps. So strap in if you want consciousness to live forever.",
      "cn": "要解释这是如何运作的，我们需要经历几个步骤。所以，如果你想让意识永存，就请系好安全带。",
      "vocab": [
        { "word": "strap in", "ph": "/stræp ɪn/", "pos": "phr", "mean": "系好安全带 (比喻做好准备)" },
        { "word": "consciousness", "ph": "/ˈkɒnʃəsnəs/", "pos": "n", "mean": "意识；知觉" }
      ],
      "gram": [
        {
          "id": "infinitive_clause_as_adverbial_of_purpose",
          "name": "Infinitive Clause as Adverbial of Purpose (不定式从句作目的状语)",
          "category": "C",
          "level": "B1",
          "pattern": "To-infinitive Clause, + Main Clause",
          "components": [
            { "slot": "To-infinitive Clause", "role": "目的状语从句", "pos": ["S"], "desc": "由不定式引导，说明主句动作的目的。此处为 'To explain how this works'。" },
            { "slot": "Main Clause", "role": "主句", "pos": ["S"], "desc": "句子核心，描述为达到该目的而采取的行动。此处为 'we need to go through a few steps'。" }
          ],
          "function": "置于句首以强调动作的目的，回答“为了什么？”(Why?) 的问题。这是一种常见的正式和书面语用法。",
          "example": { "en": "To improve his English, he reads a newspaper every day.", "cn": "为了提高他的英语水平，他每天都读报纸。" },
          "variants": [
            "Main Clause + in order to + Verb...",
            "Main Clause + so as to + Verb..."
          ],
          "constraints": "当不定式作目的状语置于句首时，通常用逗号与主句隔开。"
        }
      ]
    },
    {
      "id": 4,
      "en": "Let's travel 100 trillion years into the future when the last stars are about to die and the cosmos starts turning dark forever. Here in this dying universe, we find the Noxons, the last civilization still alive. Compared to them, we're cave dwellers. They've solved physics and can do things we can only dream of.",
      "cn": "让我们穿越到100万亿年后，那时最后一批恒星即将熄灭，宇宙开始永久地陷入黑暗。在这个垂死的宇宙中，我们找到了诺克森人，最后一个仍然存活的文明。与他们相比，我们简直是穴居人。他们已经解开了物理学，能做我们只能梦想的事情。",
      "vocab": [
        { "word": "be about to do", "ph": "", "pos": "phr", "mean": "即将做某事" },
        { "word": "cave dwellers", "ph": "/keɪv ˈdweləz/", "pos": "phr", "mean": "穴居人；原始人" }
      ],
      "gram": [
        {
          "id": "object_contact_clause",
          "name": "Object Contact Clause (宾语接触从句)",
          "category": "C",
          "level": "B2",
          "pattern": "NOUN + SUBJ + VERB (+ PREP)",
          "components": [
            { "slot": "NOUN", "role": "先行词 (Antecedent)", "pos": ["n"], "desc": "被从句修饰的名词，此处为 'things'。" },
            { "slot": "SUBJ + VERB (+ PREP)", "role": "接触从句", "pos": ["S"], "desc": "省略了关系代词的定语从句，此处为 'we can only dream of'。" }
          ],
          "function": "这是一种省略了关系代词 (that/which) 的限定性定语从句。当关系代词在从句中作宾语（动词宾语或介词宾语）时，可以省略，使句子更简洁流畅。此处省略的 'that' 是介词 'of' 的宾语。",
          "example": { "en": "The book (that) I'm reading is fascinating.", "cn": "我正在读的那本书很吸引人。" },
          "variants": [],
          "constraints": "只有当关系代词在从句中作宾语时才能省略。如果作主语，则不能省略 (e.g., 'the man who lives here' 不能省略 'who')。"
        }
      ]
    },
    {
      "id": 5,
      "en": "The Noxons like being alive and don't want to vanish with the last stars. So they're enacting the plan to keep consciousness around forever.",
      "cn": "诺克森人喜欢活着，不想随着最后一批恒星消失。所以他们正在实施一个计划，让意识永存。",
      "vocab": [
        { "word": "vanish", "ph": "/ˈvænɪʃ/", "pos": "v", "mean": "消失" },
        { "word": "enact", "ph": "/ɪˈnækt/", "pos": "v", "mean": "实施；颁布" }
      ],
      "gram": [
        {
          "id": "catenative_verbs",
          "name": "Catenative Verbs (连锁动词)",
          "category": "W",
          "level": "B2",
          "pattern": "VERB_1 + VERB_2 (gerund or infinitive)",
          "components": [
            { "slot": "VERB_1", "role": "主导动词 (Controlling Verb)", "pos": ["v"], "desc": "决定其后动词形式的动词，如 'like', 'want'。" },
            { "slot": "VERB_2", "role": "连锁动词 (Catenated Verb)", "pos": ["v"], "desc": "其形式（动名词或不定式）由VERB_1决定，如 'being', 'to vanish'。" }
          ],
          "function": "连锁动词指一个动词后面紧跟另一个动词（非助动词），形成一个动词链。不同的主导动词要求其后的动词采用特定形式。'like' 后面常跟动名词 ('being')，而 'want' 后面必须跟不定式 ('to vanish')。",
          "example": { "en": "I enjoy swimming, but I decided to learn to ski.", "cn": "我喜欢游泳，但我决定去学滑雪。" },
          "variants": [
            "Verb + gerund (e.g., avoid, finish, suggest)",
            "Verb + to-infinitive (e.g., hope, need, promise)"
          ],
          "constraints": "必须记住哪些动词后面跟哪种形式，有些动词（如 'stop', 'try'）后面跟两种形式但意义不同。"
        }
      ]
    },
    {
      "id": 8,
      "en": "In a nutshell, the idea is that the lower your temperature, the less energy it takes to do something.",
      "cn": "简而言之，这个想法就是你的温度越低，做某件事所需的能量就越少。",
      "vocab": [
        { "word": "in a nutshell", "ph": "/ɪn ə ˈnʌtʃel/", "pos": "phr", "mean": "简而言之" }
      ],
      "gram": [
        {
          "id": "the_the_comparative_correlative",
          "name": "The... the... Correlative Comparative Structure (The... the... 关联比较结构)",
          "category": "S",
          "level": "B2",
          "pattern": "The + COMPARATIVE_1, the + COMPARATIVE_2",
          "components": [
            { "slot": "The + COMPARATIVE_1", "role": "从句/条件状语", "pos": ["phr"], "desc": "描述一个变化的条件或原因，此处为 'the lower your temperature'。" },
            { "slot": "the + COMPARATIVE_2", "role": "主句/结果", "pos": ["phr"], "desc": "描述随之产生的结果，此处为 'the less energy it takes...'" }
          ],
          "function": "用于表达两个变量之间直接的、成比例的关联，即“越……，就越……”。它强调了两个变化之间的因果或相关关系，结构紧凑且有力。",
          "example": { "en": "The harder you work, the more you achieve.", "cn": "你工作越努力，成就就越多。" },
          "variants": [],
          "constraints": "两个部分都必须以定冠词 'the' 开头，后面紧跟形容词或副词的比较级。两个部分之间用逗号隔开。"
        }
      ]
    },
    {
      "id": 9,
      "en": "If your brain worked at colder temperatures, say 155 Kelvin instead of 310, a few things would change.",
      "cn": "如果你的大脑在更低的温度下工作，比如说155K而不是310K，一些事情就会改变。",
      "vocab": [
        { "word": "Kelvin", "ph": "/ˈkelvɪn/", "pos": "n", "mean": "开尔文 (温度单位)" },
        { "word": "in return", "ph": "/ɪn rɪˈtɜːn/", "pos": "phr", "mean": "作为回报；作为交换" }
      ],
      "gram": [
        {
          "id": "second_conditional",
          "name": "Second Conditional (第二类条件句)",
          "category": "C",
          "level": "B2",
          "pattern": "If + SUBJ + Past Simple, SUBJ + would/could/might + Base Verb",
          "components": [
            { "slot": "If + SUBJ + Past Simple", "role": "条件从句 (If-Clause)", "pos": ["S"], "desc": "提出一个与现在或未来事实相反的、不可能或不真实的假设。此处 'worked' 使用过去时表示虚拟语气。" },
            { "slot": "SUBJ + would... + Base Verb", "role": "主句 (Main Clause)", "pos": ["S"], "desc": "描述在该假设条件下可能出现的结果。'would change' 表示推测性的结果。" }
          ],
          "function": "用于谈论非真实的、想象的或不大可能发生的情况及其可能的结果。它常用于提出建议、进行假设和探讨可能性。",
          "example": { "en": "If I had a million dollars, I would travel the world.", "cn": "如果我有一百万美元，我就会环游世界。" },
          "variants": [
            "If I were you... (用于提建议)",
            "主句可以使用 'could' (可以) 或 'might' (或许会)。"
          ],
          "constraints": "条件从句中的动词使用一般过去时（be动词对所有人称都用 'were' 是更正式的用法），主句使用 'would/could/might' + 动词原形。"
        }
      ]
    },
    {
      "id": 12,
      "en": "Nothing highlights this issue more than our modern media landscape.",
      "cn": "没有什么比我们现代的媒体环境更能凸显这个问题了。",
      "vocab": [
        { "word": "prone to", "ph": "/prəʊn tuː/", "pos": "phr", "mean": "易于...的；有...倾向的" },
        { "word": "bias", "ph": "/ˈbaɪəs/", "pos": "n", "mean": "偏见" }
      ],
      "gram": [
        {
          "id": "negative_comparative_for_superlative_effect",
          "name": "Negative Comparative for Superlative Effect (用否定比较级表达最高级含义)",
          "category": "S",
          "level": "C1",
          "pattern": "Nothing + VERB + ... + more than + NOUN_PHRASE",
          "components": [
            { "slot": "Nothing", "role": "否定主语", "pos": ["pron"], "desc": "作为句子的起点，建立一个绝对的否定前提。" },
            { "slot": "VERB", "role": "动词", "pos": ["v"], "desc": "描述一个动作或状态，此处为 'highlights'。" },
            { "slot": "more than", "role": "比较结构", "pos": ["phr"], "desc": "引入比较对象。" },
            { "slot": "NOUN_PHRASE", "role": "比较对象", "pos": ["phr"], "desc": "被强调为最突出的例子，此处为 'our modern media landscape'。" }
          ],
          "function": "这是一种非常有力且有文采的修辞手法，通过否定任何其他事物能达到同等程度，来反衬出比较对象是“最……”的。它比直接使用最高级 (e.g., 'The most... thing is...') 语气更强，更具说服力。",
          "example": { "en": "Nothing is more important than your health.", "cn": "没有什么比你的健康更重要了。(即：你的健康是最重要的。)" },
          "variants": [
            "Nobody/No one + ... + more than + PERSON"
          ],
          "constraints": "句首必须使用绝对否定词，如 'Nothing', 'Nobody', 'No one'。"
        }
      ]
    },
    {
      "id": 26,
      "en": "They've become so slow that a simple thought takes a trillion years.",
      "cn": "他们已经变得如此之慢，以至于一个简单的想法需要一万亿年。",
      "vocab": [
        { "word": "hibernating", "ph": "/ˈhaɪbəneɪtɪŋ/", "pos": "v", "mean": "休眠（现在分词）" },
        { "word": "fluid", "ph": "/ˈfluːɪd/", "pos": "adj", "mean": "流畅的" }
      ],
      "gram": [
        {
          "id": "adverbial_clause_of_result_so_that",
          "name": "Adverbial Clause of Result (so... that...) (so...that...结果状语从句)",
          "category": "C",
          "level": "B1",
          "pattern": "MAIN_CLAUSE (so + ADJ/ADV) + that + RESULT_CLAUSE",
          "components": [
            { "slot": "MAIN_CLAUSE", "role": "主句", "pos": ["S"], "desc": "描述原因或程度，其中 'so' 是一个强度副词，修饰形容词或副词。此处为 'They've become so slow'。" },
            { "slot": "that", "role": "从属连词", "pos": ["conj"], "desc": "引导结果状语从句。" },
            { "slot": "RESULT_CLAUSE", "role": "结果从句", "pos": ["S"], "desc": "描述由主句原因所导致的结果。此处为 'a simple thought takes a trillion years'。" }
          ],
          "function": "用于连接原因和结果，强调原因的程度之深以至于引发了某个特定的结果，即“如此……以至于……”。",
          "example": { "en": "The coffee was so hot that I burned my tongue.", "cn": "咖啡太烫了，以至于我烫伤了舌头。" },
          "variants": [
            "such + (a/an) + (ADJ) + NOUN + that + ... (e.g., It was such a hot day that we stayed indoors.)"
          ],
          "constraints": "'so' 修饰形容词或副词，而 'such' 修饰名词（短语）。"
        }
      ]
    },
    {
      "id": 29,
      "en": "Whether Dyson's cold thoughts can make you live forever depends on one thing.",
      "cn": "戴森的“冰冷思想”能否让你永生取决于一件事。",
      "vocab": [
        { "word": "depend on", "ph": "/dɪˈpend ɒn/", "pos": "phr", "mean": "取决于" },
        { "word": "hit a limit", "ph": "/hɪt ə ˈlɪmɪt/", "pos": "phr", "mean": "达到极限" }
      ],
      "gram": [
        {
          "id": "nominal_clause_as_subject",
          "name": "Nominal 'Whether' Clause as Subject ('Whether'名词性从句作主语)",
          "category": "C",
          "level": "C1",
          "pattern": "Whether-CLAUSE + PREDICATE",
          "components": [
            { "slot": "Whether-CLAUSE", "role": "主语从句 (Subject Clause)", "pos": ["S"], "desc": "由 'whether' 引导，提出一个不确定的或二选一的问题，整个从句在句子中充当主语。此处为 'Whether Dyson's...forever'。" },
            { "slot": "PREDICATE", "role": "谓语", "pos": ["phr"], "desc": "句子的谓语部分，描述主语从句的情况。此处为 'depends on one thing'。" }
          ],
          "function": "将一个完整的问题或不确定性概念（“某事是否……”）打包成一个名词性成分，使其能够在句子中充当主语。这使得表达复杂的、抽象的概念成为可能。",
          "example": { "en": "Whether the project will succeed is still unknown.", "cn": "这个项目是否会成功仍然未知。" },
          "variants": [
            "Wh-clauses (what, why, how, etc.)也可以作主语。 (e.g., What he said is true.)",
            "That-clauses 也可以作主语，但常用于 'It is... that...' 结构中。"
          ],
          "constraints": "当名词性从句作主语时，谓语动词通常使用第三人称单数形式（如 'depends', 'is'）。"
        }
      ]
    },
    {
      "id": 32,
      "en": "And it would mean that life and consciousness aren't a brief accident in cosmic history, but the final chapter of existence itself, giving the universe meaning, purpose, and hope.",
      "cn": "而这将意味着生命和意识并非宇宙历史中的短暂意外，而是存在本身的最终篇章，赋予宇宙意义、目标和希望。",
      "vocab": [
        { "word": "brief", "ph": "/briːf/", "pos": "adj", "mean": "短暂的" },
        { "word": "chapter", "ph": "/ˈtʃæptər/", "pos": "n", "mean": "篇章" }
      ],
      "gram": [
        {
          "id": "present_participle_clause_as_result",
          "name": "Present Participle Clause expressing Result (现在分词从句表结果)",
          "category": "C",
          "level": "C1",
          "pattern": "MAIN_CLAUSE, + Verb-ing...",
          "components": [
            { "slot": "MAIN_CLAUSE", "role": "主句", "pos": ["S"], "desc": "描述一个动作或状态。此处为 'life and consciousness aren't..., but the final chapter...'" },
            { "slot": "Verb-ing...", "role": "伴随结果状语", "pos": ["phr"], "desc": "由现在分词引导的短语，描述由主句动作自然而然产生的结果。此处为 'giving the universe meaning...'" }
          ],
          "function": "用于连接一个动作和它的直接、必然结果，使得句子结构更紧凑、逻辑关系更流畅。它表示第二个动作（分词部分）是第一个动作（主句）的延伸或结果，相当于 'and as a result, it gives...'。",
          "example": { "en": "The bomb exploded, destroying the building and killing two people.", "cn": "炸弹爆炸了，摧毁了建筑并导致两人死亡。" },
          "variants": [],
          "constraints": "分词短语的逻辑主语通常必须是主句的主语。此处逻辑主语是 'the final chapter of existence itself'。"
        }
      ]
    }
  ],
  "note": "This text explores a fascinating, albeit speculative, solution to the ultimate end of the universe, based on the physical principle that computation requires less energy at lower temperatures. It uses vivid imagery, scientific concepts, and a conversational tone to guide the reader through a complex hypothesis, turning a story of cosmic death into one of hope and meaning. The included sponsor message and channel updates are seamlessly integrated into the narrative flow."
}
];
