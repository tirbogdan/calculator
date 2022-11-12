const newResultEl = document.querySelector(".new-result");
const signEl = document.querySelector(".sign");
const oldResultEl = document.querySelector(".old-result");
const numButtonsList = document.querySelectorAll(".num-button");

function start() {
  newResultEl.textContent = "0";
  signEl.textContent = "";
  oldResultEl.textContent = "";
  addButtonsNumber();
}

function addButtonsNumber() {
  numButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (newResultEl.textContent === "0") newResultEl.textContent = "";
      if (newResultEl.textContent.length < 10) {
        newResultEl.textContent += button.dataset.number;
      }
    });
  });
}

start();
