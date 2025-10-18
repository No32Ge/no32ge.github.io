// articles.js
const articles = [
    {
  "id": "geseed_manual",
  "title": "How to Use GeSeed",
  "info": {
    "author": "GeSeed System",
    "source": "User Guide",
    "level": "B1-B2",
    "tags": [
      "manual",
      "note-taking",
      "privacy"
    ],
    "link": "https://example.com/geseed"
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
      "en": "GeSeed is a local note-loading tool. It helps you collect, edit, and save text without sending anything to the cloud.",
      "cn": "GeSeed 是一个本地加载笔记工具。它帮助你收集、编辑并保存文本，而无需上传任何数据到云端。",
      "vocab": [
        {
          "word": "local",
          "ph": "/ˈləʊkəl/",
          "mean": "本地的",
          "ex": "Your notes are stored locally on your device."
        },
        {
          "word": "cloud",
          "ph": "/klaʊd/",
          "mean": "云端",
          "ex": "No information is sent to the cloud."
        }
      ],
      "gram": [
        {
          "rule": "without + -ing",
          "cat": "C",
          "desc": "表示‘不通过……而……’的方式。",
          "ex": "He finished the work without asking for help."
        }
      ]
    },
    {
      "id": 2,
      "en": "You can import any article or note by clicking the import button. The system will instantly load your content into the reading area.",
      "cn": "你可以点击导入按钮加载任意文章或笔记，系统会立即将内容载入阅读区。",
      "vocab": [
        {
          "word": "import",
          "ph": "/ˈɪmpɔːt/",
          "mean": "导入",
          "ex": "Click the import button to load your file."
        },
        {
          "word": "instantly",
          "ph": "/ˈɪnstəntli/",
          "mean": "立即地",
          "ex": "The system responds instantly to your action."
        }
      ],
      "gram": [
        {
          "rule": "by + -ing",
          "cat": "C",
          "desc": "用于表示实现某个动作的方式。",
          "ex": "You can open the menu by clicking here."
        }
      ]
    },
    {
      "id": 3,
      "en": "Click any word to view its meaning, add new vocabulary, or edit existing notes. All data stays on your device only.",
      "cn": "点击任意单词可查看释义、添加新词或编辑已有笔记。所有数据仅保存在你的设备中。",
      "vocab": [
        {
          "word": "meaning",
          "ph": "/ˈmiːnɪŋ/",
          "mean": "含义",
          "ex": "Click a word to see its meaning."
        },
        {
          "word": "existing",
          "ph": "/ɪɡˈzɪstɪŋ/",
          "mean": "现有的",
          "ex": "You can edit your existing notes anytime."
        }
      ],
      "gram": [
        {
          "rule": "imperative + purpose clause",
          "cat": "S",
          "desc": "用祈使句指令后接不定式目的从句，表达操作结果。",
          "ex": "Click here to save your progress."
        }
      ]
    },
    {
      "id": 4,
      "en": "Use the floating ball to switch pages, open settings, or export your notes. Exporting creates a JSON file that you fully own.",
      "cn": "使用悬浮球可以切换页面、打开设置或导出笔记。导出功能会生成一个 JSON 文件，完全属于你。",
      "vocab": [
        {
          "word": "floating ball",
          "ph": "/ˈfləʊtɪŋ bɔːl/",
          "mean": "悬浮球",
          "ex": "Tap the floating ball to open the menu."
        },
        {
          "word": "export",
          "ph": "/ˈekspɔːt/",
          "mean": "导出",
          "ex": "Export your notes to keep a backup copy."
        }
      ],
      "gram": [
        {
          "rule": "present participle for result",
          "cat": "T",
          "desc": "用现在分词表示附带结果。",
          "ex": "Clicking this button saves your progress."
        }
      ]
    },
    {
      "id": 5,
      "en": "You can add a new paragraph, vocabulary, or grammar note at any time through the modal form. Every edit is saved automatically.",
      "cn": "你可以通过弹出表单随时添加新段落、单词或语法笔记。每一次编辑都会自动保存。",
      "vocab": [
        {
          "word": "modal form",
          "ph": "/ˈməʊdəl fɔːm/",
          "mean": "模态表单（弹窗）",
          "ex": "Fill in the modal form to add a new paragraph."
        },
        {
          "word": "automatically",
          "ph": "/ˌɔːtəˈmætɪkli/",
          "mean": "自动地",
          "ex": "Your progress is saved automatically."
        }
      ],
      "gram": [
        {
          "rule": "at any time",
          "cat": "O",
          "desc": "表示在任意时刻皆可发生的动作。",
          "ex": "You can edit your notes at any time."
        }
      ]
    },
    {
      "id": 6,
      "en": "GeSeed is free, private, and fully controllable. It is designed to let you think, write, and build your own knowledge system — offline.",
      "cn": "GeSeed 完全免费、私密且可控。它旨在让你离线思考、记录并构建属于你自己的知识系统。",
      "vocab": [
        {
          "word": "controllable",
          "ph": "/kənˈtrəʊləbl/",
          "mean": "可控制的",
          "ex": "Every part of the system is controllable by you."
        },
        {
          "word": "offline",
          "ph": "/ˈɒflaɪn/",
          "mean": "离线的",
          "ex": "You can use this app offline without connection."
        }
      ],
      "gram": [
        {
          "rule": "list of adjectives",
          "cat": "S",
          "desc": "多个形容词并列，用于描述系统特性。",
          "ex": "The app is fast, simple, and safe."
        }
      ]
    }
  ],
  "note": "No login, no ads, no tracking — GeSeed belongs only to you."
}
    // ... 更多文章
];

// 同时支持CommonJS和ES6模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = articles;
} else {
    window.articlesData = articles;
}
