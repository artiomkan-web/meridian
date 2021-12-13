'use strict'

// Models Hover
let modelsItems = document.querySelectorAll('.models__item'),
    modelsItemPics = document.querySelectorAll('.models__item__pic');

modelsItems.forEach(i => {
    i.addEventListener('mouseover', (e)=>{
        if(e.target.classList.contains('models__item__pic__info')){
            i.querySelector('.models__item__details').classList.add('active')
        }
    })
    i.addEventListener('mouseleave', (e)=>{
        i.querySelector('.models__item__details').classList.remove('active')
    })
})

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

// Media

if(window.matchMedia('(max-width: 768px)').matches){
    let startpageChar = document.querySelector('.startpage__characteristics'),
        startpageItem = document.querySelector('.startpage__info__item')

    startpageChar.classList.add('startpage__info__desc')
    startpageChar.classList.remove('startpage__characteristics')
    startpageItem.insertAdjacentElement('beforeend', startpageChar)
}

if(window.matchMedia('(max-width: 480px)').matches){
    let geoButtons = [
        {section: '.credit', button: '.credit__request'},
        {section: '.offers__item.consultation', button: '.offers__item.consultation>.offers__item__body>.offers__item__info>.offers__item__btn'},
        {section: '.offers__item.sign-up', button: '.offers__item.sign-up>.offers__item__body>.offers__item__info>.offers__item__btn'},
    ]

    geoButtons.map(i => {
        document.querySelector(`${i.section}`).insertAdjacentElement('beforeend', document.querySelector(`${i.button}`))
    })
}