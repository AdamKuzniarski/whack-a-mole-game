const STATE = {
  canHit: true,
  running: false,
  score: 0,
  timeLeft: 30,
  activeIndex: null,
  lastIndex: null,
};

const gameContainer = document.getElementById("game-container");
const boardEl = document.getElementById("board");
const holes = document.querySelectorAll(".hole");
const scoreValue = document.getElementById("scoreValue");
const timeValue = document.getElementById("timeValue");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
