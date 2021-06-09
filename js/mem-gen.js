'use strict';

function init(){
    console.log('init!');
    initCanvas();
    renderMeme(gImgs[0].url)
    console.log(gMeme.lines[0].txt);
    // drawText(gMeme.lines[0].txt, 0, 150)
}

function setText(elInput){
    drawText(elInput.value, 50, 50)
}

function setImage(elImg){
    renderMeme(elImg.src)
}