var gCanvas = null
var gCtx = null

function initCanvas(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.lineWidth = 2
}

function renderMeme(src) {
    
    var img = new Image()
    img.src = src;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        drawText('Hello', 150,150)
    }
}

function drawText(text, x, y) {
    var meme = getCurrMeme()

    meme.lines.forEach(line => {

        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        gCtx.txt = text
        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = line.align
        console.log(text, x, y);
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    })

}

function adjustFontSize(diff){
    var meme = getCurrMeme()
    meme.lines[0].size += diff
    drawText(meme.lines[0].txt, 150, 150)
}

function addTextLine(){
    var lineIdx = createTextLine(200, 200)
    renderMeme(gImgs[0].url);
}