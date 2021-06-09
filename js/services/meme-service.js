'use strict';

const IMG_DB = 'meme images';

const DEFAULT_TEXT = 'Enter Text...'
const DEFAULT_FONT_SIZE = 40
const DEFAULT_ALIGNMENT = 'left'
const DEFAULT_FILL = 'white'
const DEFAULT_STROKE = 'black'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    {
        id: "2",
        url: '../../img/2.jpg',
        keywords: ['happy']
    },
    {
        id: "3",
        url: '../../img/3.jpg',
        keywords: ['happy']
    },
    {
        id: "4",
        url: '../../img/4.jpg',
        keywords: ['happy']
    },
    {
        id: "5",
        url: '../../img/5.jpg',
        keywords: ['happy']
    },
    {
        id: "6",
        url: '../../img/6.jpg',
        keywords: ['happy']
    },
    {
        id: "7",
        url: '../../img/7.jpg',
        keywords: ['happy']
    },
    {
        id: "8",
        url: '../../img/8.jpg',
        keywords: ['happy']
    },
    {
        id: "9",
        url: '../../img/9.jpg',
        keywords: ['happy']
    },
    {
        id: "1",
        url: '../../img/1.jpg',
        keywords: ['happy']
    },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Hi there',
        size: DEFAULT_FONT_SIZE,
        align: DEFAULT_ALIGNMENT,
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE,
        x: 50,
        y: 50,
    },
    {
        txt: 'Keep at it!',
        size: DEFAULT_FONT_SIZE,
        align: DEFAULT_ALIGNMENT,
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE,
        x: 100,
        y: 100,
    }]
}

function getImgs(){
    return gImgs
}

function setCurrImg(imgId){
    gMeme.selectedImgId = imgId
}

function getCurrMeme() {
    return gMeme;
}

function createTextLine(x = 0, y = 0) {

    var line = {
        txt: DEFAULT_TEXT,
        size: DEFAULT_FONT_SIZE,
        align: DEFAULT_ALIGNMENT,
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE,
        x,
        y,
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    return line
}