import "./style.css";

class Game {
  static MIN_NUMBER = 0;
  static MAX_NUMBER = 500;

  constructor() {
    this.score = 0;
  }

  init() {
    this.number =
      Math.floor(Math.random() - Game.MIN_NUMBER + 1) * Game.MAX_NUMBER;
    this.minNumberDisplays = document.querySelectorAll(".min-number");
    this.maxNumberDisplays = document.querySelectorAll(".max-number");
    this.startButton = document.querySelector("#start-button");
    this.startDiv = document.querySelector("#start-game");
    this.gameDiv = document.querySelector("#game");
    this.form = document.querySelector("form");
    this.scoreDisplay = document.querySelector("#score");
    this.resultDisplay = document.querySelector("#result");
    this.startButton?.addEventListener("click", () => {
      this.showGame();
    });
  }

  showGame() {
    this.startDiv?.classList.toggle("hidden");
    this.minNumberDisplays.forEach((display) => {
      display.textContent = Game.MIN_NUMBER;
    });
    this.maxNumberDisplays.forEach((display) => {
      display.textContent = Game.MAX_NUMBER;
    });
    this.gameDiv?.classList.toggle("hidden");
  }
}

const game = new Game();
game.init();
