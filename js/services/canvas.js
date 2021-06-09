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
        console.log(text, x, y);
        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        
    })
}

function _drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, 300, -40)
    gCtx.fillStyle = 'orange'
    gCtx.globalAlpha = 0.1
    gCtx.fillRect(x, y, 300, -40)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
    gCtx.globalAlpha = 1
}
