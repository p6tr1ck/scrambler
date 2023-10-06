import { words } from './words.js'
import { leaderboard } from './leaderboard.js'
import { scoreUpdate, erasePlayerScore } from './scoreUpdate.js'
import { finishedMultiplayer } from './finishedMultiplayer.js'
import { removeClassCounter } from './addDeletePlayer.js'
export { players, multiplayer, amountOfPlayers, point, multiplayerTrue, reset, playAgain }
let input
let letters
let timer
let score
let inputContainer
let previousWord = ''
let currentWord = ''
let index = []
let time = 10
let point = 0
let timing
let success = false
let roundCount = 0
let rounds 
let players = []
let amountOfPlayers = 0
let multiplayer = false
let repeat = false
let again = false
let nextTurn

function continueGame() {
    multiplayer = true
    document.querySelectorAll('.player-name').forEach(player => players.push(player.textContent))
    document.body.innerHTML = `
            <div class="leaderboard">
                <h1>Leaderboard</h1>
            </div>
            <div class="container">
                <h1 class="player">Turn: ${players[0]}</h1>
                <div class="time-container">
                    <h1 class="time">10</h1>
                </div>
                <div class="word-container">
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                    <h1 class="word"></h1>
                </div>
                <div class="input-container">
                    <input type="text" placeholder="Enter word">
                </div>
            </div>
            <h1 class="score">Score: 0</h1>
        `
        leaderboard()
        time = 10
        input = document.querySelector('input')
        letters = document.querySelectorAll('.word')
        timer = document.querySelector('.time')
        score = document.querySelector('.score')
        inputContainer = document.querySelector('.input-container')
        selectRandomWord()
}


function reset() {
    point = 0
    roundCount = 0
    index = []
    previousWord = ''
    currentWord = ''
    players = []
    amountOfPlayers = 0
    again = true
    time = 10
    removeClassCounter()
    erasePlayerScore()
    multiplayerTrue()
}

function playAgain() {
    point = 0
    roundCount = 0
    index = []
    previousWord = ''
    currentWord = ''
    removeClassCounter()
    erasePlayerScore()
    continueGame()
}

function multiplayerTrue() {
    document.body.innerHTML = `
    <div class="multiplayer-container">
        <div class="multiplayer-card">
            <h1>Add Players</h1>
            <div class="name-container"></div>
            <div class="pop-up">
                <div class="input-field">
                    <input class="player-value" type="text" placeholder="Enter name" max=5>
                    <button class="add">
                        <span id="person-add" class="material-symbols-outlined">person_add</span>
                    </button>
                </div>
            </div>
            <form>
                <h1 class="round-text">Rounds: 3</h1>
                <input type="range" id="round-selector" name="round-selector" min="1" max="5" step="1" value="3"/>
            </form>
            <button class="multiplayer-play-btn">PLAY</button>
        </div>
    </div>
    `
    multiplayer = true
    const roundText = document.querySelector('.round-text')
    const roundSelector = document.querySelector('#round-selector')
    roundSelector.oninput = function() {
        roundText.textContent = `Rounds: ${roundSelector.value}`
    }
}

document.body.addEventListener('click', e => {
    if (e.target.classList == 'multiplayer-btn') {
        multiplayerTrue()
    }
})


document.body.addEventListener('click', e => {
    if ((e.target.classList == 'multiplayer-play-btn') && (document.querySelector('.name-container').childElementCount > 1)) {
        multiplayer = true
        document.querySelectorAll('.player-name').forEach(player => players.push(player.textContent))
        rounds = parseInt(document.querySelector('#round-selector').value)
        document.body.innerHTML = `
                <div class="leaderboard">
                    <h1>Leaderboard</h1>
                </div>
                <div class="container">
                    <h1 class="player">Turn: ${players[0]}</h1>
                    <div class="time-container">
                        <h1 class="time">10</h1>
                    </div>
                    <div class="word-container">
                        <h1 class="word"></h1>
                        <h1 class="word"></h1>
                        <h1 class="word"></h1>
                        <h1 class="word"></h1>
                        <h1 class="word"></h1>
                    </div>
                    <div class="input-container">
                        <input type="text" placeholder="Enter word">
                    </div>
                </div>
                <h1 class="score">Score: 0</h1>
            `
            leaderboard()
            input = document.querySelector('input')
            letters = document.querySelectorAll('.word')
            timer = document.querySelector('.time')
            score = document.querySelector('.score')
            inputContainer = document.querySelector('.input-container')
            selectRandomWord()
    } else if (((e.target.classList == 'multiplayer-play-btn') && (document.querySelector('.name-container').childElementCount < 2))) {
        e.target.classList.add('multiplayer-play-btn-red')
        e.target.classList.remove('multiplayer-play-btn')
        setTimeout(() => {
            e.target.classList.add('multiplayer-play-btn')
            e.target.classList.remove('multiplayer-play-btn-red')
        }, 1000)        
    }
})


function nextPlayerTurn() {
    if (repeat) {
        amountOfPlayers = 0
        repeat = false
    } else {
        amountOfPlayers += 1
    }
    if (rounds == roundCount) {
        inputContainer.innerHTML = ''
        setTimeout(() => {
            finishedMultiplayer()
        }, 1500)
    } else if (players[players.length-1] == players[amountOfPlayers]) {
        inputContainer.innerHTML = `<button>Turn: ${players[amountOfPlayers]}</button`
        roundCount += 1
    } else {
        inputContainer.innerHTML = `<button>Turn: ${players[amountOfPlayers]}</button`
    }
}



function countDown() {
    if (success) {
        clearInterval(timing)
        success = false;
        time = 10
        index = []
        setTimeout(() => {
            letters.forEach(letter => {
                letter.classList.remove('bg-green')
            })
            selectRandomWord()
        }, 1000)
    }
    timer.innerHTML = time
    time -= 1
    const timeContainer = document.querySelector('.time-container')
    if (time >= 7) {
        timeContainer.classList.remove('bg-red')
        timeContainer.classList.add('bg-green')
    } else if ((time <= 7) && (time >= 3)) {
        timeContainer.classList.remove('bg-green')
        timeContainer.classList.add('bg-yellow')
    } else {
        timeContainer.classList.remove('bg-yellow')
        timeContainer.classList.add('bg-red')
    }
     if (time == -1) {
        let i = 0
        clearInterval(timing)
        while (i < 5) {
            letters.forEach(letter => {
                letter.textContent = currentWord[i].toUpperCase()
                letter.classList.add('bg-green')
                i++
            })
        }
        scoreUpdate()
        nextPlayerTurn()
        const button = document.querySelector('button')
        button.addEventListener('click', e => {
            time = 10
            inputContainer.innerHTML = '<input type="text" placeholder="Enter word">'
            index = []
            letters.forEach(letter => letter.classList.remove('bg-green'))
            point = 0
            score.textContent = `Score: ${point}`
            if (players[players.length-1] == players[amountOfPlayers]) {
                document.querySelector('.player').textContent = `Turn: ${players[amountOfPlayers]}`
                repeat = true
            } else {
                document.querySelector('.player').textContent = `Turn: ${players[amountOfPlayers]}`
            }
            selectRandomWord()
        })    
    }
}


function selectRandomWord() {
    currentWord = words[Math.floor(Math.random() * 488)]
    if (currentWord === previousWord) {
        selectRandomWord()
    }
    previousWord = currentWord
    index.push(Math.floor(Math.random() * 5))
    const scrambler = () => {
        for (let i = 1; i < 5;) {
            const random = Math.floor(Math.random() * 5)
            if (!index.includes(random)) {
                index.push(random)
                i++
            } 
        }
    }
    timing = setInterval(countDown, 1000)
    scrambler()
    changeText()
}


document.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        checkWord()
    }
})


function changeText() {
    let i = 0
    let sameWord = ''
    while (i < 5) {
        letters.forEach(letter => {
            letter.textContent = currentWord[index[i]].toUpperCase()
            if (letter.textContent === currentWord[i].toUpperCase()) {
                letter.classList.add('bg-green')
            } 
            i++
        })
    }
}


function checkWord() {
    input = document.querySelector('input') 
    if (input.value.toLowerCase() === currentWord.toLowerCase()) {
        point += 1
        score.textContent = `Score: ${point}`
        let i = 0
        while (i < 5) {
            letters.forEach(letter => {
                letter.textContent = currentWord[i].toUpperCase()
                letter.classList.add('bg-green')
                i++
            })
        }
        input.value = ''
        success = true
    } else {
        letters.forEach(letter => {
            if (!letter.classList.contains('bg-green')) {
                letter.classList.add('bg-red')
                setTimeout(() => {
                    letter.classList.remove('bg-red')
                }, 1000);
            }
        })
    }
}

