const cards = document.querySelectorAll(".card")
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')

let pattern = []  // the order of which the cards will highlight a card
let isListening = false  // if the program will respond to the user clicks
let userProgress = 0  // how much of the pattern the user has clicked

let score = 0

for (const card of cards) {
    card.addEventListener("click", function (event) {
        if (isListening) {
            const cardId = event.target.getAttribute("id")
            handleCardClick(cardId)
        }
    })
}

function getRandomNumber() {
    // random number between 1 and 10
    // Important: cannot go above the number of cards that you have from the html document
    return Math.ceil(Math.random() * 10)
}

function highlightCard(card) {
    document.getElementById(card).classList.add("highlight")
    //  automatically remove the highlight from the card after a delay of 1s
    setTimeout(unHighlightCard, 1000, card);
}

function unHighlightCard(card) {
    document.getElementById(card).classList.remove("highlight")
}

function showPattern() {
	messageElement.textContent = "Watch the pattern!"
    let delay = 1000 // javascript uses milliseconds (1000ms = 1s)

    // loop through each card from the pattern
    for (const card of pattern)  {
        // delay by n seconds, highlight the card after that delay
        setTimeout(highlightCard, delay, card);

        // increment the delay by 1 second to give a buffer between each cards showing
        delay += 1000
    }
	messageElement.textContent = "Your turn!"
}

function handleCardClick(cardId) {
    // check if the user clicked on the correct card
    if (pattern[userProgress] == cardId) {
        userProgress++
    } else {
        // if they did not, reset the game
        resetGame()
    }
    
    // check to see if the user clicked everything from the pattern
    if (userProgress > 0 && userProgress == pattern.length) {
        // update the score
        score++
        // add a new card to the pattern
        pattern.push(getRandomNumber())
        // reset the click index
        userProgress = 0
        // show the new cards
        showPattern()
    }

    // modify the score on the screen so the user could see
    scoreElement.innerText = 'Score: ' + score
}

function resetGame() {
    isListening = false

    score = 0
    userProgress = 0
    pattern = []

    isListening = true
    startGame()
}

function startGame() {
    // pick a card to highlight
    pattern.push(getRandomNumber())

    // show the highlighting so the user can view
    showPattern()

    // and listen for what the user is clicking on
    isListening = true
}


startGame()