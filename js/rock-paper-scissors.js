const choices = ["ROCK", "PAPER", "SCISSORS"];
const score = {
  p1: 0,
  p2: 0,
};

const scores = document.querySelectorAll(".score");
const icons = document.querySelectorAll(".icon");

icons.forEach((icon) => {
  icon.addEventListener("click", playGame);
  icon.addEventListener("mouseover", startHighlightImg);
  icon.addEventListener("mouseout", stopHighlightImg);
  icon.addEventListener("animationend", stopShake);
});

scores.forEach((score) => {
  score.addEventListener("transitionend", removeFocus);
});

function getComputerChoice() {
  const rand_index = Math.floor(Math.random() * choices.length);
  return choices[rand_index];
}

function playRound(playerSelection, computerSelection, sourceElement) {
  const p1 = playerSelection.toUpperCase();
  const p2 = computerSelection.toUpperCase();

  if (p1 === p2) {
    sourceElement.classList.add("draw");
    return p1;
  } else if (
    (p1 === "ROCK" && p2 === "SCISSORS") ||
    (p1 === "SCISSORS" && p2 === "PAPER") ||
    (p1 === "PAPER" && p2 === "ROCK")
  ) {
    updateScore("p1");
    return p1;
  } else {
    updateScore("p2");
    return p2;
  }
}

function playGame(event) {
  hidePriorRoundElements();

  const p1 = this.id.toUpperCase();
  const p2 = getComputerChoice();
  const computerSelection = document.getElementById(
    `${p2.toLowerCase()}Computer`
  );

  computerSelection.classList.remove("invisible");

  const result = playRound(p1, p2, this);
  choices.forEach((choice) => {
    if (result !== choice) {
      document.getElementById(choice.toLowerCase()).classList.add("faded");
    }
  });
}

function updateScore(winner) {
  score[winner]++;
  element = document.getElementById(`${winner}-score`);
  element.textContent = score[winner];
  element.classList.add("focus");
}

function startHighlightImg(event) {
  document.getElementById(`${this.id}Human`).classList.remove("invisible");
  this.classList.add("focus");
}

function stopHighlightImg(event) {
  icons.forEach((element) => element.classList.remove("focus"));
  document.getElementById(`${this.id}Human`).classList.add("invisible");

  hidePriorRoundElements();
}

function hidePriorRoundElements() {
  icons.forEach((element) => element.classList.remove("faded"));

  computerSelectors = document.querySelectorAll(".computer > .iconSelection");
  computerSelectors.forEach((element) => {
    element.classList.add("invisible");
  });
}

function removeFocus(event) {
  this.classList.remove("focus");
}

function stopShake(event) {
  this.classList.remove("draw");
}
