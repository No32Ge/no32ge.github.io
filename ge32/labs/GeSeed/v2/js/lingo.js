

export function makeABCabc_() {
    // 先生成空映射
    const letterMap = {};
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_ ';
    console.log("how long is it?", letters.length)

    for (const ch of letters) {
        letterMap[ch] = null;
    }

    return letterMap;

}

const symbolSet = new Set([
    "▲", "■", "◆", "●", "★", "▼", "✦", "□", "◇", "○", "△", "⬟", "⬢", "⬣", "⬤", "⬥", "⬦", "⬧", "⬨", "⬩", "⬪", "⬫", "⬬", "⬭", "⬮", "⬯",
    "∴", "∵", "∷", "∞", "∽", "≈", "≡", "≠", "⊕", "⊗", "⊙", "⊚", "⊛", "⊜", "⊝", "⊞", "⊟", "⊠", "⊡", "⊢", "⊣", "⊤", "⊥", "⋀", "⋁", "⋂",
    "⸺", "␣"
]);

function setToShuffledArray(set) {
    const array = Array.from(set);
    // Fisher-Yates 洗牌算法
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomSymbol(set) {
    const items = Array.from(set);
    if (items.length === 0) return null; // 取完了就返回 null

    const randomIndex = Math.floor(Math.random() * items.length);
    const symbol = items[randomIndex];
    set.delete(symbol); // 从集合中移除，防止重复取
    return symbol;
}


makeABCabc_();

console.log('sort:',setToShuffledArray(symbolSet));



// 添加方法：按顺序把数组的值依次映射进来
function fillLetterMap(map, values) {
    const keys = Object.keys(map);
    const emptyKeys = keys.filter(k => map[k] === null);

    // 去除 values 中重复值
    const uniqueValues = [...new Set(values)];

    // 已存在的值集合
    const existingValues = new Set(Object.values(map).filter(v => v !== null));

    // 过滤掉 map 中已经存在的值
    const newValues = uniqueValues.filter(v => !existingValues.has(v));

    // 检查剩余空位是否足够
    if (newValues.length > emptyKeys.length) {
        throw new Error(`剩余空位不足：还剩 ${emptyKeys.length} 个，但要写入 ${newValues.length} 个新值`);
    }

    // 顺序赋值
    for (let i = 0; i < newValues.length; i++) {
        map[emptyKeys[i]] = newValues[i];
    }

    return map;
}


const newThang = fillLetterMap(makeABCabc_(),setToShuffledArray(symbolSet))
console.log('新列表映射:',newThang);


const mappingDict = {
    textToText: {
        mapping: {
            forward: {},   // 一对多映射：text -> text[]
            reverse: {}    // 多对一反向映射：text -> [text]
        },
        updateReverse() {
            const r = {};
            for (const [k, v] of Object.entries(this.mapping.forward)) {
                if (Array.isArray(v)) {
                    for (const item of v) {
                        if (!r[item]) r[item] = [];
                        r[item].push(k);
                    }
                } else {
                    if (!r[v]) r[v] = [];
                    r[v].push(k);
                }
            }
            this.mapping.reverse = r;
        }
    }
};

function getMappingDictReverse(dict) {
    mappingDict.textToText.mapping['forward'] = dict;
    mappingDict.textToText.updateReverse();
    return mappingDict.textToText.mapping.reverse;

}


const svgMap = {
    textToSvg: {
        mapping: {
            forward: {},
            reverse: {}
        },
        updateReverse() {
            this.mapping.reverse = {};
            for (const [k, v] of Object.entries(this.mapping.forward)) {
                this.mapping.reverse[v] = k;
            }
        }
    }
};


function textReplaceCharwise(text, mapping) {
    if (typeof text !== 'string' || typeof mapping !== 'object' || mapping === null) return text;

    const chars = text.split('');
    for (let i = 0; i < chars.length; i++) {
        const mapped = mapping[chars[i]];
        if (mapped !== undefined) {
            // 如果 mapping 的值是数组，取第一个（或按需处理）
            chars[i] = Array.isArray(mapped) ? mapped[0] : mapped;
        }
    }
    return chars.join('');
}

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function generateAlphabetMapping() {
    const lower = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upper = lower.map(c => c.toUpperCase());

    const lowerShuffled = shuffleArray(lower);
    const upperShuffled = shuffleArray(upper);

    const mapping = {};
    for (let i = 0; i < 26; i++) {
        mapping[lower[i]] = lowerShuffled[i];
        mapping[upper[i]] = upperShuffled[i];
    }

    const reverse = {};
    for (const [k, v] of Object.entries(mapping)) reverse[v] = k;

    return { forward: mapping, reverse };
}

const { forward, reverse } = generateAlphabetMapping();

const test = {
    "A": "▲",
    "B": "■",
    "C": "◆",
    "D": "●",
    "E": "★",
    "F": "▼",
    "G": "✦",
    "H": "□",
    "I": "◇",
    "J": "○",
    "K": "△",
    "L": "⬟",
    "M": "⬢",
    "N": "⬣",
    "O": "⬤",
    "P": "⬥",
    "Q": "⬦",
    "R": "⬧",
    "S": "⬨",
    "T": "⬩",
    "U": "⬪",
    "V": "⬫",
    "W": "⬬",
    "X": "⬭",
    "Y": "⬮",
    "Z": "⬯",

    "a": "∴",
    "b": "∵",
    "c": "∷",
    "d": "∞",
    "e": "∽",
    "f": "≈",
    "g": "≡",
    "h": "≠",
    "i": "⊕",
    "j": "⊗",
    "k": "⊙",
    "l": "⊚",
    "m": "⊛",
    "n": "⊜",
    "o": "⊝",
    "p": "⊞",
    "q": "⊟",
    "r": "⊠",
    "s": "⊡",
    "t": "⊢",
    "u": "⊣",
    "v": "⊤",
    "w": "⊥",
    "x": "⋀",
    "y": "⋁",
    "z": "⋂",

    "-": "⸺",
    " ": "␣"
}


const revs = getMappingDictReverse(newThang)

const msg = "Next week I start fifth grade. Since I've never been to a real school before,\n I am pretty much totally and completely petrified. People think I haven't gone to school because of the way I look, but it's not that. It's because of all the surgeries I've had. Twenty-seven since I was born. The bigger ones happened before I was even four years old, so I don't remember those. But I've had two or three surgeries every year since then (some big, some small), and because I'm little for my age, and I have some other medical mysteries that doctors never really figured out, I used to get sick a lot. That's why my parents decided it was better if I didn't go to school. I'm much stronger now, though. The last surgery I had was eight months ago, and I probably won't have to have any more for another couple of years.";

// 这条非常重要，可以用来按照这个格式解析映射，也就是映射的密钥可以通过这里面解析的内容进行反解析
const ABCabcKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz- ";
const enc = textReplaceCharwise(abc, newThang);
const dec = textReplaceCharwise(enc, revs);

console.log('Reverse', revs);
console.log("Original:", msg);
console.log("Encrypted:", enc);
console.log("Decrypted:", dec);
console.log('forw', forward)
