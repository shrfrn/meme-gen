var gCanvas = null
var gCtx = null

function initCanvas(){
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
}

function drawMeme(src) {
    var img = new Image()
    img.src = src;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) 
        drawText('Hello', 50,50)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'red'
    gCtx.font = '40px Arial'
    console.log(text, x, y);
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

