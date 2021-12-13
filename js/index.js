'use strict'
let modal = document.querySelector('.modal'),
    modalItems = document.querySelectorAll('.modal__item'),
    modalTest = modal.querySelector('.test'),
    testCallButtons = document.querySelectorAll('.modal-test'),
    modalForm = modal.querySelector('.form'),
    formCallButtons = document.querySelectorAll('.modal-form'),
    modalTestSliderIndex = 0

function startModal(item = modalTest){
    item.classList.add('active')
    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
}
function closeModal(){
    modalItems.forEach(i => {i.classList.remove('active')})
    modal.classList.remove('active')
    modalTestSliderIndex = 0
    document.body.style.overflow = 'unset'
}

// startModal(modalTest)
setTimeout(closeModal, 0)

testCallButtons.forEach(i => {
    i.addEventListener('click', ()=>{
        startModal(modalTest)
    })
})
formCallButtons.forEach(i => {
    i.addEventListener('click', ()=> {
        setTimeout(()=>{startModal(modalForm)}, 0)
    })
})

modal.addEventListener('click', (e)=> {
    if (e.target == modal || e.target.classList.contains('modal__close')){
        closeModal()
    }
})

// Modal Slider (test)
let modalTestSlider = document.querySelector('.modal__slider'),
    modalTestSliderRow = document.querySelector('.modal__slider__row'),
    modalTestSliderItems = document.querySelectorAll('.modal__slider__item'),
    modalTestSliderWidth = parseInt(window.getComputedStyle(modalTestSlider).getPropertyValue('width')),
    modalTestSliderPrev = document.querySelector('.modal__switcher__btn.prev'),
    modalTestSliderNext = document.querySelector('.modal__switcher__btn.next'),

    modalTestFullLine = document.querySelector('.modal__switcher__changer__full-line'),
    modalTestLoadedLine = document.querySelector('.modal__switcher__changer__loaded-line'),
    modalTestAllSum = document.querySelector('.modal__switcher__changer__numbers.col'),
    modalTestActualSum = document.querySelector('.modal__switcher__changer__numbers.status'),

    modalSliderChoices = document.querySelectorAll('.modal__slider__form__choice'),

    modalTestResults = document.querySelectorAll('.test_result')

function modalTestRootSlider() {
    if (modalTestSliderIndex > modalTestSliderItems.length - 1){
        closeModal()
        startModal(modalTestResults[1])
        document.querySelectorAll('.modal__slider__item input').forEach(i => {
            i.checked = false
        })
    }
    if (modalTestSliderIndex < 0){
        modalTestSliderIndex = 0
    }

    modalTestSliderRow.style.left = -(modalTestSlider.clientWidth*modalTestSliderIndex)+'px'
    modalTestLoadedLine.style.width = parseInt(window.getComputedStyle(modalTestFullLine).getPropertyValue('width')) / modalTestSliderItems.length * (modalTestSliderIndex+1) + 'px'

    modalTestActualSum.innerHTML = modalTestSliderIndex + 1
}

modalTestSliderPrev.addEventListener('click', ()=> {
    modalTestSliderIndex--
    modalTestRootSlider()
})
modalTestSliderNext.addEventListener('click', ()=> {
    let sliderItemsInputs = modalTestSliderItems[modalTestSliderIndex].querySelectorAll('input')
    sliderItemsInputs.forEach(i => {
        if (i.checked != ''){
            modalTestSliderNext.style.background = '#c4c4c4'
            modalTestSliderIndex++
            modalTestRootSlider()
        }
    })
})

modalSliderChoices.forEach(i => {
    i.addEventListener('click', ()=>{
        modalTestSliderNext.style.background = '#EC1C24'
    })
})

modalTestAllSum.innerHTML = modalTestSliderItems.length
modalTestLoadedLine.style.width = parseInt(window.getComputedStyle(modalTestFullLine).getPropertyValue('width')) / modalTestSliderItems.length * (modalTestSliderIndex+1) + 'px'