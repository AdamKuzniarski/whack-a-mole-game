"use strict";

const STATE = {
  canHit: true,
  isRunning: false,
  score: 0,
  timeLeft: 30,
  activeIndex: null,
  lastIndex: null,
  loopTimeout: null,
  hideTimeout: null,
};

const VISIBLE_MS = 850;
const PAUSE_MIN_MS = 400;
const PAUSE_MAX_MS = 1400;

const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const holes = document.querySelectorAll(".hole");
const scoreValue = document.getElementById("scoreValue");
const timeValue = document.getElementById("timeValue");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

function getRandomIndex(excludeIndex) {
  const totalHoles = holes.length;
  if (excludeIndex === undefined || excludeIndex === null) {
    return Math.floor(Math.random() * totalHoles);
  }
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * totalHoles);
  } while (newIndex === excludeIndex);
  return newIndex;
}

function startGame() {
  if (STATE.isRunning) return console.log("Game is already running");

  STATE.isRunning = true;
  STATE.score = 0;
  STATE.timeLeft = `${STATE.timeLeft} sec`;
  STATE.activeIndex = null;
  STATE.lastIndex = null;
  STATE.canHit = false;

  scoreValue.textContent = STATE.score;
  timeValue.textContent = STATE.timeLeft;
  timeValue.textContent = `${STATE.timeLeft} sec`;
  //Board reset
  holes.forEach((hole) => hole.classList.remove("active"));
  clearTimeout(STATE.hideTimeout);
  clearTimeout(STATE.loopTimeout);

  startButton.disabled = true;
  stopButton.disabled = false;
  gameContainer.classList.add("active");
  scheduleNextTick();
}

startButton.addEventListener("click", startGame);

function tick() {
  if (!STATE.isRunning) return;

  const newIndex = getRandomIndex(STATE.lastIndex);

  if (STATE.activeIndex !== null) {
    holes[STATE.activeIndex].classList.remove("active");
  }
  const holesElement = holes[newIndex];
  holesElement.classList.add("active");
  STATE.lastIndex = newIndex;
  STATE.activeIndex = newIndex;
  STATE.canHit = true;

  STATE.hideTimeout = setTimeout(hide, VISIBLE_MS);
}

function hide() {
  if (STATE.isRunning === null) {
    holes[STATE.activeIndex].classList.remove("active");
  }
  STATE.activeIndex = null;
  STATE.canHit = false;
  scheduleNextTick();
}
function scheduleNextTick() {
  if (!STATE.isRunning) return;
  const nextTickIn = PAUSE_MIN_MS + Math.floor(Math.random() * PAUSE_MAX_MS);
  STATE.loopTimeout = setTimeout(tick, nextTickIn);
}

function stopGame() {
  if (!STATE.isRunning) return console.log("Game is not running");
  STATE.isRunning = false;
  clearTimeout(STATE.hideTimeout);
  clearTimeout(STATE.loopTimeout);
  if (STATE.activeIndex !== null) {
    holes[STATE.activeIndex].classList.remove("active");
  }
  STATE.activeIndex = null;
  STATE.canHit = false;
  startButton.disabled = false;
  stopButton.disabled = true;
}
stopButton.addEventListener("click", stopGame);
