'use strict';

const CANVAS_SIZE_CHANGE = 520
const NUDGE_PX_AMOUNT = 10

const gFonts = ['lato', 'impact-reg', 'Arial', 'cursive', 'Lucida Sans'];
var gPrevViewportWidth = 0

function init(){
    initCanvas()
    _initGallery()
    _initToolBar()
    _updateAppState('Gallery')
    renderMeme()
}

function onResize(){

    if(window.innerWidth < CANVAS_SIZE_CHANGE && gPrevViewportWidth >= CANVAS_SIZE_CHANGE){
        flagCanvasSizeChange()
        renderMeme()
    }
    if(window.innerWidth > CANVAS_SIZE_CHANGE && gPrevViewportWidth <= CANVAS_SIZE_CHANGE){
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

// HTML event handlers

function onSetText(elInput){

    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1)  return

    meme.lines[currLineIdx].txt = elInput.value
    elInput.value = ''
    renderMeme()
}

function onSetImage(elImg){

    _updateAppState('Editor')

    var imgId = elImg.dataset.id
    setCurrImg(imgId)
    renderMeme()
}

function onAddTextLine(){
    var meme = getCurrMeme()

    switch (meme.lines.length) {
        case 0:
            createTextLine(50, 50)
            break
        case 1:
            createTextLine(400, 400)
            break
        default:
            createTextLine(225, 225)
    }
    
    renderMeme();
    _loadCurrLineToInputEl()
}

function onRemoveTextLine(){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1)  return

    meme.lines.splice(currLineIdx,1)
    meme.selectedLineIdx--

    renderMeme()
}

function onAdjustFontSize(diff){
    var meme = getCurrMeme()
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1)  return

    meme.lines[currLineIdx].size += diff
    renderMeme(meme.lines[0].txt, 150, 150)
}

function onChangeFont(elFontChooser){

    // Get the next font
    var currFontIdx = gFonts.findIndex(font => font === elFontChooser.value)
    if(++currFontIdx === gFonts.length) currFontIdx = 0

    // Update the font chooser
    elFontChooser.style.fontFamily = gFonts[currFontIdx]
    elFontChooser.value = gFonts[currFontIdx]

    // Update the canvas
    setFont(gFonts[currFontIdx])
    renderMeme()
}
function onMoveLine(dir){

    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1)  return

    meme.lines[currLineIdx].y += dir * NUDGE_PX_AMOUNT
    renderMeme()
}

function onAlignLine(dir){
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx
    
    if(currLineIdx === -1)  return
    
    meme.lines[currLineIdx].align = dir
    renderMeme()
}

function onSwitchLine(){
    var meme = getCurrMeme();

    if(meme.selectedLineIdx === -1)  return

    if( ++meme.selectedLineIdx === meme.lines.length){
        meme.selectedLineIdx = 0
    }

    _setColorPickers(meme.lines[meme.selectedLineIdx].fill, meme.lines[meme.selectedLineIdx].stroke)
    _loadCurrLineToInputEl()
    renderMeme()
}

function onSetFillColor(elColorPicker){

    var elColorPickerIcon = document.querySelector('#fill-color-btn');
    elColorPickerIcon.style.color = elColorPicker.value
    setFillColor(elColorPicker.value)
    
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx
    if(currLineIdx === -1)  return
    
    meme.lines[currLineIdx].fill = elColorPicker.value
    renderMeme()
}
function onSetLineColor(elColorPicker){

    var elColorPickerIcon = document.querySelector('#line-color-btn');
    elColorPickerIcon.style.color = elColorPicker.value
    setStrokeColor(elColorPicker.value)
    
    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx
    if(currLineIdx === -1)  return
    
    meme.lines[currLineIdx].stroke = elColorPicker.value
    renderMeme()
}

function onDownloadImg(){

    const data = gCanvas.toDataURL()
    var elLink = document.querySelector('#download-link');
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

// Private functions

function _initToolBar(){
    _setColorPickers()
    _loadCurrLineToInputEl()
    _initFontChooser()
}

function _setColorPickers(fillColor = DEFAULT_FILL, lineColor = DEFAULT_STROKE){
    
    var elFillColorPicker = document.querySelector('#fill-color-btn')
    var elLineColorPicker = document.querySelector('#line-color-btn')
    
    elFillColorPicker.style.color = fillColor
    elLineColorPicker.style.color = lineColor

    setFillColor(fillColor)
    setStrokeColor(lineColor)
}

function _loadCurrLineToInputEl(){

    var meme = getCurrMeme();
    var currLineIdx = meme.selectedLineIdx

    if(currLineIdx === -1) return

    var elInput = document.querySelector('[name=curr-meme-line]')
    elInput.value = meme.lines[currLineIdx].txt
    elInput.select()
}

function _initFontChooser(){

    var elFontChooser = document.querySelector('#font-chooser')
    elFontChooser.value = gFonts[0]
    setFont(gFonts[0])
    onChangeFont(elFontChooser)
}

function _updateAppState(strSection){

    var elSectionItems = document.querySelectorAll('.navbar ul li');

    // Update the navbar

    elSectionItems.forEach(elItem => {
        if(elItem.innerText === strSection){ 
            elItem.classList.add('active-section')
        } else {
            elItem.classList.remove('active-section')
        }
    })

    // Reveal relevant HTML Section and hide other sections

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

    // When in mobile - hide the slide-in menu

    document.body.classList.remove('menu-open')
}
function _initGallery(){

    var strHTML = ''
    var imgs = getImgs()
    var elGallery = document.querySelector('.gallery')

    imgs.forEach(img => {
        strHTML += `\t<img data-id="${img.id}" src="${img.url}" onclick="onSetImage(this)" alt=""></img>\n`
    })

    elGallery.innerHTML = strHTML
}
