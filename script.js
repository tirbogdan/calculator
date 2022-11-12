const newResultEl = document.querySelector(".new-result");
const signEl = document.querySelector(".sign");
const oldResultEl = document.querySelector(".old-result");
const numButtonsList = document.querySelectorAll(".num-button");
const deleteButtonEl = document.getElementById("delete-button");

function start() {
  newResultEl.textContent = "0";
  signEl.textContent = "";
  oldResultEl.textContent = "";
  addButtonsNumber();
  deleteButton();
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

function deleteButton() {
  deleteButtonEl.addEventListener("click", () => {
    if (newResultEl.textContent !== "0") {
      newResultEl.textContent = newResultEl.textContent.slice(0, -1);
      if (newResultEl.textContent === "") newResultEl.textContent = "0";
    }
  });
}

start();
