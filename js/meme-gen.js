'use strict';

const CANVAS_SIZE_CHANGE = 520
const NUDGE_PX_AMOUNT = 10

const gFonts = ['lato', 'impact-reg', 'Arial', 'cursive', 'Lucida Sans'];
var gPrevViewportWidth = 0

function init(){
    initCanvas()
    _initGallery()
    _updateAppState('Gallery')
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
    
    var imgId = elImg.dataset.id

    createMeme()
    setCurrImg(imgId)
    _updateAppState('Editor')
    renderMeme()
}

function onAddTextLine(){
    var meme = getCurrMeme()
    var canvasSize = getCanvasSize()

    switch (meme.lines.length) {
        case 0:
            createTextLine(50, 50)
            break
        case 1:
            (canvasSize === 'large') ? createTextLine(400, 400) : createTextLine(275, 275)
            break
        default:
            (canvasSize === 'large') ? createTextLine(225, 225) : createTextLine(170, 170)
            break
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
    // if(!currFontIdx) currFontIdx = 0
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

function onDownloadImg(fileName = 'memerrr.jpg'){

    const data = gCanvas.toDataURL()
    var elLink = document.querySelector('#download-link');
    elLink.href = data
    elLink.download = fileName
    console.log('dl');
}

function onSaveMeme(){

    gMeme.thumbnail = gCanvas.toDataURL()
    
    if(!getMeme(gMeme.id)){  
        saveMeme(gMeme)
        alert('Saved...')
    } else {
        updateMeme(gMeme) 
        alert('Updated...')
    }
}

function onLoadMeme(memeId){
    gMeme = getMeme(memeId)
    _updateAppState('Editor')

    setCurrImg(gMeme.selectedImgId)
    renderMeme()
    _setColorPickers(gMeme.lines[gMeme.selectedLineIdx].fill, gMeme.lines[gMeme.selectedLineIdx].stroke)

}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onSetFilter(filterStr){
    setFilter(filterStr);
    _initGallery();
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

    var elGallery = document.querySelector('.images');
    var elEditor = document.querySelector('.editor');
    var elMemeGallery = document.querySelector('.memes');

    switch (strSection) {
        case 'Gallery':
            elGallery.style.display = 'block'
            elEditor.style.display = 'none'
            elMemeGallery.style.display = 'none'
            break

            case 'Editor':
            elGallery.style.display = 'none'
            elEditor.style.display = 'flex'
            elMemeGallery.style.display = 'none'
            _initToolBar()
            break

            case 'Memes':
            elGallery.style.display = 'none'
            elEditor.style.display = 'none'
            elMemeGallery.style.display = 'grid'
            _initMemeGallery()
            break
    }

    // When in mobile - hide the slide-in menu

    document.body.classList.remove('menu-open')
}
function _initGallery(){

    var strHTML = ''
    var imgs = getImgs()
    var elGallery = document.querySelector('.image-grid')

    imgs.forEach(img => {
        strHTML += `\t<img data-id="${img.id}" src="${img.url}" onclick="onSetImage(this)" alt=""></img>\n`
    })

    elGallery.innerHTML = strHTML
}

function _initMemeGallery(){

    var strHTML = ''
    var memes = loadMemes()
    
    // if(memes.length === 0){
    //     strHTML = `<h1>Nothing here yet... Save a Meme and come back.</h1>\n`
    //     return 
    // } else {
    //     strHTML = `<h1>Choose a Meme to edit it....</h1>\n`
    // }
    
    var elGallery = document.querySelector('.memes')

    memes.forEach(meme => {
        // strHTML += `\t<img data-id="${meme.id}" src=${meme.thumbnail}" onclick="onLoadMeme(${meme.id})" alt=""></img>\n`
        strHTML += `\t<img data-id="${meme.id}" src="${meme.thumbnail}" onclick="onLoadMeme('${meme.id}')" alt=""></img>\n`
    })

    elGallery.innerHTML = strHTML
}

function _generateThumbnailName(){
    return makeId() + '.jpg'
}