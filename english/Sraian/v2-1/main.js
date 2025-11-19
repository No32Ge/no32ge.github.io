
onCustomEvent("doSomething", ({ doWhat, who }) => {
    console.log("开始运行函数");
    if (typeof doWhat === "function") {
        doWhat(who);
    }
});
import { TextAnalyzer } from './js/textAnalyzer.js';
import { initMenuDev } from "./component/floatingMenu.js";
import { importArticlesModal } from "./component/importArticlesFromFile.js"
import { addGrammarModal } from "./component/addGrammer.js"
import { buildCatalog } from "./component/catalog.js";
import { addArticlesFromJs } from "./component/importArticleFromJs.js";
import { addVocabModal } from "./component/addVocab.js";
import { exportModalElement } from "./component/exportModal.js";
import { getLibraryItemWithChapters } from "./res/articles/importArticles.js";
import { initProgress } from "./component/progress.js";
import FloatingBall from "./component/common/floatingBall.js"

import getLibraryMetaTest from "./test.js";

const testData = await getLibraryItemWithChapters("http://127.0.0.1:8000/ge32/labs/GeSeed/library/index/libraryIndex.json","wonder",(done,tol,url,res)=>{
    document.dispatchEvent(new CustomEvent('initStep', { detail: `加载文章数据 <br>共(${done}/${tol}) ${url} ${res.ok ? "加载成功" : "<span style = 'color:red;'>res.error.errorMessage</span>"}` }));
})
console.log("测试数据",testData);
getLibraryMetaTest();

function initNode() {
    document.dispatchEvent(new CustomEvent('initStep', { detail: "开始初始化" }));
    buildCatalog?.();
    const menu = initMenuDev?.(null)
    document.body.appendChild(exportModalElement);
    document.body.appendChild(addArticlesFromJs)
    document.body.appendChild(addGrammarModal);
    document.body.appendChild(importArticlesModal);
    document.body.appendChild(addVocabModal);
    // 创建悬浮球实例
    const floatingBall = new FloatingBall({
        initialX: window.innerWidth - 80,
        initialY: window.innerHeight / 3,
        size: 60,
        color: '#3498db',
        icon: '𝔾',
        clickBack: function (x, y, set) {
            set(menu);
            console.log("点击");
            menu.classList.toggle("show");
            menu.style.top = y + 'px';
            menu.style.left = x + 'px'; // 在鼠标左侧显示
        },
        dragBack: () => {
            console.log("拖动事件");
        }
    });
    document.dispatchEvent(new CustomEvent('initStep', { detail: "基本功能加载完成" }));

    document.getElementById("toggle-explanations").addEventListener('change', function () {
        appState.showExplanations = this.checked;

        // 显示/隐藏所有词汇和语法部分
        document.querySelectorAll('.vocab-list, .grammar-list').forEach(el => {
            if (appState.showExplanations) {
                el.classList.remove('hidden-content');
            } else {
                el.classList.add('hidden-content');
            }
        });
        // 更新所有切换按钮文本
        document.querySelectorAll('.section-title .toggle-btn').forEach(btn => {
            btn.textContent = appState.showExplanations ? '隐藏' : '显示';
        });
    });

    document.getElementById('article-catalog-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        console.log("点击展示目录");
        document.getElementById('article-catalog').classList.toggle('show');
        renderCatalogList();
    });

    document.dispatchEvent(new CustomEvent('initStep', { detail: "<strong>点击悬浮球</strong>运行文章" }));
}

// 多篇文章数据 - 新格式
const articlesData = [];

// 词性类型映射
const posTypes = {
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
const gramTypes = {
    "S": { "en": "Sentence Structure", "cn": "句子结构" },
    "T": { "en": "Tense", "cn": "时态" },
    "C": { "en": "Clause", "cn": "从句" },
    "P": { "en": "Punctuation", "cn": "标点" },
    "W": { "en": "Word Form / Morphology", "cn": "词形变化" },
    "O": { "en": "Others", "cn": "其他" }
};

let currentTooltipTimeout = null;



// 应用状态
const appState = {
    currentArticleId: "failure",
    showExplanations: false,
    wordDictionary: {},
    grammarRules: [],
    floatingControlPosition: {
        x: window.innerWidth - 80,
        y: window.innerHeight / 2
    },
    // 新增状态
    floatingControl: {
        isMobileLocked: false,
        originalPosition: { x: 0, y: 0 },
        targetPosition: { x: 0, y: 0 },
        isReturning: false
    }
};
const appDatas = {
    system: {
        icon: {
            svgs: {}
        },
        articles: {
            gramTypes: {},
            posTypes: {}
        }
    }
};

const useFuncs = {
    // 用来找到图标
    appGetIconSVGs(name) {
        return appDatas.system.icon.svgs[name];
    },
    // 用来设置图标
    appSetIconSVG(name, value) {
        appDatas.system.icon.svgs[name] = value;
    }
};

const app = {
    appState: appState,
    useFuncs: useFuncs,
    appDatas: appDatas
}

import { CssStyleMaker } from './js/cssMaker.js';
// 初始化svg函数
async function initSVG(from, importIcons = [], width = 16, height = 16) {
    const { loadSVGWithRetry } = await import('./js/svg.js');
    // 只保留缺失的 SVG filter功能是保留满足条件的数组
    const missingIcons = importIcons.filter(name => !app.useFuncs.appGetIconSVGs(name));

    if (missingIcons.length === 0) return; // 全部已存在，直接返回

    // 并行加载缺失的 SVG
    await Promise.all(
        missingIcons.map(async (name) => {
            const rawSVG = await loadSVGWithRetry(`${from}/${name}.svg`);
            // 使用正则更安全地设置宽高
            const svg = rawSVG.replace(/<svg(\s)/, `<svg width="${width}" height="${height}"$1`);
            app.useFuncs.appSetIconSVG(name, svg);
        })
    );
}


async function initArticles() {
    const { originalArticleData: articleDatas } = await import('./js/data.js');
    articlesData.push(...articleDatas)
}

async function init() {
    await initSVG('./res/img/svg', ['copy', 'speaker']);
    await initArticles();
    patch();

}

// 补丁：这个函数存在的意义是由于有些事件需要延后处理，比如点击悬浮球中的目录时，展示目录，但是悬浮球的创建事件早于目录，因为目录是后期可能需要升级，因此处理目录的事件不能绑定到悬浮球内。
function patch() {
}


function onCustomEvent(name, listener) {
    document.addEventListener(name, (e) => {
        const detail = e.detail || {};
        listener(detail);
    });
}




// 通用事件触发
function triggerEvent(eventName, detail = {}) {
    document.dispatchEvent(new CustomEvent(eventName, { detail }));
}



// ======== 主入口 ========
async function main() {
    await init();
    console.log('初始化');
    // 模块脚本执行时，DOM 已经准备完毕；直接运行初始化逻辑
    initApp();
    console.log('初始化结束');
}

// ======== 主逻辑封装 ======== 这里面的功能基本上无需拓展，因此写死就很好
function initApp() {
    // 初始化所有文章数据
    if (articlesData) {
        articlesData.forEach(article => initArtcleData(article));
    }
    initNode?.();
    initProgress?.();
    buildWordDictionary?.();
    // renderPage?.();
    initModalTabs?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: "页面已经可以加载" }));
    initImportExport?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: "导出组件加载完毕" }));
    initDynamicImport?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: "导入组件加载完毕" }));
    initArticleCatalog?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: "目录功能加载完毕" }));
    initSpeechSynthesis?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: "语音组件加载完毕" }));
    const voices = [];
    // 预加载语音列表
    if ('speechSynthesis' in window) {
        if (window.speechSynthesis.getVoices()) {
            voices.push(...window.speechSynthesis.getVoices())
            window.speechSynthesis.onvoiceschanged = () => {
                console.log('语音列表已加载');
            };
        }

    }
    initGlobalSpeechControl?.();
    document.dispatchEvent(new CustomEvent('initStep', { detail: `语音组件加载完毕，可使用的语音有：${voices.map((e, i) => `<div>(${i}) ${e.name} (${e.lang})</div>`).join("")}` }));

    if (isTouchDevice() && voices.length <= 0) {
        document.dispatchEvent(new CustomEvent("initStep", { detail: `检测到你使用触屏设备(手机、平板、或者触屏电脑？)，且可能无法支持语音播放。可以点击这里测试播放效果:<button id = "">播放</button>` }))
    }

    // 初始化模态框相关事件
    const bind = (id, event, handler) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    };

    // ===== 词汇模态框 =====
    bind('save-vocab-btn', 'click', () => {
        const word = document.getElementById('vocab-word').value;
        const pos = document.getElementById('vocab-pos').value;
        const pronunciation = document.getElementById('vocab-pronunciation').value;
        const meaning = document.getElementById('vocab-meaning').value;
        const example = document.getElementById('vocab-example').value;
        if (addVocabItem(word, pos, pronunciation, meaning, example, false)) {
            hideAllModals();
        }
    });

    bind('quick-add-vocab-btn', 'click', () => {
        const word = document.getElementById('vocab-word').value;
        const pos = document.getElementById('vocab-pos').value;
        if (addVocabItem(word, pos, '', '', '', true)) {
            hideAllModals();
        }
    });

    bind('batch-add-vocab-btn', 'click', () => {
        const jsonData = document.getElementById('vocab-json').value;
        const result = batchAddVocabItems(jsonData);
        showBatchResult(result, 'vocab');
        if (result.success > 0) hideAllModals();
    });

    bind('quick-batch-vocab-btn', 'click', () => {
        const wordsText = document.getElementById('vocab-json').value;
        const result = quickBatchAddVocab(wordsText);
        showBatchResult(result, 'vocab');
        if (result.success > 0) hideAllModals();
    });

    bind('cancel-vocab-btn', 'click', hideAllModals);

    // ===== 语法模态框 =====
    bind('batch-add-grammar-btn', 'click', () => {
        const jsonData = document.getElementById('grammar-json').value;
        const result = batchAddGrammarItems(jsonData);
        showBatchResult(result, 'grammar');
        if (result.success > 0) hideAllModals();
    });

    bind('cancel-grammar-btn', 'click', hideAllModals);

    // 点击模态框外部关闭
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) hideAllModals();
        });
    });

    // 页面失焦时暂停语音
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && speechState?.isPlaying) stopSpeech();
    });

    // 快捷键事件
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const catalog = document.getElementById('article-catalog');
            catalog.classList.toggle('show');
            if (catalog.classList.contains('show')) {
                renderCatalogList();
                document.getElementById('catalog-search').focus();
            }
        }
        if (e.key === 'Escape' && document.getElementById('article-catalog').classList.contains('show')) {
            document.getElementById('article-catalog').classList.remove('show');
        }
    });


}

// ======== 执行入口 ========
await main();

function testSpeaker(text) {
    if ('speechSynthesis' in window) {
        // 创建一个新的语音实例
        const utterance = new SpeechSynthesisUtterance(text);

        // 可选：设置语言和语速
        utterance.lang = 'en-US'; // 英语
        utterance.rate = 1;       // 语速 0.1~10，1 为正常
        utterance.pitch = 1;      // 音调 0~2，1 为正常

        // 播放语音
        window.speechSynthesis.speak(utterance);
        return text;
    } else {
        return "不支持播放";
    }
}

testSpeaker("hello world");


// 文章数据初始化函数
function initArtcleData(currentArticle) {
    // 确保文章对象存在
    if (!currentArticle) return currentArticle;

    // 设置默认的语法类型
    if (!currentArticle.gram_types) {
        currentArticle.gram_types = gramTypes;
    }

    // 设置默认的词性类型
    if (!currentArticle.pos_types) {
        currentArticle.pos_types = posTypes;
    }

    // 确保文章有ID（如果没有，使用标题作为ID）
    if (!currentArticle.id && currentArticle.title) {
        currentArticle.id = currentArticle.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    // 确保段落数据存在且是数组
    if (!currentArticle.paras || !Array.isArray(currentArticle.paras)) {
        currentArticle.paras = [];
    }

    // 初始化每个段落
    currentArticle.paras.forEach((para, index) => {
        // 确保段落有ID
        if (!para.id) {
            para.id = index + 1;
        }

        // 确保词汇表存在
        if (!para.vocab) {
            para.vocab = [];
        }

        // 确保语法点存在
        if (!para.gram) {
            para.gram = [];
        }

        // 初始化每个词汇项
        para.vocab.forEach(vocab => {
            if (!vocab.ph) vocab.ph = "";
            if (!vocab.pos) vocab.pos = "n";
            if (!vocab.mean) vocab.mean = "";
            if (!vocab.ex) vocab.ex = "";
        });

        // 初始化每个语法项
        para.gram.forEach(gram => {
            if (!gram.category) gram.category = "O";
        });
    });

    return currentArticle;
}



// 设备检测函数
function isTouchDevice() {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
}



// 获取当前文章数据
function getCurrentArticle() {
    const article = articlesData.find(article => article.id === appState.currentArticleId) || articlesData[0];
    return initArtcleData(article);
}

// 构建单词词典
function buildWordDictionary() {
    appState.wordDictionary = {};
    const currentArticle = getCurrentArticle();
    currentArticle.paras.forEach(para => {
        if (para.vocab) {
            para.vocab.forEach(vocab => {
                // 将短语转换为小写作为键，同时保留原始大小写信息
                appState.wordDictionary[vocab.word.toLowerCase()] = vocab;
            });
        }
    });
}


// 切换文章
function switchArticle(articleId) {
    appState.currentArticleId = articleId;
    // 更新UI

    buildWordDictionary();
    renderPage();
    // 更新目录高亮
    updateCatalogHighlight();
    // 滚动到顶部
    window.scrollTo(0, 0);
}


const slotTooltip = document.getElementById('slot-tooltip');

// 点击快捷复制语法
function renderCpoyBtn(text) {

    const copy = document.createElement('span');

    // 创建样式实例 - 注意参数顺序变为 (config, clsName)
    const copyBtnStyle = new CssStyleMaker({
        prefix: 'ge-',
        autoInject: true
    }, 'copy-btn');


    // 用于测试相同样式
    const copyBtnStyle1 = new CssStyleMaker({
        prefix: 'ge-',
        autoInject: true
    }, 'copy-btn');

    copyBtnStyle.set(
        {
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#fff',
            transition: 'all 0.25s ease'
        }
    )

    copyBtnStyle
        .set({
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#3498db',
            transition: 'all 0.25s ease'
        })
        .hover({
            background: 'rgba(52,152,219,0.1)',
            transform: 'scale(1.1)'
        })
        .active({
            transform: 'scale(0.95)',
            background: 'rgba(52,152,219,0.2)'
        })
        .set({
            color: '#2ecc71',
            transform: 'scale(1.2)'
        }, '.copied');

    // 将样式应用到元素
    copyBtnStyle.inject(copy);
    copy.innerHTML = `${app.useFuncs.appGetIconSVGs('copy')}`;


    copy.addEventListener('click', async function () {
        try {
            await navigator.clipboard.writeText(text);
            console.log('已复制:', text);
        } catch (err) {
            console.error('复制失败:', err);
        }
    });
    return copy;
}

// 点击快捷复制单词

// 渲染页面
function renderPage() {
    const currentArticle = getCurrentArticle();

    // 设置标题
    document.getElementById('page-title').textContent = currentArticle.title;
    // 渲染信息栏
    const infoArea = document.getElementById('info-area');
    infoArea.innerHTML = '';

    if (currentArticle.info) {
        const infoItems = [
            { label: '作者', value: currentArticle.info.author },
            { label: '来源', value: currentArticle.info.source },
            { label: '难度', value: currentArticle.info.level }
        ];

        infoItems.forEach(item => {
            if (item.value) {
                const infoItem = document.createElement('div');
                infoItem.className = 'info-item';
                infoItem.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
                infoArea.appendChild(infoItem);
            }
        });

        // 添加标签
        if (currentArticle.info.tags && currentArticle.info.tags.length > 0) {
            const tagItem = document.createElement('div');
            tagItem.className = 'info-item';
            tagItem.innerHTML = '<strong>标签:</strong> ' +
                currentArticle.info.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            infoArea.appendChild(tagItem);
        }
    }

    // 获取内容区域
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '';

    // 渲染每个段落
    currentArticle.paras.forEach(paragraph => {
        const paragraphElement = document.createElement('div');
        paragraphElement.className = 'paragraph';
        paragraphElement.id = `para-${paragraph.id}`;

        // 添加段落ID
        const paragraphId = document.createElement('div');
        paragraphId.className = 'paragraph-id';
        paragraphId.textContent = `段落 ${paragraph.id}`;
        paragraphElement.appendChild(paragraphId);

        // 添加英文文本
        const englishText = document.createElement('div');
        englishText.className = 'english-text';

        // 处理英文文本，使单词和短语都可点击
        let processedText = paragraph.en;

        // 按照词汇表中的短语长度从长到短排序，优先匹配长短语
        const vocabWords = paragraph.vocab ?
            paragraph.vocab.map(v => v.word).sort((a, b) => b.split(' ').length - a.split(' ').length)
            : [];

        // 先处理短语，再处理单个单词
        vocabWords.forEach(vocabWord => {
            const regex = new RegExp(`\\b${vocabWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            processedText = processedText.replace(regex, `|||${vocabWord}|||`);
        });

        // 分割处理后的文本
        const segments = processedText.split('|||');

        segments.forEach(segment => {
            const span = document.createElement('span');

            // 检查这个segment是否是一个词汇表中的单词/短语
            const normalizedSegment = segment.toLowerCase();
            if (appState.wordDictionary[normalizedSegment] && segment.trim() !== '') {
                span.className = 'clickable-word';
                span.textContent = segment;
                span.dataset.word = segment; // 存储原始形式
                span.addEventListener('click', showWordTooltip);
            } else {
                span.textContent = segment;
            }

            englishText.appendChild(span);
        });

        const createCircleButton = (text, onClick, extraStyle = {}) => {
            const btn = document.createElement('span');
            Object.assign(btn.style, {
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: '#2980b9',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                color: 'white',
                userSelect: 'none',
                marginLeft: '5px',
                ...extraStyle,
            });
            btn.innerText = text;
            btn.addEventListener('click', onClick);
            return btn;
        };

        englishText.appendChild(
            createCircleButton('G', () => showAddGrammarModal(paragraph))
        );

        englishText.appendChild(
            createCircleButton('V', () => showAddVocabModal(paragraph))
        );


        englishText.appendChild(renderCpoyBtn(paragraph.en));



        englishText.appendChild(((p) => {
            const s = document.createElement('span');
            s.innerText = TextAnalyzer.quickAnalyze(p.en).wordCount;
            console.log(TextAnalyzer.quickAnalyze(p.en));
            Object.assign(s.style, {
                display: 'inline-block',
                width: '20px',
                height: '20px',
                backgroundColor: '#2980b9',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                color: 'white',
                userSelect: 'none',
                marginLeft: '5px',
            })
            return s;
        })(paragraph));


        // ========== 添加语音朗读控制 ==========
        const speechControl = createSpeechControl(paragraph);
        englishText.appendChild(speechControl);
        // ========== 添加结束 ==========

        paragraphElement.appendChild(englishText);

        // ========== 添加中文文本 ==========
        // 添加中文翻译
        if (paragraph.cn && paragraph.cn.trim()) {
            const chineseText = document.createElement('div');
            chineseText.className = 'chinese-text';
            chineseText.textContent = paragraph.cn;
            paragraphElement.appendChild(chineseText);
        }
        // ========== 添加结束 ==========

        // 添加词汇部分
        if (paragraph.vocab && paragraph.vocab.length > 0) {
            const vocabTitle = document.createElement('h3');
            vocabTitle.className = 'section-title';
            vocabTitle.innerHTML = '词汇 <button class="btn btn-sm btn-outline-secondary toggle-btn">隐藏</button>';

            const vocabList = document.createElement('div');
            vocabList.className = 'vocab-list';
            vocabList.id = `vocab-${paragraph.id}`;

            // 在renderPage函数中找到词汇部分，修改这一部分：
            paragraph.vocab.forEach((vocab, index) => {
                const vocabItem = document.createElement('div');
                vocabItem.className = 'vocab-item';

                // ========== 修改：使用新的单词标题布局，传递index参数 ==========
                const wordHeader = createWordHeader(vocab, paragraph, index);
                vocabItem.appendChild(wordHeader);

                const pronunciation = document.createElement('div');
                pronunciation.className = 'pronunciation';
                pronunciation.textContent = vocab.ph;
                vocabItem.appendChild(pronunciation);

                const meaning = document.createElement('div');
                meaning.className = 'meaning';
                meaning.textContent = `含义: ${vocab.mean}`;
                vocabItem.appendChild(meaning);

                const example = document.createElement('div');
                example.className = 'example';
                example.textContent = `例句: ${vocab.ex}`;
                vocabItem.appendChild(example);

                vocabList.appendChild(vocabItem);
            });



            paragraphElement.appendChild(vocabTitle);
            paragraphElement.appendChild(vocabList);

            // 添加切换事件
            vocabTitle.querySelector('.toggle-btn').addEventListener('click', function () {
                const isHidden = vocabList.classList.contains('hidden-content');
                vocabList.classList.toggle('hidden-content');
                this.textContent = isHidden ? '隐藏' : '显示';
            });

            // 初始状态
            if (!appState.showExplanations) {
                vocabList.classList.add('hidden-content');
                vocabTitle.querySelector('.toggle-btn').textContent = '显示';
            }
        }



        // 添加语法部分
        if (paragraph.gram && paragraph.gram.length > 0) {
            const grammarTitle = document.createElement('h3');
            grammarTitle.className = 'section-title';
            grammarTitle.innerHTML = '语法点 <button class="btn btn-sm btn-outline-secondary toggle-btn">隐藏</button>';

            const grammarList = document.createElement('div');
            grammarList.className = 'grammar-list';
            grammarList.id = `grammar-${paragraph.id}`;

            paragraph.gram.forEach((grammar, index) => {
                const grammarPage = renderGrammarCard(grammar);
                grammarList.appendChild(grammarPage);
                appState.grammarRules.push(grammar)
            });
            paragraphElement.appendChild(grammarTitle);
            paragraphElement.appendChild(grammarList);

            paragraphElement.querySelectorAll('.slot').forEach(slot => {
                slot.addEventListener('click', (event) => {
                    const slotName = event.target.dataset.slot;
                    const ruleId = event.target.dataset.rule;
                    showSlotTooltip(slotName, ruleId, event);
                });

                // 鼠标移出时隐藏工具提示
                slot.addEventListener('mouseleave', hideSlotTooltip);
            });

            // 添加切换事件
            grammarTitle.querySelector('.toggle-btn').addEventListener('click', function () {
                const isHidden = grammarList.classList.contains('hidden-content');
                grammarList.classList.toggle('hidden-content');
                this.textContent = isHidden ? '隐藏' : '显示';
            });

            // 初始状态
            if (!appState.showExplanations) {
                grammarList.classList.add('hidden-content');
                grammarTitle.querySelector('.toggle-btn').textContent = '显示';
            }
        }

        contentArea.appendChild(paragraphElement);
    });

    // 添加备注部分
    if (currentArticle.note) {
        const noteSection = document.createElement('div');
        noteSection.className = 'note-section';

        const noteTitle = document.createElement('div');
        noteTitle.className = 'note-title';
        noteTitle.textContent = '学习笔记';
        noteSection.appendChild(noteTitle);

        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.textContent = currentArticle.note;
        noteSection.appendChild(noteContent);

        contentArea.appendChild(noteSection);
    }
}

// 切换解析显示状态
function toggleExplanations() {
    appState.showExplanations = !appState.showExplanations;

    // 更新全局设置开关
    document.getElementById('toggle-explanations').checked = appState.showExplanations;

    // 显示/隐藏所有词汇和语法部分
    document.querySelectorAll('.vocab-list, .grammar-list').forEach(el => {
        if (appState.showExplanations) {
            el.classList.remove('hidden-content');
        } else {
            el.classList.add('hidden-content');
        }
    });
    // 更新所有切换按钮文本
    document.querySelectorAll('.section-title .toggle-btn').forEach(btn => {
        btn.textContent = appState.showExplanations ? '隐藏' : '显示';
    });
}

// 渲染语法卡片
function renderGrammarCard(rule) {
    const card = document.createElement('div');
    card.className = 'grammar-card';
    card.dataset.ruleId = rule.id;

    // 创建卡片HTML
    card.innerHTML = `
                <div class="card-header">
                    <h2 class="card-title">${rule.name}</h2>
                    <div class="card-level">${rule.level}</div>
                </div>
                <div class="card-body">
                    <div class="gram-section">
                        <div class="gram-section-title">语法模式</div>
                        <div class="pattern-container" id="pattern-${rule.id}">
                            ${renderPattern(rule.pattern, rule.components, rule.id)}
                        </div>
                    </div>

                    <div class="gram-section">
                        <div class="gram-section-title">功能说明</div>
                        <p>${rule.function}</p>
                    </div>

                    <div class="gram-section">
                        <div class="gram-section-title">示例句</div>
                        <div class="example-container">
                            <div class="example-en">${rule.example.en}</div>
                            <div class="example-cn">${rule.example.cn}</div>
                        </div>
                    </div>

                    ${rule.variants && rule.variants.length > 0 ? `
                    <div class="gram-section">
                        <div class="gram-section-title">变体</div>
                        <ul class="variants-list">
                            ${rule.variants.map(variant => `<li>${renderPattern(variant, rule.components, rule.id)}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}

                    ${rule.constraints ? `
                    <div class="gram-section">
                        <div class="gram-section-title">语法限制</div>
                        <div class="constraints-container">
                            ${rule.constraints}
                        </div>
                    </div>
                    ` : ''}
                </div>
                <div class="card-footer">
                    <div>ID: ${rule.id}</div>
                    <div>类别: ${gramTypes[rule.category]?.cn || rule.category}</div>
                </div>
            `;
    return card;
}




// 用于合并单词最小单位,第参数个元素是单词最小单位列表，第二是具体需要合并的句子
function mergePhrases(parts, phrases) {
    const result = [];
    let i = 0;

    while (i < parts.length) {
        let merged = false;

        // 遍历要合并的短语
        for (const phrase of phrases) {
            const phraseParts = phrase.split(/([.,!?;:\s]+)/).filter(Boolean); // 拆短语成词+空格
            const segment = parts.slice(i, i + phraseParts.length).join('');

            if (segment.toLowerCase() === phrase.toLowerCase()) {
                // 如果匹配成功
                result.push(phrase);
                i += phraseParts.length;
                merged = true;
                break;
            }
        }

        if (!merged) {
            result.push(parts[i]);
            i++;
        }
    }

    return result;
}




// 渲染语法模式，智能识别槽位
function renderPattern(pattern, components, ruleId) {
    // 先提取所有 slot 名称方便查找
    // Object.fromEntries功能，把列表转化为字典 如 [[a,b],[b,c],[c,d]] => {a:b,b:c,c:d}
    const slotList = [];
    const slotMap = Object.fromEntries(
        components.map(c => {
            slotList.push(c.slot)
            return [c.slot, c];
        }
        )
    );
    console.log('slotMap', slotMap);
    console.log('slotList', slotList);

    // 分割 pattern —— 保留空格
    const takeParts = pattern.split(/([.,!?;:\s]+)/);
    console.log('parts', takeParts)
    const parts = mergePhrases(takeParts, slotList);
    return parts.map(part => {
        // 去掉前后空格
        const trimmed = part.trim();
        if (trimmed === '') return part; // 保留空格

        // 是否是 components 中定义的槽位
        const comp = slotMap[trimmed];
        if (comp) {
            // 渲染槽位
            return `<span class="slot"
                         data-slot="${comp.slot}"
                         data-role="${comp.role}"
                         data-pos="${comp.pos.join(',')}"
                         data-rule="${ruleId}">
                         ${comp.slot}
                    </span>`;
        }

        // 否则当作固定词
        return `<span class="fixed-word">${part}</span>`;
    }).join('');
}

// 显示槽位工具提示
function showSlotTooltip(slot, ruleId, event) {
    // 清除之前的超时
    if (currentTooltipTimeout) {
        clearTimeout(currentTooltipTimeout);
    }

    // 查找对应的语法规则和槽位信息
    const rule = appState.grammarRules.find(r => r.id === ruleId);
    if (!rule) return;

    const component = rule.components.find(c => c.slot === slot);
    if (!component) {
        // 如果没有找到对应的component，显示默认信息
        slotTooltip.innerHTML = `
                    <div class="tooltip-header">
                        <div class="tooltip-slot">${slot}</div>
                        <div class="tooltip-role">语法槽位</div>
                    </div>
                    <div class="tooltip-pos">
                        <div>在语法模式中代表一个可替换的部分</div>
                    </div>
                `;
    } else {
        // 构建工具提示内容
        const posTags = component.pos.map(p =>
            `<span class="tooltip-pos-tag">${posTypes[p]?.cn || p}</span>`
        ).join('');

        slotTooltip.innerHTML = `
                    <div class="tooltip-header">
                        <div class="tooltip-slot">${slot}</div>
                        <div class="tooltip-role">${component.role}</div>
                    </div>
                    <div class="tooltip-pos">
                        <div class="tooltip-pos-title">允许的词性:</div>
                        <div class="tooltip-pos-tags">${posTags}</div>
                    </div>
                `;
    }

    // 定位工具提示
    const rect = event.target.getBoundingClientRect();


    let top = rect.bottom + 5;
    let left = rect.left;

    // 确保工具提示不会超出屏幕
    const tooltipWidth = window.innerWidth < 768 ? 200 : 250;
    if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 10;
    }

    slotTooltip.style.top = `${top}px`;
    slotTooltip.style.left = `${left}px`;

    // 显示工具提示
    slotTooltip.classList.add('show');

    // 设置自动隐藏
    currentTooltipTimeout = setTimeout(() => {
        slotTooltip.classList.remove('show');
    }, 3000);
}

// 隐藏工具提示
function hideSlotTooltip() {
    if (currentTooltipTimeout) {
        clearTimeout(currentTooltipTimeout);
    }
    slotTooltip.classList.remove('show');
}


// 增强showWordTooltip函数，在工具提示中添加词性和发音按钮
function showWordTooltip(event) {
    const word = event.target.dataset.word;
    console.log(word)
    // 使用小写形式查找词典
    const wordData = appState.wordDictionary[word.toLowerCase()];
    if (wordData) {
        const tooltip = document.getElementById('word-tooltip');
        // 获取词性显示文本
        let posDisplay = '';
        if (wordData.pos && wordData.pos.trim()) {
            const currentArticle = getCurrentArticle();
            const posType = currentArticle.pos_types && currentArticle.pos_types[wordData.pos]
                ? currentArticle.pos_types[wordData.pos]
                : { en: wordData.pos, cn: wordData.pos };
            posDisplay = `(${posType.cn || posType.en || wordData.pos})`;
        }

        // 创建工具提示内容，包含词性、发音按钮
        const tooltipContent = document.createElement('div');
        tooltipContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <strong>${wordData.word}</strong>
                <span style="color: var(--text-light); font-size: 0.9rem;">${posDisplay}</span>
                <button class="word-speech-btn" style="margin: 0;" title="朗读单词">
                    ${createSpeechIcon()}
                </button>
            </div>
            <div style="margin-bottom: 4px;">${wordData.ph}</div>
            <div style="margin-bottom: 4px;">${wordData.mean}</div>
            <div><em>${wordData.ex}</em></div>
        `;

        tooltip.innerHTML = '';
        tooltip.appendChild(tooltipContent);

        // 为工具提示中的发音按钮添加事件
        const speechBtn = tooltip.querySelector('.word-speech-btn');
        speechBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            speakWord(wordData.word, this);
        });
        // 添加发音按钮悬停效果
        speechBtn.addEventListener('mouseenter', function () {
            this.style.background = 'rgba(255,255,255,0.1)';
        });
        speechBtn.addEventListener('mouseleave', function () {
            this.style.background = 'transparent';
        });

        // 获取点击元素的位置
        const rect = event.target.getBoundingClientRect();

        // 计算工具提示位置
        let left = rect.left;
        let top = rect.bottom + 5;

        // 确保工具提示不会超出屏幕右侧
        const tooltipWidth = window.innerWidth < 768 ? 200 : 250;
        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth - 10;
        }

        // 确保工具提示不会超出屏幕底部
        const tooltipHeight = 100;
        if (top + tooltipHeight > window.innerHeight) {
            top = rect.top - tooltipHeight - 5;
        }

        // 设置工具提示位置
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;

        tooltip.classList.add('show');

        // 3秒后自动隐藏
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 3000);
    }
}




// 模态框功能
let currentParagraphForModal = null;

function showAddVocabModal(paragraph) {
    currentParagraphForModal = paragraph;
    const modal = document.getElementById('add-vocab-modal');

    // 清空表单
    document.getElementById('vocab-word').value = '';
    document.getElementById('vocab-pos').value = 'n'; // 默认选择名词
    document.getElementById('vocab-pronunciation').value = '';
    document.getElementById('vocab-meaning').value = '';
    document.getElementById('vocab-example').value = '';
    document.getElementById('vocab-json').value = '';

    // 重置到第一个选项卡
    modal.querySelectorAll('.modal-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index === 0);
    });
    modal.querySelectorAll('.modal-tab-content').forEach((content, index) => {
        content.classList.toggle('active', index === 0);
    });

    modal.classList.add('show');
}

function showAddGrammarModal(paragraph) {
    currentParagraphForModal = paragraph;
    const modal = document.getElementById('add-grammar-modal');

    // 清空表单
    document.getElementById('grammar-rule-now').value = `${JSON.stringify(paragraph.gram, null, 2)}`;
    document.getElementById('grammar-json').value = '';

    // 重置到第一个选项卡
    modal.querySelectorAll('.modal-tab').forEach((tab, index) => {
        tab.classList.toggle('active', index === 0);
    });
    modal.querySelectorAll('.modal-tab-content').forEach((content, index) => {
        content.classList.toggle('active', index === 0);
    });

    modal.classList.add('show');
}

function hideAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('show');
    });
    currentParagraphForModal = null;
}

function showTemporaryMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-size: 0.9rem;
    `;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    setTimeout(() => {
        document.body.removeChild(messageEl);
    }, 3000);
}

// 添加单词功能
// 添加单词功能
function addVocabItem(word, pos, pronunciation, meaning, example, isQuickAdd = false) {
    if (!currentParagraphForModal) return false;

    // 验证必填字段
    if (!word.trim()) {
        showTemporaryMessage('错误：单词/短语不能为空');
        return false;
    }

    const currentArticle = getCurrentArticle();
    const paragraph = currentArticle.paras.find(p => p.id === currentParagraphForModal.id);

    if (!paragraph.vocab) {
        paragraph.vocab = [];
    }

    // 检查是否已存在相同的单词
    const existingVocab = paragraph.vocab.find(v =>
        v.word.toLowerCase() === word.toLowerCase()
    );

    if (existingVocab) {
        showTemporaryMessage(`单词 "${word}" 已存在`);
        return false;
    }

    // 添加新单词
    paragraph.vocab.push({
        word: word.trim(),
        pos: isQuickAdd ? "n" : (pos || "n"), // 默认词性为名词
        ph: isQuickAdd ? "Undefined" : (pronunciation.trim() || "Undefined"),
        mean: isQuickAdd ? "Undefined" : (meaning.trim() || "Undefined"),
        ex: isQuickAdd ? "Undefined" : (example.trim() || "Undefined")
    });

    // 重新构建词典并渲染页面
    buildWordDictionary();
    renderPage();

    showTemporaryMessage(`已添加单词: "${word}"`);
    return true;
}
// 添加语法功能
function addGrammarItem(rule, category, description, example, isQuickAdd = false) {
    if (!currentParagraphForModal) return false;

    // 验证必填字段
    if (!rule.trim()) {
        showTemporaryMessage('错误：语法规则不能为空');
        return false;
    }

    const currentArticle = getCurrentArticle();
    const paragraph = currentArticle.paras.find(p => p.id === currentParagraphForModal.id);

    if (!paragraph.gram) {
        paragraph.gram = [];
    }

    // 检查是否已存在相同的语法点
    const existingGrammar = paragraph.gram.find(g =>
        g.rule.toLowerCase() === rule.toLowerCase()
    );

    if (existingGrammar) {
        showTemporaryMessage(`语法点 "${rule}" 已存在`);
        return false;
    }

    // 添加新语法点
    paragraph.gram.push({
        rule: rule.trim(),
        cat: category,
        desc: isQuickAdd ? "Undefined" : (description.trim() || "Undefined"),
        ex: isQuickAdd ? "Undefined" : (example.trim() || "Undefined")
    });

    // 重新渲染页面
    renderPage();

    showTemporaryMessage(`已添加语法点: "${rule}"`);
    return true;
}



// 选项卡切换功能
function initModalTabs() {
    // 为所有选项卡按钮添加点击事件
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            const modal = this.closest('.modal-content');
            const tabName = this.dataset.tab;

            // 移除所有active类
            modal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

            // 添加active类到当前选项卡
            this.classList.add('active');
            modal.querySelector(`.modal-tab-content[data-tab="${tabName}"]`).classList.add('active');
        });
    });
}

// 批量添加单词功能
function batchAddVocabItems(jsonData) {
    if (!currentParagraphForModal) return { success: 0, total: 0, errors: [] };

    const currentArticle = getCurrentArticle();
    const paragraph = currentArticle.paras.find(p => p.id === currentParagraphForModal.id);

    if (!paragraph.vocab) {
        paragraph.vocab = [];
    }

    let successCount = 0;
    const errors = [];

    try {
        // 解析JSON数据
        const vocabItems = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        if (!Array.isArray(vocabItems)) {
            throw new Error('JSON数据必须是数组格式');
        }

        vocabItems.forEach((item, index) => {
            // 验证必填字段
            if (!item.word || !item.word.trim()) {
                errors.push(`第 ${index + 1} 项: 缺少word字段`);
                return;
            }

            // 检查是否已存在
            const existingVocab = paragraph.vocab.find(v =>
                v.word.toLowerCase() === item.word.trim().toLowerCase()
            );

            if (existingVocab) {
                errors.push(`第 ${index + 1} 项: 单词 "${item.word}" 已存在`);
                return;
            }

            // 添加新单词
            paragraph.vocab.push({
                word: item.word.trim(),
                pos: item.pos && item.pos.trim() ? item.pos.trim() : "n",
                ph: item.ph && item.ph.trim() ? item.ph.trim() : "Undefined",
                mean: item.mean && item.mean.trim() ? item.mean.trim() : "Undefined",
                ex: item.ex && item.ex.trim() ? item.ex.trim() : "Undefined"
            });

            successCount++;
        });

        if (successCount > 0) {
            // 重新构建词典并渲染页面
            buildWordDictionary();
            renderPage();
        }

        return {
            success: successCount,
            total: vocabItems.length,
            errors: errors
        };

    } catch (error) {
        return {
            success: 0,
            total: 0,
            errors: [`JSON解析错误: ${error.message}`]
        };
    }
}
// 批量添加语法功能
function batchAddGrammarItems(jsonData) {
    if (!currentParagraphForModal) return { success: 0, total: 0, errors: [] };

    const currentArticle = getCurrentArticle();
    console.log('文章：', currentArticle);
    const paragraph = currentArticle.paras.find(p => p.id === currentParagraphForModal.id);

    if (!paragraph.gram) {
        paragraph.gram = [];
    }

    let successCount = 0;
    const errors = [];

    try {
        // 解析JSON数据
        const grammarItems = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        if (!Array.isArray(grammarItems)) {
            throw new Error('JSON数据必须是数组格式');
        }


        grammarItems.forEach((item, index) => {
            // 验证必填字段
            if (!item.id || !item.id.trim()) {
                errors.push(`第 ${index + 1} 项: 缺少id字段`);
                return;
            }

            // 检查是否已存在
            const existingGrammar = paragraph.gram.find(g =>
                g.id.toLowerCase() === item.id.trim().toLowerCase()
            );

            if (existingGrammar) {
                errors.push(`第 ${index + 1} 项: 语法点 "${item.rule}" 已存在`);
                return;
            }

            // 添加新语法点
            paragraph.gram.push(item);
            successCount++;
        });

        if (successCount > 0) {
            // 重新渲染页面
            renderPage();
        }

        return {
            success: successCount,
            total: grammarItems.length,
            errors: errors
        };

    } catch (error) {
        return {
            success: 0,
            total: 0,
            errors: [`JSON解析错误: ${error.message}`]
        };
    }
}

// 快速批量添加单词（逗号分隔）
function quickBatchAddVocab(wordsText) {
    if (!currentParagraphForModal) return { success: 0, total: 0, errors: [] };

    const words = wordsText.split(',').map(word => word.trim()).filter(word => word);

    const jsonData = words.map(word => ({
        word: word,
        pos: "n", // 默认词性为名词
        ph: "Undefined",
        mean: "Undefined",
        ex: "Undefined"
    }));

    return batchAddVocabItems(jsonData);
}



// 显示批量操作结果
function showBatchResult(result, type) {
    let message = '';

    if (result.success > 0) {
        message = `成功添加 ${result.success} 个${type === 'vocab' ? '单词' : '语法点'}`;
        if (result.errors.length > 0) {
            message += `，${result.errors.length} 个失败`;
        }
    } else {
        message = `添加失败: ${result.errors.join('; ')}`;
    }

    showTemporaryMessage(message);

    // 如果有错误，在控制台显示详细错误
    if (result.errors.length > 0) {
        console.log('批量添加错误详情:', result.errors);
    }
}


// 导入导出功能
function initImportExport() {
    // 导入按钮事件
    document.getElementById('import-articles-btn').addEventListener('click', function () {
        showImportModal();
    });

    // 导出按钮事件
    document.getElementById('export-articles-btn').addEventListener('click', function () {
        showExportModal();
    });

    // 导入模态框事件
    document.getElementById('cancel-import-btn').addEventListener('click', function () {
        hideAllModals();
    });

    document.getElementById('confirm-import-btn').addEventListener('click', function () {
        importArticles();
    });

    // 导出模态框事件
    document.getElementById('cancel-export-btn').addEventListener('click', function () {
        hideAllModals();
    });

    document.getElementById('confirm-export-btn').addEventListener('click', function () {
        exportArticles();
    });

    // 导出类型切换事件
    document.querySelectorAll('input[name="export-type"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const selectionArea = document.getElementById('article-selection-area');
            if (this.value === 'selected') {
                selectionArea.style.display = 'block';
                renderArticleCheckboxes();
            } else {
                selectionArea.style.display = 'none';
            }
        });
    });

    // 全选事件
    document.getElementById('select-all-articles').addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('#article-checkboxes input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // 导出格式切换事件
    document.querySelectorAll('input[name="export-format"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const filenameGroup = document.getElementById('export-filename-group');
            const filenameInput = document.getElementById('export-filename');

            if (this.value === 'single') {
                filenameGroup.style.display = 'block';
                filenameInput.placeholder = '例如: english_articles';
            } else {
                filenameGroup.style.display = 'block';
                filenameInput.placeholder = '将用作文件名前缀';
            }
        });
    });
}

// 显示导入模态框
function showImportModal() {
    const modal = document.getElementById('import-articles-modal');
    console.log('导入文章测试');
    document.getElementById('import-file').value = '';
    document.getElementById('import-overwrite').checked = false;
    modal.classList.add('show');
}

// 显示导出模态框
function showExportModal() {
    const modal = document.getElementById('export-articles-modal');

    // 重置表单
    document.getElementById('export-current').checked = true;
    document.getElementById('export-single').checked = true;
    document.getElementById('export-filename').value = 'english_articles';
    document.getElementById('article-selection-area').style.display = 'none';

    modal.classList.add('show');
}

// 渲染文章复选框
function renderArticleCheckboxes() {
    const container = document.getElementById('article-checkboxes');
    container.innerHTML = '';

    articlesData.forEach(article => {
        const div = document.createElement('div');
        div.className = 'article-checkbox-item';

        div.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${article.id}" id="article-${article.id}">
                <label class="form-check-label" for="article-${article.id}">
                    ${article.title}
                </label>
            </div>
        `;

        container.appendChild(div);
    });
}

// 导入文章
function importArticles() {
    const fileInput = document.getElementById('import-file');
    const overwrite = document.getElementById('import-overwrite').checked;

    if (!fileInput.files.length) {
        showTemporaryMessage('请选择要导入的文件');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    // 在importArticles函数中，处理导入后调用初始化
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            let importedArticles = [];

            // 判断是单个文章还是文章数组
            if (Array.isArray(data)) {
                importedArticles = data;
            } else if (typeof data === 'object' && data !== null) {
                importedArticles = [data];
            } else {
                throw new Error('文件格式不正确：必须是单个文章对象或文章数组');
            }

            // 验证文章数据
            const validationResult = validateArticles(importedArticles);
            if (!validationResult.valid) {
                showTemporaryMessage(`导入失败：${validationResult.error}`);
                return;
            }

            // 导入文章前初始化
            importedArticles.forEach(article => initArtcleData(article));

            // 导入文章
            const importResult = processImport(importedArticles, overwrite);

            // 显示导入结果
            showImportResult(importResult);

            // 如果导入成功，重新渲染页面
            if (importResult.successCount > 0) {

                renderPage();
            }

        } catch (error) {
            showTemporaryMessage(`导入失败：${error.message}`);
        }
    };

    reader.onerror = function () {
        showTemporaryMessage('文件读取失败');
    };

    reader.readAsText(file);
}

// 验证文章数据
function validateArticles(articles) {
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        if (!article.id || !article.title) {
            return {
                valid: false,
                error: `第 ${i + 1} 篇文章缺少必需的 id 或 title 字段`
            };
        }

        if (!article.paras || !Array.isArray(article.paras)) {
            return {
                valid: false,
                error: `文章 "${article.title}" 缺少 paras 字段或格式不正确`
            };
        }

        // 验证段落数据
        for (let j = 0; j < article.paras.length; j++) {
            const para = article.paras[j];
            if (!para.id || !para.en || !para.cn) {
                return {
                    valid: false,
                    error: `文章 "${article.title}" 的第 ${j + 1} 个段落数据不完整`
                };
            }
        }
    }

    return { valid: true };
}

// 处理导入
function processImport(importedArticles, overwrite) {
    let successCount = 0;
    let skipCount = 0;
    let overwriteCount = 0;
    const errors = [];

    importedArticles.forEach(article => {
        const existingIndex = articlesData.findIndex(a => a.id === article.id);

        if (existingIndex !== -1) {
            if (overwrite) {
                // 覆盖现有文章
                articlesData[existingIndex] = article;
                overwriteCount++;
                successCount++;
            } else {
                // 跳过重复文章
                skipCount++;
                errors.push(`跳过重复文章: ${article.title} (ID: ${article.id})`);
            }
        } else {
            // 添加新文章
            articlesData.push(article);
            successCount++;
        }
    });

    return {
        successCount,
        skipCount,
        overwriteCount,
        errors,
        total: importedArticles.length
    };
}

// 显示导入结果
function showImportResult(result) {
    let message = '';

    if (result.successCount > 0) {
        message = `成功导入 ${result.successCount} 篇文章`;
        if (result.overwriteCount > 0) {
            message += `（覆盖 ${result.overwriteCount} 篇）`;
        }
        if (result.skipCount > 0) {
            message += `，跳过 ${result.skipCount} 篇重复文章`;
        }
    } else {
        message = '没有成功导入任何文章';
    }

    showTemporaryMessage(message);

    // 如果有错误，在控制台显示
    if (result.errors.length > 0) {
        console.log('导入详细结果:', result.errors);
    }
}

// 导出文章
function exportArticles() {
    const exportType = document.querySelector('input[name="export-type"]:checked').value;
    const exportFormat = document.querySelector('input[name="export-format"]:checked').value;
    const filename = document.getElementById('export-filename').value.trim() || 'english_articles';

    let articlesToExport = [];

    // 根据导出类型选择文章
    if (exportType === 'current') {
        // 导出当前文章
        const currentArticle = getCurrentArticle();
        articlesToExport = [currentArticle];
    } else {
        // 导出选中的文章
        const selectedCheckboxes = document.querySelectorAll('#article-checkboxes input[type="checkbox"]:checked');
        if (selectedCheckboxes.length === 0) {
            showTemporaryMessage('请选择要导出的文章');
            return;
        }

        selectedCheckboxes.forEach(checkbox => {
            const article = articlesData.find(a => a.id === checkbox.value);
            if (article) {
                articlesToExport.push(article);
            }
        });
    }

    if (articlesToExport.length === 0) {
        showTemporaryMessage('没有选择要导出的文章');
        return;
    }

    // 根据导出格式执行导出
    if (exportFormat === 'single') {
        exportAsSingleFile(articlesToExport, filename);
    } else {
        exportAsMultipleFiles(articlesToExport, filename);
    }

    hideAllModals();
    showTemporaryMessage(`成功导出 ${articlesToExport.length} 篇文章`);
}

// 导出为单个文件
function exportAsSingleFile(articles, filename) {
    const dataStr = JSON.stringify(articles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 导出为多个文件
function exportAsMultipleFiles(articles, filenamePrefix) {
    articles.forEach(article => {
        const dataStr = JSON.stringify(article, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;

        // 清理文件名（移除特殊字符）
        const cleanTitle = article.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
        link.download = `${filenamePrefix}_${cleanTitle}.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// 语音朗读功能
const speechState = {
    isPlaying: false,
    currentUtterance: null,
    currentParagraphId: null
};

// 创建语音SVG图标
// 修改SVG图标创建函数，添加size参数
function createSpeechIcon(size = 20) {
    return `
        <svg class="speech-icon" viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
    `;
}

// 创建停止语音SVG图标
function createStopSpeechIcon(size = 20) {
    return `
        <svg class="speech-icon" viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}">
            <path d="M6 6h12v12H6z"/>
        </svg>
    `;
}

// 单词发音图标
function createWordSpeechIcon() {
    return createSpeechIcon(16);
}

function createWordStopSpeechIcon() {
    return createStopSpeechIcon(16);
}

// 初始化语音合成
function initSpeechSynthesis() {
    if (!('speechSynthesis' in window)) {
        console.warn('浏览器不支持语音合成功能');
        return false;
    }
    return true;
}

// 朗读文本
function speakText(text, paragraphId) {
    if (speechState.isPlaying) {
        stopSpeech();
        return;
    }

    if (!initSpeechSynthesis()) {
        showTemporaryMessage('您的浏览器不支持语音朗读功能');
        return;
    }

    // 停止当前正在播放的语音
    window.speechSynthesis.cancel();

    // 创建新的语音实例
    const utterance = new SpeechSynthesisUtterance(text);

    // 设置语音参数
    utterance.rate = 0.9;    // 语速
    utterance.pitch = 1.0;   // 音调
    utterance.volume = 1.0;  // 音量

    // 尝试设置英语语音
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice =>
        voice.lang.startsWith('en') && voice.localService
    );

    if (englishVoice) {
        utterance.voice = englishVoice;
    } else if (voices.length > 0) {
        utterance.voice = voices[0];
    }

    // 更新状态
    speechState.isPlaying = true;
    speechState.currentUtterance = utterance;
    speechState.currentParagraphId = paragraphId;

    // 更新按钮状态
    updateSpeechButtonState(paragraphId, true);

    // 事件监听
    utterance.onstart = function () {
        console.log('开始朗读段落:', paragraphId);
    };

    utterance.onend = function () {
        console.log('朗读结束');
        speechState.isPlaying = false;
        speechState.currentUtterance = null;
        speechState.currentParagraphId = null;
        updateSpeechButtonState(paragraphId, false);
    };

    utterance.onerror = function (event) {
        console.error('语音朗读错误:', event.error);
        speechState.isPlaying = false;
        speechState.currentUtterance = null;
        speechState.currentParagraphId = null;
        updateSpeechButtonState(paragraphId, false);

        let errorMessage = '语音朗读失败';
        switch (event.error) {
            case 'interrupted':
                errorMessage = '语音朗读被中断';
                break;
            case 'audio-busy':
                errorMessage = '音频设备繁忙';
                break;
            case 'audio-hardware':
                errorMessage = '音频硬件错误';
                break;
            case 'network':
                errorMessage = '网络错误';
                break;
            case 'synthesis-unavailable':
                errorMessage = '语音合成不可用';
                break;
        }
        showTemporaryMessage(errorMessage);
    };

    // 开始朗读
    window.speechSynthesis.speak(utterance);
}

// 停止语音朗读
function stopSpeech() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        speechState.isPlaying = false;
        speechState.currentUtterance = null;
        if (speechState.currentParagraphId) {
            updateSpeechButtonState(speechState.currentParagraphId, false);
            speechState.currentParagraphId = null;
        }
    }
}

// 更新语音按钮状态
function updateSpeechButtonState(paragraphId, isPlaying) {
    const speechBtn = document.querySelector(`.speech-btn[data-paragraph-id="${paragraphId}"]`);
    const speechIcon = speechBtn?.querySelector('.speech-icon');
    const speechText = speechBtn?.querySelector('.speech-text');

    if (speechBtn && speechIcon && speechText) {
        if (isPlaying) {
            speechBtn.classList.add('playing');
            speechIcon.innerHTML = createWordStopSpeechIcon();
            speechText.textContent = '停止朗读';
        } else {
            speechBtn.classList.remove('playing');
            speechIcon.innerHTML = createWordSpeechIcon();
            speechText.textContent = '朗读此段';
        }
    }
}

// 创建语音控制组件
function createSpeechControl(paragraph) {
    const speechControl = document.createElement('span');
    speechControl.className = 'speech-control';

    const speechBtn = document.createElement('button');
    speechBtn.className = 'speech-btn';
    speechBtn.setAttribute('data-paragraph-id', paragraph.id);
    speechBtn.setAttribute('title', '朗读此段英文内容');

    speechBtn.innerHTML = `
        ${createSpeechIcon()}
        <span class="speech-text">朗读此段</span>
    `;

    speechBtn.addEventListener('click', function () {
        console.log('添加语音点:', paragraph.en);
        speakText(paragraph.en, paragraph.id);
    });

    speechControl.appendChild(speechBtn);

    return speechControl;
}



// 在页面卸载时停止语音
window.addEventListener('beforeunload', function () {
    stopSpeech();
});

// 增强的语音控制功能（可选）
function createEnhancedSpeechControl(paragraph) {
    const speechControl = document.createElement('div');
    speechControl.className = 'speech-control';

    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.alignItems = 'center';
    controlsContainer.style.gap = '10px';
    controlsContainer.style.width = '100%';
    controlsContainer.style.justifyContent = 'space-between';

    // 主朗读按钮
    const speechBtn = document.createElement('button');
    speechBtn.className = 'speech-btn';
    speechBtn.setAttribute('data-paragraph-id', paragraph.id);
    speechBtn.setAttribute('title', '朗读此段英文内容');

    speechBtn.innerHTML = `
        ${createSpeechIcon()}
        <span class="speech-text">朗读此段</span>
    `;

    speechBtn.addEventListener('click', function () {
        speakText(paragraph.en, paragraph.id);
    });

    // 语速控制（可选）
    const speedControl = document.createElement('div');
    speedControl.style.display = 'flex';
    speedControl.style.alignItems = 'center';
    speedControl.style.gap = '5px';

    const speedLabel = document.createElement('span');
    speedLabel.className = 'speech-text';
    speedLabel.textContent = '语速:';
    speedLabel.style.fontSize = '0.7rem';

    const speedSelect = document.createElement('select');
    speedSelect.style.fontSize = '0.7rem';
    speedSelect.style.padding = '2px 4px';
    speedSelect.style.border = '1px solid var(--border-color)';
    speedSelect.style.borderRadius = '3px';
    speedSelect.style.background = 'white';

    const speeds = [
        { value: 0.7, label: '慢速' },
        { value: 0.9, label: '常速' },
        { value: 1.1, label: '快速' },
        { value: 1.3, label: '倍速' }
    ];

    speeds.forEach(speed => {
        const option = document.createElement('option');
        option.value = speed.value;
        option.textContent = speed.label;
        if (speed.value === 0.9) option.selected = true;
        speedSelect.appendChild(option);
    });

    speedSelect.addEventListener('change', function () {
        // 可以在这里保存用户偏好的语速
        localStorage.setItem('preferredSpeechRate', this.value);
    });

    // 加载保存的语速设置
    const savedRate = localStorage.getItem('preferredSpeechRate');
    if (savedRate) {
        speedSelect.value = savedRate;
    }

    speedControl.appendChild(speedLabel);
    speedControl.appendChild(speedSelect);

    controlsContainer.appendChild(speechBtn);
    controlsContainer.appendChild(speedControl);

    speechControl.appendChild(controlsContainer);

    return speechControl;
}

// 单词发音功能
const wordSpeechState = {
    isPlaying: false,
    currentUtterance: null,
    currentWord: null
};

// 朗读单词
function speakWord(word, element = null) {
    if (wordSpeechState.isPlaying) {
        stopWordSpeech();
        return;
    }

    if (!initSpeechSynthesis()) {
        showTemporaryMessage('您的浏览器不支持语音朗读功能');
        return;
    }

    // 停止当前正在播放的语音
    window.speechSynthesis.cancel();

    // 创建新的语音实例
    const utterance = new SpeechSynthesisUtterance(word);

    // 设置语音参数
    utterance.rate = 0.8;    // 单词朗读稍慢一些
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 尝试设置英语语音
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice =>
        voice.lang.startsWith('en') && voice.localService
    );

    if (englishVoice) {
        utterance.voice = englishVoice;
    } else if (voices.length > 0) {
        utterance.voice = voices[0];
    }

    // 更新状态
    wordSpeechState.isPlaying = true;
    wordSpeechState.currentUtterance = utterance;
    wordSpeechState.currentWord = word;

    // 更新按钮状态
    if (element) {
        updateWordSpeechButtonState(element, true);
    }

    // 事件监听
    utterance.onstart = function () {
        console.log('开始朗读单词:', word);
    };

    utterance.onend = function () {
        console.log('单词朗读结束');
        wordSpeechState.isPlaying = false;
        wordSpeechState.currentUtterance = null;
        wordSpeechState.currentWord = null;
        if (element) {
            updateWordSpeechButtonState(element, false);
        }
    };

    utterance.onerror = function (event) {
        console.error('单词语音朗读错误:', event.error);
        wordSpeechState.isPlaying = false;
        wordSpeechState.currentUtterance = null;
        wordSpeechState.currentWord = null;
        if (element) {
            updateWordSpeechButtonState(element, false);
        }

        let errorMessage = '单词语音朗读失败';
        switch (event.error) {
            case 'interrupted':
                errorMessage = '语音朗读被中断';
                break;
            case 'audio-busy':
                errorMessage = '音频设备繁忙';
                break;
            case 'audio-hardware':
                errorMessage = '音频硬件错误';
                break;
            case 'network':
                errorMessage = '网络错误';
                break;
            case 'synthesis-unavailable':
                errorMessage = '语音合成不可用';
                break;
        }
        showTemporaryMessage(errorMessage);
    };

    // 开始朗读
    window.speechSynthesis.speak(utterance);
}

// 停止单词语音朗读
function stopWordSpeech() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        wordSpeechState.isPlaying = false;
        wordSpeechState.currentUtterance = null;
        wordSpeechState.currentWord = null;
    }
}

// 更新单词语音按钮状态
function updateWordSpeechButtonState(element, isPlaying) {
    const speechBtn = element.closest('.word-speech-btn');
    const speechIcon = speechBtn?.querySelector('.word-speech-icon');

    if (speechBtn && speechIcon) {
        if (isPlaying) {
            speechBtn.classList.add('playing');
            speechIcon.innerHTML = createStopSpeechIcon();
        } else {
            speechBtn.classList.remove('playing');
            speechIcon.innerHTML = createSpeechIcon();
        }
    }
}

// 创建单词发音按钮
function createWordSpeechButton(word) {
    const speechBtn = document.createElement('button');
    speechBtn.className = 'word-speech-btn';
    speechBtn.setAttribute('title', `朗读单词: ${word}`);
    speechBtn.setAttribute('aria-label', `朗读单词 ${word}`);

    speechBtn.innerHTML = createWordSpeechIcon();

    speechBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // 防止事件冒泡
        speakWord(word, this);
    });

    return speechBtn;
}

// 创建单词头部（包含单词、词性、发音按钮和删除按钮）
function createWordHeader(vocab, paragraph, index) {
    const wordHeader = document.createElement('div');
    wordHeader.className = 'word-header';

    // 单词信息区域
    const wordInfo = document.createElement('div');
    wordInfo.className = 'word-info';

    // 单词文本
    const wordElement = document.createElement('div');
    wordElement.className = 'word-text';
    wordElement.textContent = vocab.word;

    // 词性标签
    if (vocab.pos && vocab.pos.trim()) {
        const posTag = document.createElement('span');
        posTag.className = 'pos-tag';

        const currentArticle = getCurrentArticle();
        const posType = currentArticle.pos_types && currentArticle.pos_types[vocab.pos]
            ? currentArticle.pos_types[vocab.pos]
            : { en: vocab.pos, cn: vocab.pos };

        posTag.textContent = posType.cn || posType.en || vocab.pos;
        posTag.title = `${posType.en} - ${posType.cn}`;

        wordInfo.appendChild(wordElement);
        wordInfo.appendChild(posTag);
    } else {
        wordInfo.appendChild(wordElement);
    }

    // 单词操作区域
    const wordActions = document.createElement('div');
    wordActions.className = 'word-actions';

    // 发音按钮
    const speechBtn = createWordSpeechButton(vocab.word);
    wordActions.appendChild(speechBtn);

    // 删除按钮
    const deleteBtn = createDeleteButton(vocab, paragraph, index);
    wordActions.appendChild(deleteBtn);

    wordHeader.appendChild(wordInfo);
    wordHeader.appendChild(wordActions);

    return wordHeader;
}
// 创建删除按钮
function createDeleteButton(vocab, paragraph, index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('title', `删除单词: ${vocab.word}`);
    deleteBtn.setAttribute('aria-label', `删除单词 ${vocab.word}`);

    // 创建SVG叉号图标
    deleteBtn.innerHTML = `
        <svg class="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6L18 18M6 18L18 6"/>
        </svg>
    `;

    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // 防止事件冒泡
        deleteVocabItem(vocab, paragraph, index);
    });

    return deleteBtn;
}

// 删除单词功能
function deleteVocabItem(vocab, paragraph, index) {
    if (!confirm(`确定要删除单词 "${vocab.word}" 吗？`)) {
        return;
    }

    const currentArticle = getCurrentArticle();
    const currentParagraph = currentArticle.paras.find(p => p.id === paragraph.id);

    if (currentParagraph && currentParagraph.vocab) {
        // 从数组中删除指定索引的单词
        currentParagraph.vocab.splice(index, 1);

        // 重新构建词典并渲染页面
        buildWordDictionary();
        renderPage();

        showTemporaryMessage(`已删除单词: "${vocab.word}"`);
    }
}

function createGrammarDeleteButton(grammar, paragraph, index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('title', `删除语法点: ${grammar.rule}`);
    deleteBtn.setAttribute('aria-label', `删除语法点 ${grammar.rule}`);

    deleteBtn.innerHTML = `
        <svg class="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6L18 18M6 18L18 6"/>
        </svg>
    `;

    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteGrammarItem(grammar, paragraph, index);
    });

    return deleteBtn;
}
// 删除语法功能
function deleteGrammarItem(grammar, paragraph, index) {
    if (!confirm(`确定要删除语法点 "${grammar.rule}" 吗？`)) {
        return;
    }

    const currentArticle = getCurrentArticle();
    const currentParagraph = currentArticle.paras.find(p => p.id === paragraph.id);

    if (currentParagraph && currentParagraph.gram) {
        currentParagraph.gram.splice(index, 1);
        renderPage();
        showTemporaryMessage(`已删除语法点: "${grammar.rule}"`);
    }
}
function initGlobalSpeechControl() {
    // 在页面失去焦点时暂停所有语音
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopSpeech();
            stopWordSpeech();
        }
    });

    // 在页面卸载时停止所有语音
    window.addEventListener('beforeunload', function () {
        stopSpeech();
        stopWordSpeech();
    });

    // ESC键停止所有语音
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            stopSpeech();
            stopWordSpeech();
        }
    });
}


// 动态导入功能
function initDynamicImport() {
    // 动态导入按钮事件
    document.getElementById('dynamic-import-btn').addEventListener('click', function () {
        showDynamicImportModal();
    });

    // 动态导入模态框事件
    document.getElementById('cancel-dynamic-import-btn').addEventListener('click', function () {
        hideAllModals();
    });

    document.getElementById('confirm-dynamic-import-btn').addEventListener('click', function () {
        startDynamicImport();
    });

    // 预设库按钮事件
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            document.getElementById('js-file-url').value = url;
        });
    });
}

// 显示动态导入模态框
function showDynamicImportModal() {
    const modal = document.getElementById('dynamic-import-modal');
    document.getElementById('js-file-url').value = '';
    document.getElementById('dynamic-overwrite').checked = true;
    document.getElementById('dynamic-merge').checked = true;

    // 隐藏进度和结果
    document.querySelector('.import-progress').style.display = 'none';
    document.getElementById('dynamic-import-result').style.display = 'none';

    modal.classList.add('show');
}

// 开始动态导入
function startDynamicImport() {
    const url = document.getElementById('js-file-url').value.trim();
    const overwrite = document.getElementById('dynamic-overwrite').checked;
    const merge = document.getElementById('dynamic-merge').checked;

    if (!url) {
        showTemporaryMessage('请输入文件URL');
        return;
    }

    // 显示进度
    const progressContainer = document.querySelector('.import-progress');
    const progressBar = progressContainer.querySelector('.progress-bar');
    const progressText = progressContainer.querySelector('.progress-text');

    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    progressText.textContent = '正在加载JS文件...';

    // 禁用按钮
    const confirmBtn = document.getElementById('confirm-dynamic-import-btn');
    const cancelBtn = document.getElementById('cancel-dynamic-import-btn');
    confirmBtn.disabled = true;
    cancelBtn.disabled = true;

    // 创建加载状态提示
    const loadingStatus = createLoadingStatus('正在导入文章，请稍候...');
    document.body.appendChild(loadingStatus);

    // 动态加载JS文件
    loadExternalJS(url)
        .then(articles => {
            updateDataProgress(50, '正在处理文章数据...');

            // 处理导入的文章
            const result = processDynamicImport(articles, overwrite, merge);

            updateDataProgress(100, '导入完成！');

            // 显示导入结果
            showDynamicImportResult(result);

            // 如果导入成功，重新渲染页面
            if (result.successCount > 0) {
                setTimeout(() => {

                    renderPage();
                }, 1000);
            }
        })
        .catch(error => {
            console.error('动态导入失败:', error);
            showDynamicImportResult({
                successCount: 0,
                total: 0,
                errors: [`导入失败: ${error.message}`]
            });
        })
        .finally(() => {
            // 恢复按钮状态
            confirmBtn.disabled = false;
            cancelBtn.disabled = false;

            // 移除加载状态
            document.body.removeChild(loadingStatus);
        });
}

// 动态加载外部JS文件
function loadExternalJS(url) {
    return new Promise((resolve, reject) => {
        // 检查是否已经加载过相同的URL
        const existingScript = document.querySelector(`script[data-imported-url="${url}"]`);
        if (existingScript) {
            // 如果已经加载过，直接从全局变量获取
            const articles = getArticlesFromGlobal();
            if (articles && articles.length > 0) {
                resolve(articles);
                return;
            }
        }

        // 创建script标签
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('data-imported-url', url);

        // 设置超时
        const timeoutId = setTimeout(() => {
            reject(new Error('加载超时，请检查网络连接和文件URL'));
        }, 30000);

        script.onload = function () {
            clearTimeout(timeoutId);

            // 从全局变量获取文章数据
            const articles = getArticlesFromGlobal();

            if (articles && articles.length > 0) {
                resolve(articles);
            } else {
                reject(new Error('JS文件未导出有效的文章数据'));
            }
        };

        script.onerror = function () {
            clearTimeout(timeoutId);
            reject(new Error('无法加载JS文件，请检查URL是否正确'));
        };

        document.head.appendChild(script);
    });
}

// 从全局变量获取文章数据（支持多种导出格式）
function getArticlesFromGlobal() {
    // 支持多种可能的全局变量名
    const possibleGlobals = [
        'externalArticles',
        'articlesData',
        'englishArticles',
        'articleLibrary',
        'window.articles',
        'articles'
    ];

    for (const globalName of possibleGlobals) {
        try {
            // 尝试从window对象获取
            let articles = window[globalName];

            // 如果直接是数组，返回
            if (Array.isArray(articles)) {
                return articles;
            }

            // 如果是对象，尝试从default属性获取
            if (articles && articles.default && Array.isArray(articles.default)) {
                return articles.default;
            }
        } catch (error) {
            // 忽略错误，继续尝试下一个
            continue;
        }
    }

    return null;
}

// 处理动态导入的文章数据
function processDynamicImport(importedArticles, overwrite, merge) {
    let successCount = 0;
    let skipCount = 0;
    let overwriteCount = 0;
    const errors = [];

    // 验证文章数据
    const validationResult = validateArticles(importedArticles);
    if (!validationResult.valid) {
        return {
            successCount: 0,
            skipCount: 0,
            overwriteCount: 0,
            errors: [validationResult.error],
            total: importedArticles.length
        };
    }

    // 如果不合并，清空现有文章（除了当前文章）
    if (!merge) {
        const currentArticleId = appState.currentArticleId;
        articlesData.length = 0;
        // 保留当前文章
        const currentArticle = getCurrentArticle();
        if (currentArticle) {
            articlesData.push(currentArticle);
        }
    }

    // 处理每篇文章
    importedArticles.forEach(article => {
        initArtcleData(article);
        const existingIndex = articlesData.findIndex(a => a.id === article.id);

        if (existingIndex !== -1) {
            if (overwrite) {
                // 覆盖现有文章
                articlesData[existingIndex] = article;
                overwriteCount++;
                successCount++;
            } else {
                // 跳过重复文章
                skipCount++;
                errors.push(`跳过重复文章: ${article.title} (ID: ${article.id})`);
            }
        } else {
            // 添加新文章
            console.log("new article", article);
            articlesData.push(article);
            successCount++;
        }
    });

    return {
        successCount,
        skipCount,
        overwriteCount,
        errors,
        total: importedArticles.length
    };
}

// 更新导入进度
function updateDataProgress(percent, text) {
    const progressBar = document.querySelector('.import-progress .progress-bar');
    const progressText = document.querySelector('.import-progress .progress-text');

    if (progressBar && progressText) {
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';
        progressText.textContent = text;
    }
}

// 显示动态导入结果
function showDynamicImportResult(result) {
    const resultContainer = document.getElementById('dynamic-import-result');
    let html = '';

    if (result.successCount > 0) {
        html = `<div class="import-result success">
            <strong>导入成功！</strong><br>
            成功导入/更新: ${result.successCount} 篇文章<br>
            ${result.overwriteCount > 0 ? `覆盖: ${result.overwriteCount} 篇<br>` : ''}
            ${result.skipCount > 0 ? `跳过重复: ${result.skipCount} 篇<br>` : ''}
            总计处理: ${result.total} 篇
        </div>`;
    } else {
        html = `<div class="import-result error">
            <strong>导入失败！</strong><br>
            ${result.errors.join('<br>')}
        </div>`;
    }

    resultContainer.innerHTML = html;
    resultContainer.style.display = 'block';

    // 滚动到结果区域
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// 创建加载状态提示
function createLoadingStatus(message) {
    const status = document.createElement('div');
    status.className = 'batch-operation-status';
    status.innerHTML = `
        <div class="loading-spinner"></div>
        <div>${message}</div>
    `;
    return status;
}

// 批量导入示例函数（用于测试）
function demoBatchImport() {
    // 这是一个示例函数，展示如何批量导入
    const demoArticles = [
        {
            "id": "demo_1",
            "title": "示例文章 1",
            "info": {
                "author": "系统",
                "source": "示例库",
                "level": "B1",
                "tags": ["示例"]
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
                    "en": "This is a demo paragraph for testing.",
                    "cn": "这是一个用于测试的示例段落。",
                    "vocab": [
                        {
                            "word": "demo",
                            "ph": "/ˈdeməʊ/",
                            "mean": "演示",
                            "ex": "This is just a demo version."
                        }
                    ],
                    "gram": [
                        {
                            "rule": "simple present tense",
                            "cat": "T",
                            "desc": "一般现在时用法",
                            "ex": "I work every day."
                        }
                    ]
                }
            ],
            "note": "这是一个示例文章"
        }
        // 可以添加更多示例文章...
    ];

    return processDynamicImport(demoArticles, true, true);
}

// 文章目录功能
function initArticleCatalog() {
    const catalog = document.getElementById('article-catalog');
    const catalogToggle = document.getElementById('catalog-toggle');
    const catalogClose = document.getElementById('catalog-close');
    const catalogSearch = document.getElementById('catalog-search');
    const catalogList = document.getElementById('catalog-list');
    const catalogStats = document.getElementById('catalog-stats');
    const refreshCatalog = document.getElementById('refresh-catalog');

    // 切换目录显示
    catalogToggle.addEventListener('click', function () {
        console.log("点击目录");
        catalog.classList.add('show');
        renderCatalogList();
    });

    // 关闭目录
    catalogClose.addEventListener('click', function () {
        catalog.classList.remove('show');
    });

    // 点击目录外部关闭
    document.addEventListener('click', function (e) {
        if (!catalog.contains(e.target) && !catalogToggle.contains(e.target) && catalog.classList.contains('show')) {
            // 需要变成一个
            catalog.classList.remove('show');
        }
    });

    // 搜索功能
    catalogSearch.addEventListener('input', function () {
        renderCatalogList(this.value.trim());
    });

    // 刷新目录
    refreshCatalog.addEventListener('click', function () {
        renderCatalogList();
        showTemporaryMessage('目录已刷新');
    });

    // 初始渲染目录
    renderCatalogList();
}

// 渲染目录列表
function renderCatalogList(searchTerm = '') {
    const catalogList = document.getElementById('catalog-list');
    const catalogStats = document.getElementById('catalog-stats');

    // 过滤文章
    let filteredArticles = articlesData;
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredArticles = articlesData.filter(article => {
            return (
                article.title.toLowerCase().includes(searchLower) ||
                (article.info.author && article.info.author.toLowerCase().includes(searchLower)) ||
                (article.info.tags && article.info.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
                (article.info.level && article.info.level.toLowerCase().includes(searchLower))
            );
        });
    }

    // 更新统计信息
    catalogStats.textContent = `共加载 ${filteredArticles.length} 篇文章${searchTerm ? ` (搜索: "${searchTerm}")` : ''}`;

    // 清空列表
    catalogList.innerHTML = '';

    if (filteredArticles.length === 0) {
        catalogList.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; color: var(--text-light);">
                <i class="bi bi-search" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                <div>没有找到匹配的文章</div>
            </div>
        `;
        return;
    }

    // 渲染文章列表
    filteredArticles.forEach(article => {
        const catalogItem = document.createElement('div');
        catalogItem.className = `article-catalog-item ${article.id === appState.currentArticleId ? 'active' : ''}`;
        catalogItem.setAttribute('data-article-id', article.id);

        // 构建标签HTML
        const tagsHtml = article.info.tags && article.info.tags.length > 0
            ? article.info.tags.map(tag => `<span class="catalog-tag">${tag}</span>`).join('')
            : '';

        // 构建元数据HTML
        const metaHtml = `
            <span>${article.info.author || '未知作者'}</span>
            ${article.info.level ? `<span class="catalog-item-level">${article.info.level}</span>` : ''}
        `;

        catalogItem.innerHTML = `
            <div class="catalog-item-title">${article.title}</div>
            <div class="catalog-item-meta">${metaHtml}</div>
            ${tagsHtml ? `<div class="catalog-item-tags">${tagsHtml}</div>` : ''}
        `;

        // 添加点击事件
        catalogItem.addEventListener('click', function () {
            switchArticle(article.id);
            document.getElementById('article-catalog').classList.remove('show');
        });

        catalogList.appendChild(catalogItem);
    });
}
// 更新目录中的当前文章高亮
function updateCatalogHighlight() {
    document.querySelectorAll('.article-catalog-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-article-id') === appState.currentArticleId) {
            item.classList.add('active');
        }
    });
}

