'use strict';

const gFonts = ['impact-reg', 'lato', 'Arial', 'Courier New', 'comic-sans', 'Times New Roman', 'cursive', 'Lucida Sans'];

function init(){
    initCanvas()
    initGallery()
    renderMeme()
    _loadCurrLineToInputEl()
    _initToolBar()
}
function onShowGallery(){
    _updateNavBar('Gallery')
}
function onShowEditor(){
    _updateNavBar('Editor')
}
function onShowMemes(){
    _updateNavBar('Memes')
}
function setText(elInput){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    meme.lines[currLineIdx].txt = elInput.value
    elInput.value = ''
    renderMeme()
}

function setImage(elImg){

    var imgId = elImg.dataset.id
    setCurrImg(imgId)
    renderMeme()
}

function onAddTextLine(){
    createTextLine(200, 200)
    renderMeme(gImgs[0].url);
    _loadCurrLineToInputEl()
}

function onRemoveTextLine(){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1)  return

    meme.lines.splice(currLineIdx,1)
    if(meme.lines.length === 0){
        meme.selectedLineIdx = -1
    } else {
        meme.selectedLineIdx--
    }

    renderMeme()
}

function onAdjustFontSize(diff){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    meme.lines[currLineIdx].size += diff
    renderMeme(meme.lines[0].txt, 150, 150)
}

function onChangeFont(elFontChooser){
    var currFontIdx = gFonts.findIndex(font => font === elFontChooser.value)
    if(++currFontIdx === gFonts.length) currFontIdx = 0
    elFontChooser.style.fontFamily = gFonts[currFontIdx]
    elFontChooser.value = gFonts[currFontIdx]
    setFont(gFonts[currFontIdx])
    renderMeme()
}
function onMoveLine(dir){
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx

    meme.lines[currLineIdx].y += dir * 10
    renderMeme()
}

function onAlignLine(dir){
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx

    meme.lines[currLineIdx].align = dir
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
    var currLineIdx = meme.selectedLineIdx
    var elColorPickerIcon = document.querySelector('#fill-color-btn');
    
    elColorPickerIcon.style.color = elColorPicker.value
    meme.lines[currLineIdx].fill = elColorPicker.value
    renderMeme()
}
function onSetLineColor(elColorPicker){
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx
    var elColorPickerIcon = document.querySelector('#line-color-btn');
    
    elColorPickerIcon.style.color = elColorPicker.value
    meme.lines[currLineIdx].stroke = elColorPicker.value
    renderMeme()
}

function onDownloadImg(){
    const data = gCanvas.toDataURL()
    var elLink = document.querySelector('#download-link');
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function _loadCurrLineToInputEl(){
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx
    var elInput = document.querySelector('[name=curr-meme-line]')

    elInput.value = meme.lines[currLineIdx].txt
    elInput.select()
}

function _initToolBar(){
    var elFillColorPicker = document.querySelector('#fill-color-picker')
    var elLineColorPicker = document.querySelector('#line-color-picker')
    
    elFillColorPicker.value = DEFAULT_FILL
    elLineColorPicker.value = DEFAULT_STROKE
    
    var elFontChooser = document.querySelector('#font-chooser')
    elFontChooser.value = gFonts[0]
    setFont(gFonts[0])
}

function _updateNavBar(strSection){

    var elSectionItems = document.querySelectorAll('.navbar ul li');

    elSectionItems.forEach(elItem => {
        if(elItem.innerText === strSection){ 
            elItem.classList.add('active-section')
        } else {
            elItem.classList.remove('active-section')
        }
    })
}
function initGallery(){

    var strHTML = ''
    var imgs = getImgs()
    var elGallery = document.querySelector('.gallery')

    imgs.forEach(img => {
        strHTML += `\t<img data-id="${img.id}" src="${img.url}" onclick="setImage(this)" alt=""></img>\n`
    })

    elGallery.innerHTML = strHTML
}