const cards = document.querySelectorAll(".card")
const scoreElement = document.getElementById("score")
const messageElement = document.getElementById("message")

const highlightList = [] // the order of which the cards will highlight a card
let isListening = false // if the program will respond to the user clicks
let userClickIndex = 0

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
    // picks a number between 1 and 10
	return Math.ceil(Math.random() * 10)
}

function sleep(milleseconds) {
	return new Promise(resolve => setTimeout(resolve, milleseconds))
}

async function highlightCards() {
	isListening = false
	messageElement.textContent = "Watch the pattern!"

	// loop through the random numbers that the computer has picked
	for (i in highlightList) {
		const cardElement = document.getElementById(highlightList[i])

        await sleep(250)

        // add the highlight
        cardElement.classList.add("highlight")
        
        await sleep(250)

		// remove the highlight
		cardElement.classList.remove("highlight")
	}

	isListening = true
	messageElement.textContent = "Your turn!"
}

function handleCardClick(cardId) {
	// see if what the user's history matches up with the computers history
	// if they do, increment the click index
	// if not, reset the click index and score back to 0
	if (highlightList[userClickIndex] == cardId) {
		userClickIndex++
	} else {
		score = 0
		userClickIndex = 0
	}

	// if the user clicked everything from the history
	if (userClickIndex == highlightList.length) {
		// update the score
		score++
		// add a new item to the history
		highlightList.push(getRandomNumber())
		// reset the click index
		userClickIndex = 0
		// show the new cards
		highlightCards()
	}

	// modify the score on the screen so the user could see
	scoreElement.innerText = "Score: " + score
}

function start() {
	// pick a card to highlight
	highlightList.push(getRandomNumber())

	// show the highlighting so the user can view
	highlightCards()
}

start()
