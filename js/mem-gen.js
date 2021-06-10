'use strict';

const gFonts = ['lato', 'impact-reg', 'Arial', 'cursive', 'Lucida Sans'];
var gPrevViewportWidth = 0

function init(){
    initCanvas()
    initGallery()
    _initToolBar()
    _updateAppState('Gallery')
    renderMeme()
}

function onResize(){

    if(window.innerWidth < 520 && gPrevViewportWidth >= 520){
        flagCanvasSizeChange()
        renderMeme()
    }
    if(window.innerWidth > 520 && gPrevViewportWidth <= 520){
        flagCanvasSizeChange()
        renderMeme()
    }
    gPrevViewportWidth = window.innerWidth
}
function onShowGallery(){
    _updateAppState('Gallery')
}
function onShowEditor(){
    _updateAppState('Editor')
}
function onShowMemes(){
    _updateAppState('Memes')
}
function setText(elInput){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    meme.lines[currLineIdx].txt = elInput.value
    elInput.value = ''
    _updateAppState('Editor')
    renderMeme()
}

function onSetImage(elImg){

    _updateAppState('Editor')

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
    
    _loadCurrLineToInputEl()

    var elFontChooser = document.querySelector('#font-chooser')
    elFontChooser.value = gFonts[0]
    setFont(gFonts[0])
    onChangeFont(elFontChooser)
}

function _updateAppState(strSection){

    var elSectionItems = document.querySelectorAll('.navbar ul li');

    elSectionItems.forEach(elItem => {
        if(elItem.innerText === strSection){ 
            elItem.classList.add('active-section')
        } else {
            elItem.classList.remove('active-section')
        }
    })

    var elGallery = document.querySelector('.gallery');
    var elEditor = document.querySelector('.editor');
    var elMemeGallery = document.querySelector('.memes');

    switch (strSection) {
        case 'Gallery':
            elGallery.style.display = 'grid'
            elEditor.style.display = 'none'
            elMemeGallery.style.display = 'none'
            break

            case 'Editor':
            elGallery.style.display = 'none'
            elEditor.style.display = 'flex'
            elMemeGallery.style.display = 'none'
            break

            case 'Memes':
            elGallery.style.display = 'none'
            elEditor.style.display = 'none'
            elMemeGallery.style.display = 'grid'
            break
    }
}
function initGallery(){

    var strHTML = ''
    var imgs = getImgs()
    var elGallery = document.querySelector('.gallery')

    imgs.forEach(img => {
        strHTML += `\t<img data-id="${img.id}" src="${img.url}" onclick="onSetImage(this)" alt=""></img>\n`
    })

    elGallery.innerHTML = strHTML
}