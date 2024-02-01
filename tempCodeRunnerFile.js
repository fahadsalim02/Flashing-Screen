// Get all the card elements
const cards = document.querySelectorAll(".card");

// Store the flashed sequence
let flashedSequence = [];

// Store the clicked sequence
let clickedSequence = [];

// Function to generate a random number between 1 and 4
function getRandomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}

// Function to flash the sequence
function flashSequence() {
  flashedSequence = [];
  for (let i = 0; i < 4; i++) {
    // Adjust the sequence length as needed
    const randomCard = document.querySelector(
      `[data-card="${getRandomNumber()}"]`
    );
    flashedSequence.push(randomCard);
    flashCard(randomCard, i);
  }
}

// Function to flash a card
function flashCard(card, index) {
  setTimeout(() => {
    card.classList.add("flashed");
    setTimeout(() => {
      card.classList.remove("flashed");
    }, 500);
  }, index * 1000); // Adjust the delay between flashes as needed
}

// Function to handle card clicks
function handleCardClick() {
  const clickedCard = this;
  clickedSequence.push(clickedCard);

  if (clickedSequence.length === flashedSequence.length) {
    checkSequence();
  }
}

// Function to check if the clicked sequence matches the flashed sequence
function checkSequence() {
  for (let i = 0; i < flashedSequence.length; i++) {
    if (flashedSequence[i] !== clickedSequence[i]) {
      alert("Game Over! Try again.");
      resetGame();
      return;
    }
  }

  alert("Congratulations! You won!");
  resetGame();
}

// Function to reset the game
function resetGame() {
  flashedSequence = [];
  clickedSequence = [];
}

// Function to start the game
function startGame() {
  flashSequence();
}

// Attach event listeners
document.getElementById("startButton").addEventListener("click", startGame);

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});
