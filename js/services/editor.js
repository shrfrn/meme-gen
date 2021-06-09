var gCanvas = null
var gCtx = null

function initCanvas(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.lineWidth = 2
}

function renderMeme() {
    
    var meme = getCurrMeme()
    var img = new Image()
    img.src = gImgs[meme.selectedImgId].url;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        _drawText('Hello', 150,150)
    }
}

function _drawText(text, x, y) {
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

