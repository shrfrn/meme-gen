'use strict';

function init(){
    console.log('init!');
    initCanvas();
    drawMeme(gImgs[0].url)
    console.log(gMeme.lines[0].txt);
    // drawText(gMeme.lines[0].txt, 0, 150)
}