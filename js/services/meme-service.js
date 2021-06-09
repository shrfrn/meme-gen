'use strict';

const IMG_DB = 'meme images';

const DEFAULT_TEXT = 'Enter Text...'
const DEFAULT_FONT_SIZE = 40
const DEFAULT_ALIGNMENT = 'left'
const DEFAULT_FILL = 'white'
const DEFAULT_STROKE = 'black'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{
    id: 1,
    url: '../../img/2.jpg',
    keywords: ['happy']
}]

var gMeme = {
    selectedImgId: 5,
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

// function initMemes() {

//     loadImgList()

//     if (!gImgs || gImgs.length === 0) {
//         gImgs = [{
//             id: 1,
//             url: '../../img/2.jpg',
//             keywords: ['happy']
//         }];
//     }
// }

// function loadImgList() {
//     gImgs = loadFromStorage(IMG_DB)
// }
// function createMeme(imgId) {
//     gMeme = {
//         selectedImgId: id,
//         selectedLineIdx: 0,
//         lines: [
//             {
//                 txt: DEFAULT_TEXT,
//                 size: DEFAULT_FONT_SIZE,
//                 align: DEFAULT_ALIGNMENT,
//                 fill: DEFAULT_FILL,
//                 stroke: DEFAULT_STROKE,
//             }
//         ]
//     }
// }

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
    return line
}