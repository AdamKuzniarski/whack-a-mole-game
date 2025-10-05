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

function randomGenerator() {
  return Math.floor(Math.random() * 9);
}

console.log(randomGenerator());
const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const holes = document.querySelectorAll(".hole");
const scoreValue = document.getElementById("scoreValue");
const timeValue = document.getElementById("timeValue");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

function startGame() {
  if (STATE.isRunning) {
    STATE.score = 0;
    STATE.timeLeft = 30;
    activeIndex = null;
    lastIndex = null;
    canHit = false;
  }
  console.log("Game is already running");
}
startGame();
