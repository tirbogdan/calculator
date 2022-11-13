const newResultEl = document.querySelector(".new-result");
const signEl = document.querySelector(".sign");
const oldResultEl = document.querySelector(".old-result");
const numButtonsList = document.querySelectorAll(".num-button");
const deleteButtonEl = document.getElementById("delete-button");
const acButtonEl = document.getElementById("ac-button");
const changeSignButtonEl = document.getElementById("change-sign");
const operationButtonsList = document.querySelectorAll(".operation-button");

let actualNumber = 0;
let oldNumber = 0;

function start() {
  newResultEl.textContent = "0";
  signEl.textContent = "";
  oldResultEl.textContent = "";
  addButtonsNumber();
  deleteButton();
  acButton();
  signButton();
  operationButtons();
}

function addButtonsNumber() {
  numButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (newResultEl.textContent === "0") newResultEl.textContent = "";
      if (newResultEl.textContent.length < 10) {
        newResultEl.textContent += button.dataset.number;
        actualNumber = actualNumber * 10 + +button.dataset.number;
      }
    });
  });
}

function deleteButton() {
  deleteButtonEl.addEventListener("click", () => {
    if (newResultEl.textContent !== "0") {
      newResultEl.textContent = newResultEl.textContent.slice(0, -1);
      actualNumber = parseFloat(newResultEl.textContent);
      if (newResultEl.textContent === "") {
        newResultEl.textContent = "0";
        actualNumber = parseFloat(newResultEl.textContent);
      }
    }
  });
}

function acButton() {
  acButtonEl.addEventListener("click", () => {
    newResultEl.textContent = "0";
    actualNumber = 0;
  });
}

function signButton() {
  changeSignButtonEl.addEventListener("click", () => {
    if (newResultEl.textContent[0] === "-") {
      newResultEl.textContent = newResultEl.textContent.slice(1);
    } else {
      newResultEl.textContent = "-" + newResultEl.textContent;
    }
    actualNumber *= -1;
    console.log(actualNumber);
  });
}

function calculus(a, b, sign) {
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "%":
      return (a % b).toFixed(5);
    case "x":
      return a * b;
  }
}

function operationButtons() {
  operationButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      signEl.textContent = button.dataset.operation;
      console.log(calculus(actualNumber, oldNumber, button.dataset.operation));
    });
  });
}

start();
