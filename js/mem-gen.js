'use strict';

function init(){
    console.log('init!');
    initCanvas();
    renderMeme(gImgs[0].url)
    console.log(gMeme.lines[0].txt);
    // drawText(gMeme.lines[0].txt, 0, 150)
}

function setText(elInput){
    var meme = getCurrMeme()
    var currLine = meme.selectedLineIdx

    meme.lines[currLine].txt = elInput.value
    elInput.value = ''
    renderMeme()
}

function setImage(elImg){
    renderMeme(elImg.src)
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
}