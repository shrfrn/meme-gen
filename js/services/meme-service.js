'use strict';

const MEMERRR_DB = 'meme images';

const DEFAULT_TEXT = 'Enter Text...'
const DEFAULT_FONT_SIZE = 40
const DEFAULT_ALIGNMENT = 'left'
const DEFAULT_FILL = '#ffffff'
const DEFAULT_STROKE = '#000000'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gFilterBy = ''
var gImgs = [
    {
        id: "2",
        url: 'img/2.jpg',
        keywords: ['dog', 'dogs', 'puppies', 'cute']
    },
    {
        id: "3",
        url: 'img/3.jpg',
        keywords: ['baby', 'dog', 'cute']
    },
    {
        id: "4",
        url: 'img/4.jpg',
        keywords: ['cat', 'cute']
    },
    {
        id: "5",
        url: 'img/5.jpg',
        keywords: ['funny', 'child']
    },
    {
        id: "6",
        url: 'img/6.jpg',
        keywords: ['funny', 'hair']
    },
    {
        id: "7",
        url: 'img/7.jpg',
        keywords: ['funny', 'child', 'big eyes']
    },
    {
        id: "8",
        url: 'img/8.jpg',
        keywords: ['man']
    },
    {
        id: "9",
        url: 'img/9.jpg',
        keywords: ['child', 'funny']
    },
    {
        id: "1",
        url: 'img/1.jpg',
        keywords: ['crazy']
    },
]

var gMeme = createMeme()

function setFilter(filterStr){
    gFilterBy = filterStr
}

function getImgs() {

    if(gFilterBy === '') return gImgs

    var regex = new RegExp(gFilterBy, 'i')
    var imgs = gImgs.filter(img =>
        img.keywords.find(line => regex.test(line))
    )

    return imgs
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