'use strict';

const MEMERRR_DB = 'meme images';

const DEFAULT_TEXT = 'Enter Text...'
const DEFAULT_FONT_SIZE = 40
const DEFAULT_ALIGNMENT = 'left'
const DEFAULT_FILL = '#ffffff'
const DEFAULT_STROKE = '#000000'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    {
        id: "2",
        url: 'img/2.jpg',
        keywords: ['happy']
    },
    {
        id: "3",
        url: 'img/3.jpg',
        keywords: ['happy']
    },
    {
        id: "4",
        url: 'img/4.jpg',
        keywords: ['happy']
    },
    {
        id: "5",
        url: 'img/5.jpg',
        keywords: ['happy']
    },
    {
        id: "6",
        url: 'img/6.jpg',
        keywords: ['happy']
    },
    {
        id: "7",
        url: 'img/7.jpg',
        keywords: ['happy']
    },
    {
        id: "8",
        url: 'img/8.jpg',
        keywords: ['happy']
    },
    {
        id: "9",
        url: 'img/9.jpg',
        keywords: ['happy']
    },
    {
        id: "1",
        url: 'img/1.jpg',
        keywords: ['happy']
    },
]

var gMeme = createMeme()

function getImgs() {
    return gImgs
}

function setCurrImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getCurrMeme() {
    return gMeme;
}

function createMeme() {
    gMeme = {
        id: makeId(),
        selectedImgId: 0,
        selectedLineIdx: 0,
        thumbnail: '',
        lines: [{
            txt: DEFAULT_TEXT,
            size: DEFAULT_FONT_SIZE,
            align: DEFAULT_ALIGNMENT,
            fill: DEFAULT_FILL,
            stroke: DEFAULT_STROKE,
            x: 50,
            y: 50,
        }]
    }
}
function createTextLine(x, y) {

    var line = {
        txt: DEFAULT_TEXT,
        size: DEFAULT_FONT_SIZE,
        align: DEFAULT_ALIGNMENT,
        fill: getFillColor(),
        stroke: getStrokeColor(),
        x,
        y,
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function loadMemes() {
    var savedMemes = loadFromStorage(MEMERRR_DB)

    if (!savedMemes) savedMemes = []
    return savedMemes;
}

function getMeme(memeId) {
    var savedMemes = loadMemes()
    var savedMeme = savedMemes.find(savedMeme => savedMeme.id === memeId)

    return savedMeme
}

function saveMeme(meme) {
    var savedMemes = loadMemes()

    savedMemes.push(meme)
    saveToStorage(MEMERRR_DB, savedMemes)
}

function updateMeme(meme) {
    var savedMemes = loadMemes()
    var currMemeIdx = savedMemes.findIndex(savedMeme => savedMeme.id === meme.id)

    // savedMemes[currMemeIdx] = JSON.parse(JSON.stringify(meme))
    Object.assign(savedMemes[currMemeIdx], meme)
    savedMemes[currMemeIdx].lines = []
    meme.lines.forEach(line => savedMemes[currMemeIdx].lines.push(line))
    saveToStorage(MEMERRR_DB, savedMemes)
}

function deleteMeme(meme) {
    var savedMemes = loadMemes()
    var savedMemeIdx = savedMemes.findIndex(savedMeme => savedMeme.id === meme.id)

    savedMemes.splice(savedMemeIdx, 1)
    saveToStorage(MEMERRR_DB, savedMemes)
}