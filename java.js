const cards = document.querySelectorAll(".card");

let flashedSequence = [];
let clickedSequence = [];

function getRandomNumber() {
  return Math.floor(Math.random() * 4) + 1;
}

function flashSequence() {
  flashedSequence = [];
  for (let i = 0; i < 4; i++) {
    const randomCard = document.querySelector(
      `[data-card="${getRandomNumber()}"]`
    );
    flashedSequence.push(randomCard);
    flashCard(randomCard, i);
  }
}

function flashCard(card, index) {
  setTimeout(() => {
    card.classList.add("flashed");
    setTimeout(() => {
      card.classList.remove("flashed");
    }, 500);
  }, index * 1000);
}

function handleCardClick() {
  const clickedCard = this;
  clickedSequence.push(clickedCard);

  if (clickedSequence.length === flashedSequence.length) {
    checkSequence();
  }
}

function checkSequence() {
  for (let i = 0; i < flashedSequence.length; i++) {
    if (flashedSequence[i] !== clickedSequence[i]) {
      showGameOverPopup();
      resetGame();
      return;
    }
  }
  showCongratulationsPopup();
  resetGame();
}

function resetGame() {
  flashedSequence = [];
  clickedSequence = [];
}

function startGame() {
  flashSequence();
}

document.getElementById("startButton").addEventListener("click", startGame);

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});

function showCongratulationsPopup() {
  const congratulationsPopup = document.createElement("div");
  congratulationsPopup.className = "congratulations-popup";
  congratulationsPopup.textContent = "Congratulations! You Won!";
  document.body.appendChild(congratulationsPopup);

  setTimeout(() => {
    congratulationsPopup.remove();
  }, 3000);
}

function showGameOverPopup() {
  const GameOverPopup = document.createElement("div");
  GameOverPopup.className = "GameOver-popup";
  GameOverPopup.textContent = "Game Over! Try Again!";
  document.body.appendChild(GameOverPopup);

  setTimeout(() => {
    GameOverPopup.remove();
  }, 3000);
}
