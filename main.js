import "./style.css";

class Game {
  static MIN_NUMBER = 0;
  static MAX_NUMBER = 500;

  constructor() {
    this.score = 0;
  }

  init() {
    this.minNumberDisplays = document.querySelectorAll(".min-number");
    this.maxNumberDisplays = document.querySelectorAll(".max-number");
    this.startButton = document.querySelector("#start-button");
    this.submitButton = document.querySelector("#submit-button");
    this.startDiv = document.querySelector("#start-game");
    this.gameDiv = document.querySelector("#game");
    this.form = document.querySelector("form");
    this.tryInput = document.querySelector("#try");
    this.scoreDisplay = document.querySelector("#score");
    this.resultDisplay = document.querySelector("#result");
    this.guessesDiv = document.querySelector("#guesses");
  }

  play() {
    this.init();
    this.number = this.setNumber();
    this.startButton?.addEventListener("click", () => {
      this.showGame();
    });
    this.form?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.checkNumber(new FormData(this.form));
    });
  }

  setNumber() {
    return Math.floor(Math.random() * Game.MAX_NUMBER + 1);
  }

  checkNumber(data) {
    const userTry = data.get("try");
    if (isNaN(userTry) || userTry === null || userTry === "") {
      this.updateResultDisplay("Please enter a valid number.");
    } else if (userTry < Game.MIN_NUMBER || userTry > Game.MAX_NUMBER) {
      this.updateResultDisplay(
        `Please enter a number between ${Game.MIN_NUMBER} and ${Game.MAX_NUMBER}.`
      );
    } else if (userTry > this.number) {
      this.displayGuess(userTry);
      this.updateResultDisplay(`🔴 My guess is below ${userTry}.`);
      this.updateScore();
      this.tryInput.value = "";
    } else if (userTry < this.number) {
      this.displayGuess(userTry);
      this.updateResultDisplay(`🔴 My guess is above ${userTry}.`);
      this.updateScore();
      this.tryInput.value = "";
    } else {
      this.updateResultDisplay(
        `🟢 You've found my guess: it's ${this.number}.`
      );
      this.displayGuess(userTry, true);
      this.endGame();
    }
  }

  updateScore(updateValue = 1) {
    this.score += updateValue;
    this.scoreDisplay.textContent = this.score;
  }

  updateResultDisplay(message) {
    this.resultDisplay.textContent = message;
    this.resultDisplay?.classList.remove("hidden");
  }

  displayGuess(guess, won = false) {
    const cross = document.createElement("span");
    cross.textContent = won ? "🟢" : "x";
    cross.style.position = "absolute";
    cross.style.top = "50%";
    cross.style.transform = "translateY(-50%)";
    this.guessesDiv.appendChild(cross);
    const percentage = Math.min(
      Math.max(0, (guess / Game.MAX_NUMBER) * 100),
      98.5
    );
    cross.style.left = `${percentage}%`;
  }

  showGame() {
    this.startDiv?.classList.toggle("hidden");
    this.minNumberDisplays.forEach((display) => {
      display.textContent = Game.MIN_NUMBER.toString();
    });
    this.maxNumberDisplays.forEach((display) => {
      display.textContent = Game.MAX_NUMBER.toString();
    });
    this.gameDiv?.classList.toggle("hidden");
    this.updateScore(0);
  }

  endGame() {
    this.tryInput?.setAttribute("disabled", "");
    this.submitButton?.setAttribute("disabled", "");
    this.restartButton = document.createElement("button");
    this.restartButton.textContent = "Restart";
    this.restartButton.classList.add("btn", "justify-center", "inline-block");
    this.restartButton.addEventListener("click", () => {
      this.restartGame();
    });
    this.gameDiv?.appendChild(this.restartButton);
  }

  restartGame() {
    this.number = this.setNumber();
    this.score = 0;
    this.updateScore(0);
    this.guessesDiv.textContent = "";
    this.resultDisplay?.classList.add("hidden");
    this.tryInput?.removeAttribute("disabled");
    this.tryInput.value = "";
    this.submitButton?.removeAttribute("disabled");
    this.restartButton?.classList.add("hidden");
  }
}

const game = new Game();
window.addEventListener("resize", () => {
  const crosses = game.guessesDiv.querySelectorAll("span");
  crosses.forEach((cross) => {
    const userGuess = parseInt(cross.dataset.guess);
    const newPosition =
      ((userGuess - Game.MIN_NUMBER) / (Game.MAX_NUMBER - Game.MIN_NUMBER)) *
      (game.guessesDiv.clientWidth - cross.offsetWidth);
    cross.style.left = `${newPosition}px`;
  });
});
game.play();
