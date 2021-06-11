var gCanvas = null
var gCtx = null
var gIsCanvasChange = true

var gFillColor = '#ffffff'
var gStrokeColor = '#000000'
var gFontFamily = ''

function initCanvas(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.lineWidth = 1
    _adjustCanvasSize()
}

function renderMeme() {
    
    var img = new Image()
    var imgs = getImgs()
    var meme = getCurrMeme()

    if(gIsCanvasChange) _adjustCanvasSize()

    var currImg = imgs.find(img => {
        return img.id === meme.selectedImgId
    })

    if(!currImg) return

    img.src = currImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        _drawText(150,150)
    }
}

function setFont(fontFamily) {
    gFontFamily = fontFamily
}

function flagCanvasSizeChange(){
    gIsCanvasChange = true
}

function setFillColor(color){
    gFillColor = color
}

function setStrokeColor(color){
    gStrokeColor = color
}

function getFillColor(){
    return gFillColor
}

function getStrokeColor(){
    return gStrokeColor
}

function getCanvasSize(){
    if(gCtx.canvas.width === 450)    return 'large'
    return 'small'
}

// Private functions.

function _drawText(x, y) {
    var meme = getCurrMeme()
    var currLine = meme.selectedLineIdx

    meme.lines.forEach((line, idx) => {

        if(currLine === idx){
            _drawRect(line.x, line.y)
        }   

        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        gCtx.txt = line.txt
        gCtx.font = `${line.size}px ${gFontFamily}`
        gCtx.textAlign = line.align

        var x = _getX(line.align)
        gCtx.fillText(line.txt, x, line.y)
        gCtx.strokeText(line.txt, x, line.y)
        
    })
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

function _getX(align){
    switch (align) {
        case 'left': return 10
        case 'center': return gCanvas.width / 2
        case 'right': return gCanvas.width - 10
    }
}

function _adjustCanvasSize(){
    if(window.innerWidth < 520){
        gCtx.canvas.width = gCtx.canvas.height = 300
    } else {
        gCtx.canvas.width = gCtx.canvas.height = 450
    }
}
