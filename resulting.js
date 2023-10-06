import { reset, playAgain } from "./multiplayer.js"

document.body.addEventListener('click', e => {
    if (e.target.id == "resulting-back") {
        reset()
    } else if (e.target.id == "resulting-play") {
        playAgain()
    }
})