'use strict'
// Layout Tabs
let layoutTabs = document.querySelector('.layout__content__tabs'),
    layoutTabsItems = document.querySelectorAll('.layout__content__list'),
    layoutTabsButtons = document.querySelectorAll('.layout__content__tabs__buttons>div')

layoutTabsButtons.forEach(i => {
    i.addEventListener('click', (e)=>{

    })
})
layoutTabs.addEventListener('click', (e)=>{
    for(let n = 0; n < layoutTabsButtons.length; n++){
        if(e.target == layoutTabsButtons[n]){
            layoutTabsButtons.forEach(i => {
                i.classList.remove('active')
            })
            layoutTabsItems.forEach(i => {
                i.classList.remove('active')
            })
            layoutTabsButtons[n].classList.add('active')
            layoutTabsItems[n].classList.add('active')
        }
    }
})

// Sets/Studio Sliders
class carouselSliderSolo{
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
let studioSliderSolo = new carouselSliderSolo({
            element: document.querySelector('.sets.studio'),
            body: document.querySelector('.sets.studio .sets__body'),
            items: document.querySelectorAll('.sets.studio .sets__item'),
            row: document.querySelector('.sets.studio .sets__row'),
            prev: document.querySelector('.sets.studio .sets__switch.prev'),
            next: document.querySelector('.sets.studio .sets__switch.next'),
            index: 0
        }),
    setsSliderSolo = new carouselSliderSolo({
        element: document.querySelector('.sets.apartment'),
        body: document.querySelector('.sets.apartment .sets__body'),
        items: document.querySelectorAll('.sets.apartment .sets__item'),
        row: document.querySelector('.sets.apartment .sets__row'),
        prev: document.querySelector('.sets.apartment .sets__switch.prev'),
        next: document.querySelector('.sets.apartment .sets__switch.next'),
        index: 0
    })


if(window.matchMedia('(max-width: 480px)').matches){
    // Layout Transformed Picture
    let layoutPic = document.querySelector('.layout__content__pic'),
        layoutContent = document.querySelector('.layout__content')

    layoutPic.style.height = getComputedStyle(layoutContent).width
    let geoButtons = [
        {
            section: '.tour__body',
            button: '.tour__view'
        },
        {
            section: '.offers__item.consultation',
            button: '.offers__item.consultation>.offers__item__body>.offers__item__info>.offers__item__btn'
        },
        {
            section: '.offers__item.sign-up',
            button: '.offers__item.sign-up>.offers__item__body>.offers__item__info>.offers__item__btn'
        },
    ]

    geoButtons.map(i => {
        document.querySelector(`${i.section}`).insertAdjacentElement('beforeend', document.querySelector(`${i.button}`))
    })
}

// Modal Window (consultation/form)
let modal = document.querySelector('.modal'),
    modalItems = modal.querySelectorAll('.modal__item'),
    modalConsultation = modal.querySelector('.consultation'),
    modalForm = modal.querySelector('.form'),
    formCallButtons = document.querySelectorAll('.modal-form')

function startModal(item = modalConsultation){
    item.classList.add('active')
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
}
function closeModal(){
    modalItems.forEach(i => {i.classList.remove('active')})
    modal.classList.remove('active')
    document.body.style.overflow = ''
}

formCallButtons.forEach(i => {
    i.addEventListener('click', ()=> {
        startModal(modalForm)
    })
})
modal.addEventListener('click', (e)=> {
    if (e.target == modal || e.target.classList.contains('modal__close')){
        closeModal()
    }
})

setTimeout(()=>{
    startModal(modalConsultation)
}, 5000)