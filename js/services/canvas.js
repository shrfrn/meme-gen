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
    var imgs = getImgs()

    var currImg = imgs.find(img => {
        return img.id === meme.selectedImgId
    })

    if(!currImg) return
    img.src = currImg.url;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        _drawText('Hello', 150,150)
    }
}

function _drawText(text, x, y) {
    var meme = getCurrMeme()
    var currLine = meme.selectedLineIdx

    meme.lines.forEach((line, idx) => {

        if(currLine === idx){
            _drawRect(line.x, line.y)
        }   

        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        gCtx.txt = text
        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = line.align

        var x = _getX(line.align)
        gCtx.fillText(line.txt, x, line.y)
        gCtx.strokeText(line.txt, x, line.y)
        
    })
}

function _getX(align){
    switch (align) {
        case 'left': return 10
        case 'center': return gCanvas.width / 2
        case 'right': return gCanvas.width - 10
    }
}
function _drawRect(x, y) {   // Not using x here...
    gCtx.beginPath()
    gCtx.rect(6, y + 3, gCanvas.width - 12, -40)
    gCtx.fillStyle = 'orange'
    gCtx.globalAlpha = 0.1
    gCtx.fillRect(6, y + 3, gCanvas.width - 12, -40)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.globalAlpha = 1
}
