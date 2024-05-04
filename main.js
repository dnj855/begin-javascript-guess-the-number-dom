import "./style.css";

class Game {
  constructor() {}

  init() {
    this.startButton = document.querySelector("#start-button");
    this.startDiv = document.querySelector("#start-game");
    this.gameDiv = document.querySelector("#game");
    this.startSequence();
  }

  startSequence() {
    this.startButton?.addEventListener("click", () => {
      this.startDiv?.classList.toggle("hidden");
      this.gameDiv?.classList.toggle("hidden");
    });
  }
}

const game = new Game();
game.init();
