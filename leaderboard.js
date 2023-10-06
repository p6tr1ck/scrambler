import { players } from "./multiplayer.js"
import { convertNumberToWords } from "./intToWord.js"
export { leaderboard }


function leaderboard() {
    const rankings = document.querySelector('.leaderboard')
    for (let i = 1; i <= players.length; i++) {
        rankings.innerHTML += `
            <div class="player-score">
                <h1 class="player-${convertNumberToWords(i)}">${players[i-1]}:</h1>
                <h1 class="score-${convertNumberToWords(i)}">0</h1>
            </div>
        `
    }
}