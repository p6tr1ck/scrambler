import { amountOfPlayers, point} from "./multiplayer.js"
import { convertNumberToWords } from "./intToWord.js"
export { scoreUpdate, playerScore, erasePlayerScore }
let playerScore = {}

const erasePlayerScore = () => { playerScore = {} }

function scoreUpdate() {
    let objStr = `.score-${convertNumberToWords(amountOfPlayers+1)}`
    if (objStr in playerScore) {
        let previousPoint = playerScore[objStr]
        let total = previousPoint + point
        playerScore[objStr] = total
    } else {
        playerScore[objStr] = point
    }
    document.querySelector(objStr).textContent = playerScore[objStr]
}
