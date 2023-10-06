import { convertNumberToWords } from './intToWord.js'
export { removeClassCounter }
let classCounter = 0

const removeClassCounter = () => { classCounter = 0 }

document.body.addEventListener('click', e => {
    if ((e.target.classList.contains('add') || e.target.id == 'person-add') && (classCounter < 3)) {
        if (document.querySelector('.player-value').value.length >= 9) {
            document.querySelector('.pop-up').innerHTML += `
            <div class="pop-up-message">
            <p>Player name must be less than 9 characters</p>
            </div>
            `
            setTimeout(() => {
                document.querySelectorAll('.pop-up-message').forEach(message => {
                    message.classList.add('remove-message')
                })
                setTimeout(() => {
                    document.querySelectorAll('.pop-up-message').forEach(message => {
                        message.remove()
                    })
                }, 500)
            }, 1500)
        } else if (!document.querySelector('.player-value').value == '') {
            classCounter += 1
            document.querySelector('.name-container').innerHTML += `
            <div class="player-names ${convertNumberToWords(classCounter)}">
                <h1 class="player-name">${document.querySelector('.player-value').value}</h1>
                <i class="material-symbols-outlined player-delete ${convertNumberToWords(classCounter)}">close</i>
            </div>
            `
        }
    }
    if (e.target.classList.contains('player-delete')) {
        classCounter -= 1
        e.target.parentElement.remove()
    }
})