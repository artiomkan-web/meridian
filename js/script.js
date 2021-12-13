'use strict'
// Shadow
let shadows = document.querySelectorAll('.shadow')

// Header SideMenu List Creator
let headerSideMenu = document.querySelector('.header__menu.side'),
    headerBasicMenuList = document.querySelector('.header__menu.basic>.header__list').cloneNode('true')

headerSideMenu.appendChild(headerBasicMenuList)

// Header Burger Menu
let headerSideMenuLinks = headerSideMenu.querySelectorAll('.header__list-link'),
    headerBurgerBtn = document.querySelectorAll('.header__burger')

function headerRootMenu() {
    if (headerSideMenu.classList.contains('active')){
        headerSideMenu.classList.remove('active')
        headerBurgerBtn.forEach(i => {
            i.classList.remove('active')
        })
        shadows.forEach(i => {
            i.classList.remove('active')
        })
        document.body.style.overflow = ''
    }
    else{
        headerSideMenu.classList.add('active')
        headerBurgerBtn.forEach(i => {
            i.classList.add('active')
        })
        shadows.forEach(i => {
            i.classList.add('active')
        })
        document.body.style.overflow = 'hidden'
    }
}
headerBurgerBtn.forEach(i => {
    i.addEventListener('click', ()=> {
        headerRootMenu()
    })
})
headerSideMenuLinks.forEach(i => {
    i.addEventListener('click', ()=> {
        headerRootMenu()
    })
})
shadows.forEach(i => {
    i.addEventListener('click', ()=>{
        headerRootMenu()
    })
})

// Startpage Slider
let startpageSlider = document.querySelector('.startpage__info__slider'),
    startpageSliderLine = document.querySelector('.startpage__info__row'),
    startpageSliderItems = document.querySelectorAll('.startpage__info__item'),
    startpageSliderPrev = document.querySelector('.startpage__info__changer__switch.left'),
    startpageSliderNext = document.querySelector('.startpage__info__changer__switch.right'),
    startpageSliderWidth = parseInt(window.getComputedStyle(startpageSliderItems[0]).getPropertyValue('width')),
    startpageSliderIndex = 0,

    startpageSliderStatus = document.querySelector('.startpage__info__changer__numbers.status'),
    startpageSliderMax = document.querySelector('.startpage__info__changer__numbers.col'),
    startpageSliderFullWidth = Number(window.getComputedStyle(document.querySelector('.startpage__info__changer__full-line')).width.replace('px', '')),

    startpageSliderLoadedWidth = document.querySelector('.startpage__info__changer__loaded-line').style.width = startpageSliderFullWidth/startpageSliderItems.length*(startpageSliderIndex+1) + 'px';

startpageSlider.style.width = getComputedStyle(startpageSliderItems[0]).width
function startpageSliderChanger() {
    if (startpageSliderIndex > startpageSliderItems.length - 1){
        startpageSliderIndex = 0;
    }
    if (startpageSliderIndex < 0){
        startpageSliderIndex = startpageSliderItems.length - 1;
    }
    if (startpageSliderIndex.toString().length < 2){
        startpageSliderStatus.innerHTML = '0' + (startpageSliderIndex + 1)
    }
    else{
        startpageSliderStatus.innerHTML = startpageSliderIndex + 1
    }
    startpageSliderLoadedWidth = document.querySelector('.startpage__info__changer__loaded-line').style.width = startpageSliderFullWidth/startpageSliderItems.length*(startpageSliderIndex+1) + 'px';
    startpageSliderLine.style.left = `${-startpageSliderIndex*startpageSliderWidth}px`;
}

if (startpageSliderItems.length < 10){
    startpageSliderMax.innerHTML = '0' + startpageSliderItems.length
}
else{
    startpageSliderMax.innerHTML = startpageSliderItems.length
}
startpageSliderNext.addEventListener('click', ()=>{
    startpageSliderIndex++;
    startpageSliderChanger();
});
startpageSliderPrev.addEventListener('click', ()=>{
    startpageSliderIndex--;
    startpageSliderChanger();
});

// Sets Items Width
class carouselSlider{
    constructor(object, index = 0) {
        this.element = object.element
        this.body = object.body
        this.items = object.items
        this.row = object.row
        this.prev = object.prev
        this.next = object.next
        this.bodyWidth = parseInt(getComputedStyle(this.body).width.replace(/\D+/g,'')) -
            parseInt(getComputedStyle(this.body).paddingLeft.replace(/\D+/g,'')) -
            parseInt(getComputedStyle(this.body).paddingRight.replace(/\D+/g,''))
        this.indents = window.getComputedStyle(this.element).getPropertyValue('--horizontalIndents').replace(/\D+/g,'')
        this.itemsQuantityRow = window.getComputedStyle(this.element).getPropertyValue('--itemsCol')
        this.itemsWidth = this.bodyWidth / this.itemsQuantityRow - this.indents + this.indents/this.itemsQuantityRow
        this.element.style.setProperty('--itemsWidth', this.itemsWidth + 'px')

        function rootSlider(itemsWidth, items, indents, row, itemsQuantityRow) {
            if (index > items.length - itemsQuantityRow){
                index = 0;
            }
            if (index < 0){
                index = items.length - itemsQuantityRow ;
            }
            row.style.left = (-itemsWidth - indents)*index + 'px'
        }
        this.prev.addEventListener('click', ()=>{
            index--
            rootSlider(this.itemsWidth, this.items, this.indents, this.row, this.itemsQuantityRow)
        })
        this.next.addEventListener('click', ()=>{
            index++
            rootSlider(this.itemsWidth, this.items, this.indents, this.row, this.itemsQuantityRow)
        })
    }
}
let setsSlider = new carouselSlider({
    element: document.querySelector('.sets.apartment'),
    body: document.querySelector('.sets.apartment .sets__body'),
    items: document.querySelectorAll('.sets.apartment .sets__item'),
    row: document.querySelector('.sets.apartment .sets__row'),
    prev: document.querySelector('.sets.apartment .sets__switch.prev'),
    next: document.querySelector('.sets.apartment .sets__switch.next'),
    index: 0
})

// Media
if(window.matchMedia('(max-width: 768px)').matches){

}
if(window.matchMedia('(max-width: 480px)').matches){
    // Test, Credit, Offers Buttons - изменил местоположение кнопок для более легкой стилизации
    let geoButtons = [
        {section: '.test', button: '.test__btn'},
        {section: '.credit', button: '.credit__request'},
        {section: '.offers__item.consultation', button: '.offers__item.consultation>.offers__item__body>.offers__item__info>.offers__item__btn'},
        {section: '.offers__item.sign-up', button: '.offers__item.sign-up>.offers__item__body>.offers__item__info>.offers__item__btn'},
    ]

    geoButtons.map(i => {
        document.querySelector(`${i.section}`).insertAdjacentElement('beforeend', document.querySelector(`${i.button}`))
    })
}