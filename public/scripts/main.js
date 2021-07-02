import Modal from './modal.js'

const modal = Modal()

const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButtons = document.querySelectorAll('.actions a.delete')

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

checkButtons.forEach(button => {
    button.addEventListener('click', handleClick)
})

deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => handleClick(event, false) )
})

function handleClick (event, check = true) {
    event.preventDefault()
    
    const text = check ? 'Marcar como lida' : 'Excluir'
    
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta ?`
    modalButton.innerHTML = `Sim, ${text.toLocaleLowerCase()}` 
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

    modal.open()
}