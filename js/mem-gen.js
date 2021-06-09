'use strict';

function init(){
    initCanvas()
    initGallery()
    renderMeme()
    _loadCurrLineToInputEl()
}

function setText(elInput){
    var meme = getCurrMeme()
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].txt = elInput.value
    elInput.value = ''
    renderMeme()
}

function setImage(elImg){

    var imgId = elImg.dataset.id
    setCurrImg(imgId)
    renderMeme()
}

function onAdjustFontSize(diff){
    var meme = getCurrMeme()
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].size += diff
    renderMeme(meme.lines[0].txt, 150, 150)
}

function onAddTextLine(){
    var lineIdx = createTextLine(200, 200)
    renderMeme(gImgs[0].url);
    _loadCurrLineToInputEl()
}

function onMoveLine(dir){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].y += dir * 10
    renderMeme()
}

function onAlignLine(dir){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].align = dir
    renderMeme()
}

function onSwitchLine(){
    var meme = getCurrMeme();

    if( ++meme.selectedLineIdx === meme.lines.length){
        meme.selectedLineIdx = 0
    }

    renderMeme()
    _loadCurrLineToInputEl()
}

function _loadCurrLineToInputEl(){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx
    var elInput = document.querySelector('[name=curr-meme-line]');

    elInput.value = meme.lines[currLine].txt
}

function initGallery(){

    var strHTML = ''
    var imgs = getImgs()
    var elGallery = document.querySelector('.gallery');

    imgs.forEach(img => {
        strHTML += `\t<img data-id="${img.id}" src="${img.url}" onclick="setImage(this)" alt=""></img>\n`
    })
    // <img src="img/2.jpg" onclick="setImage(this)" alt="">

    elGallery.innerHTML = strHTML
}