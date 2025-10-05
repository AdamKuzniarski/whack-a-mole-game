const STATE = {
  canHit: true,
  isRunning: false,
  score: 0,
  timeLeft: 30,
  activeIndex: null,
  lastIndex: null,
  loopTimeout: null,
  hideTimeout: null,
  timerInterval: null,
};

const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const holes = document.querySelectorAll(".hole");
const scoreValue = document.getElementById("scoreValue");
const timeValue = document.getElementById("timeValue");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

function getRandomIndex(excludeIndex) {
  if (excludeIndex === undefined || excludeIndex === null) {
    return Math.floor(Math.random() * 9);
  }
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * 9);
  } while (newIndex === excludeIndex);
  return newIndex;
}

function startGame() {
  if (STATE.isRunning) {
    return console.log("Game is already running");
  } else {
    STATE.isRunning = true;
    STATE.score = 0;
    STATE.timeLeft = 30;
    STATE.activeIndex = null;
    STATE.lastIndex = null;
    STATE.canHit = false;
    scoreValue.textContent = STATE.score;
    timeValue.textContent = STATE.timeLeft;
    startButton.disabled = true;
    stopButton.disabled = false;
    gameContainer.classList.add("active");
  }
}
startButton.addEventListener("click", startGame);

function hide() {
  if (!STATE.isRunning) return;
}

function tick() {
  if (!STATE.isRunning) return;
  if (STATE.isRunning) {
    const holesElement = holes[newIndex];
    holesElement = getRandomIndex(STATE.lastIndex);
    STATE.activeIndex !== null
      ? holes[STATE.activeIndex].classList.remove("active")
      : null;
    holesElement.classList.add("active");
    STATE.activeIndex = holesElement;
    STATE.lastIndex = holesElement;
    STATE.canHit = true;
    STATE.hideTimeout = setTimeout(hide, 850);
  }
}

function scheduleNextTick() {
  if (!STATE.isRunning) return;
  const nextTickIn = Math.floor(Math.random() * 1000) + 400;
}