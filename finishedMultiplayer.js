export { finishedMultiplayer }
import { playerScore } from "./scoreUpdate.js"

function finishedMultiplayer() {
    const scores = []
    let max = 0
    let highest = ''
    for (const s in playerScore) {
        scores.push([s, playerScore[s]])
    }
    scores.sort(function(a,b) {
        return b[1] - a[1]
    })
    for (const i of scores) {
        if (i[1] > max) {
            max = i[1]
            highest = i[0]
        }
    }
    if (highest == '') {
        document.querySelector('body').innerHTML = `
        <div class="multiplayer-container">
            <div class="multiplayer-card-done">
                <h1 id="winner">No Winners</h1>
                <div class="resulting-buttons">
                    <button id="resulting-play">Rematch</button>
                    <button id="resulting-back">Go Back</button>
                </div>
            </div>
        </div>
        `
    }
    const removeWinner = scores.splice(1)
    let runnerUps = ``
    for (let i = 0; i < removeWinner.length; i++) {
        let runnerUp =  document.querySelector(`.player-${removeWinner[i][0].split('-')[1]}`).textContent
        runnerUp = runnerUp.replace(':', '')
        if (parseInt(removeWinner[i][1]) == 1) {
            runnerUps += `<div class="runner-ups">
            <h1>${i+2}. ${runnerUp}</h1>
            <h1>${removeWinner[i][1]} point</h1>
            </div>`
        } else {
            runnerUps += `<div class="runner-ups">
            <h1>${i+2}. ${runnerUp}</h1>
            <h1>${removeWinner[i][1]} points</h1>
            </div>`
        }

    }
    let text = highest.split('-')
    let winner = document.querySelector(`.player-${text[text.length-1]}`).textContent
    winner = winner.replace(':', '')
    document.querySelector('body').innerHTML = `
    <div class="multiplayer-container">
        <div class="multiplayer-card-done">
            <h1 id="winner">Winner: ${winner}</h1>
            ${runnerUps}
            <div class="resulting-buttons">
                <button id="resulting-play">Rematch</button>
                <button id="resulting-back">Go Back</button>
            </div>
        </div>
    </div>
    `
}
