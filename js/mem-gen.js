'use strict';

function init(){
    initCanvas()
    initGallery()
    renderMeme()
    _loadCurrLineToInputEl()
    _initColorPickers()
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
    createTextLine(200, 200)
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

function onSetFillColor(elColorPicker){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].fill = elColorPicker.value
    renderMeme()
}
function onSetLineColor(elColorPicker){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].stroke = elColorPicker.value
    renderMeme()
}

function downloadImg(){
    const data = gCanvas.toDataURL()
    var elLink = document.querySelector('#download-link');
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

// function downloadImg(elLink){
//     const data = gCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'my-img.jpg'
// }

function _loadCurrLineToInputEl(){
    var meme = getCurrMeme();
    var currLine = meme.selectedLineIdx
    var elInput = document.querySelector('[name=curr-meme-line]');

    elInput.value = meme.lines[currLine].txt
    elInput.select()
}

function _initColorPickers(){
    var elFillColorPicker = document.querySelector('#fill-color-picker');
    var elLineColorPicker = document.querySelector('#line-color-picker');

    elFillColorPicker.value = DEFAULT_FILL
    elLineColorPicker.value = DEFAULT_STROKE
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