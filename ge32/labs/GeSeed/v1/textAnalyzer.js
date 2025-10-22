// textAnalyzer.js

/**
 * 文本分析强悍版模块
 * 功能：
 * - 单词统计、句子统计、段落统计
 * - 重复率、平均句子/单词/段落长度
 * - 高频词、低频词、n-gram分析
 * - 可读性分析（Flesch Reading Ease）
 * - 中文、英文支持
 * - 数据导出 JSON / CSV
 * - 新增：频率到单词的映射集合和快捷分析方法
 * 
 * @author ge32
 */

export class TextAnalyzer {
    constructor(text = '', options = {}) {
        this.text = text || '';
        this.options = {
            language: 'auto', // auto / en / zh
            stopWords: [],    // 停用词列表
            nGram: 1,         // 支持 n-gram 统计
            topN: 20,         // 返回前 N 高频词
            ...options
        };
        this.stats = {};
        this.analyze();
    }

    setText(text) {
        this.text = text;
        this.analyze();
    }

    analyze() {
        const text = this.text;
        if (!text || text.trim().length === 0) {
            this.stats = {};
            return;
        }

        // 自动检测语言
        let lang = this.options.language;
        if (lang === 'auto') {
            lang = /[\u4e00-\u9fff]/.test(text) ? 'zh' : 'en';
        }

        if (lang === 'en') {
            this._analyzeEnglish(text);
        } else {
            this._analyzeChinese(text);
        }

        // 构建频率映射集合并添加到stats中
        this._buildFrequencyMap();
    }

    // 新增：构建频率到单词的映射集合
    _buildFrequencyMap() {
        const frequencyMap = {};
        
        if (!this.stats.wordFrequency) return;
        
        const wordFrequency = this.stats.wordFrequency;
        
        // 构建频率到单词集合的映射
        Object.entries(wordFrequency).forEach(([word, frequency]) => {
            if (!frequencyMap[frequency]) {
                frequencyMap[frequency] = [];
            }
            frequencyMap[frequency].push(word);
        });

        // 按频率排序并添加到stats中
        this.stats.frequencyMap = frequencyMap;
        
        // 同时添加频率分布统计
        this.stats.frequencyDistribution = Object.entries(frequencyMap)
            .map(([frequency, words]) => ({
                frequency: parseInt(frequency),
                wordCount: words.length,
                words: words.sort()
            }))
            .sort((a, b) => b.frequency - a.frequency);
    }

    // 新增：获取指定频率对应的单词集合
    getWordsByFrequency(frequency) {
        return this.stats.frequencyMap?.[frequency] || [];
    }

    // 新增：获取所有频率及其对应的单词数量
    getFrequencyDistribution() {
        return this.stats.frequencyDistribution || [];
    }

    // 新增：获取高频词（按频率分组）
    getWordsByFrequencyRange(minFrequency = 1, maxFrequency = Infinity) {
        return this.stats.frequencyDistribution?.filter(item => 
            item.frequency >= minFrequency && item.frequency <= maxFrequency
        ) || [];
    }

    // ========== 英文分析 ==========
    _analyzeEnglish(text) {
        // 清理文本
        const cleanText = text.replace(/[^\w\s]/g, ' ');
        const words = cleanText.toLowerCase()
            .split(/\s+/)
            .filter(w => w.length > 0 && !this.options.stopWords.includes(w));

        const totalWords = words.length;

        // 单词频率统计
        const wordFrequency = {};
        words.forEach(word => {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        const uniqueWords = Object.keys(wordFrequency).length;
        const repeatedWords = totalWords - uniqueWords;
        const repetitionRate = totalWords > 0 ? (repeatedWords / totalWords) * 100 : 0;

        // 句子
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;

        // 段落
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const paragraphCount = paragraphs.length || 1;

        // 平均长度
        const totalChars = words.reduce((sum, w) => sum + w.length, 0);
        const avgSentenceLength = sentenceCount > 0 ? totalWords / sentenceCount : 0;
        const avgWordLength = totalWords > 0 ? totalChars / totalWords : 0;
        const avgParagraphLength = paragraphCount > 0 ? sentenceCount / paragraphCount : 0;
        const wordsPerParagraph = paragraphCount > 0 ? totalWords / paragraphCount : 0;
        const sentencesPerParagraph = paragraphCount > 0 ? sentenceCount / paragraphCount : 0;

        // n-gram
        const nGram = this.options.nGram;
        const nGramFreq = {};
        if (nGram > 1) {
            for (let i = 0; i <= words.length - nGram; i++) {
                const gram = words.slice(i, i + nGram).join(' ');
                nGramFreq[gram] = (nGramFreq[gram] || 0) + 1;
            }
        }

        // 可读性分析（Flesch Reading Ease）
        const syllableCount = words.reduce((sum, w) => sum + this._countSyllables(w), 0);
        const fleschScore = sentenceCount > 0 && totalWords > 0
            ? 206.835 - 1.015 * (totalWords / sentenceCount) - 84.6 * (syllableCount / totalWords)
            : 0;

        this.stats = {
            language: 'en',
            totalWords,
            uniqueWords,
            repetitionRate: parseFloat(repetitionRate.toFixed(2)),
            sentenceCount,
            paragraphCount,
            avgSentenceLength: parseFloat(avgSentenceLength.toFixed(1)),
            avgWordLength: parseFloat(avgWordLength.toFixed(1)),
            avgParagraphLength: parseFloat(avgParagraphLength.toFixed(1)),
            wordsPerParagraph: parseFloat(wordsPerParagraph.toFixed(1)),
            sentencesPerParagraph: parseFloat(sentencesPerParagraph.toFixed(1)),
            wordFrequency,
            nGramFrequency: nGramFreq,
            fleschReadingEase: parseFloat(fleschScore.toFixed(2))
            // frequencyMap 和 frequencyDistribution 会在 _buildFrequencyMap 中添加
        };
    }

    _countSyllables(word) {
        word = word.toLowerCase();
        if(word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const syllables = word.match(/[aeiouy]{1,2}/g);
        return syllables ? syllables.length : 1;
    }

    // ========== 中文分析 ==========
    _analyzeChinese(text) {
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const paragraphCount = paragraphs.length || 1;

        const chars = text.replace(/\s+/g, '');
        const totalChars = chars.length;

        const sentences = text.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
        const sentenceCount = sentences.length;

        // 简单按字符统计词频
        const wordFrequency = {};
        for (let c of chars) {
            if (!this.options.stopWords.includes(c)) {
                wordFrequency[c] = (wordFrequency[c] || 0) + 1;
            }
        }

        const uniqueWords = Object.keys(wordFrequency).length;
        const repeatedWords = totalChars - uniqueWords;
        const repetitionRate = totalChars > 0 ? (repeatedWords / totalChars) * 100 : 0;

        const avgSentenceLength = sentenceCount > 0 ? totalChars / sentenceCount : 0;
        const avgWordLength = 1; // 中文单字长度固定1
        const avgParagraphLength = paragraphCount > 0 ? sentenceCount / paragraphCount : 0;
        const wordsPerParagraph = paragraphCount > 0 ? totalChars / paragraphCount : 0;
        const sentencesPerParagraph = paragraphCount > 0 ? sentenceCount / paragraphCount : 0;

        this.stats = {
            language: 'zh',
            totalWords: totalChars,
            uniqueWords,
            repetitionRate: parseFloat(repetitionRate.toFixed(2)),
            sentenceCount,
            paragraphCount,
            avgSentenceLength: parseFloat(avgSentenceLength.toFixed(1)),
            avgWordLength,
            avgParagraphLength: parseFloat(avgParagraphLength.toFixed(1)),
            wordsPerParagraph: parseFloat(wordsPerParagraph.toFixed(1)),
            sentencesPerParagraph: parseFloat(sentencesPerParagraph.toFixed(1)),
            wordFrequency,
            nGramFrequency: {},  // 中文默认不做 n-gram
            fleschReadingEase: null
            // frequencyMap 和 frequencyDistribution 会在 _buildFrequencyMap 中添加
        };
    }

    getStats() {
        return this.stats;
    }

    getTopWords(limit = this.options.topN) {
        return Object.entries(this.stats.wordFrequency)
            .sort((a,b) => b[1]-a[1])
            .slice(0, limit);
    }

    // 新增：快捷静态方法 - 避免重复实例化
    static quickAnalyze(text, options = {}) {
        const analyzer = new TextAnalyzer(text, options);
        const stats = analyzer.getStats();
        
        return {
            wordCount: stats.totalWords,
            uniqueWordCount: stats.uniqueWords,
            repetitionRate: stats.repetitionRate,
            sentenceCount: stats.sentenceCount,
            paragraphCount: stats.paragraphCount,
            // 包含频率分布信息
            topFrequencies: stats.frequencyDistribution?.slice(0, 5) || []
        };
    }

    // 新增：批量分析多个文本
    static batchAnalyze(texts, options = {}) {
        const results = [];
        const analyzer = new TextAnalyzer('', options);
        
        for (let text of texts) {
            analyzer.setText(text);
            const quickResult = TextAnalyzer.quickAnalyze(text, options);
            results.push(quickResult);
        }
        
        return results;
    }

    exportJSON() {
        return JSON.stringify(this.stats, null, 2);
    }

    exportCSV() {
        const rows = [];
        const stats = this.stats;
        rows.push(`metric,value`);
        for (let key of Object.keys(stats)) {
            if (typeof stats[key] === 'object') continue;
            rows.push(`${key},${stats[key]}`);
        }
        
        // 添加频率分布摘要
        rows.push('\n频率分布,单词数量,示例单词');
        const topFrequencies = this.stats.frequencyDistribution?.slice(0, 10) || [];
        topFrequencies.forEach(item => {
            const sampleWords = item.words.slice(0, 3).join(';');
            rows.push(`出现${item.frequency}次的单词,${item.wordCount},"${sampleWords}"`);
        });
        
        return rows.join('\n');
    }
}

// 新增：独立的快捷函数，无需实例化
export function analyzeTextQuickly(text, options = {}) {
    return TextAnalyzer.quickAnalyze(text, options);
}

export function analyzeMultipleTexts(texts, options = {}) {
    return TextAnalyzer.batchAnalyze(texts, options);
}
