const newResultEl = document.querySelector(".new-result");
const signEl = document.querySelector(".sign");
const oldResultEl = document.querySelector(".old-result");
const numButtonsList = document.querySelectorAll(".num-button");
const deleteButtonEl = document.getElementById("delete-button");
const acButtonEl = document.getElementById("ac-button");
const changeSignButtonEl = document.getElementById("change-sign");
const operationButtonsList = document.querySelectorAll(".operation-button");
const equalEl = document.getElementById("equal");

let actualNumber = 0;
let oldNumber = 0;
let oldSign;

function start() {
  newResultEl.textContent = "0";
  signEl.textContent = "";
  oldResultEl.textContent = "";
  addButtonsNumber();
  deleteButton();
  acButton();
  signButton();
  operationButtons();
  equal();
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
    oldResultEl.textContent = "";
    signEl.textContent = "";
    oldNumber = 0;
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
  });
}

function rounding(n, number) {
  // n for how many decimals and number for the number you want to round
  const d = Math.pow(10, n);
  return Math.round((number + Number.EPSILON) * d) / d;
}

function calculus(a, b, sign) {
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "%":
      return a % b === 0 ? a / b : rounding(5, a / b);
    case "x":
      return a * b;
  }
}

function prepareForNextCalc(button) {
  actualNumber = 0;
  newResultEl.textContent = 0;
  oldResultEl.textContent = oldNumber;
  signEl.textContent = button.dataset.operation;
  oldSign = button.dataset.operation;
}

function operationButtons() {
  operationButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (oldResultEl.textContent === "") {
        oldNumber = actualNumber;
        prepareForNextCalc(button);
      } else {
        oldNumber = calculus(oldNumber, actualNumber, oldSign);
        prepareForNextCalc(button);
      }
    });
  });
}

function equal() {
  equalEl.addEventListener("click", () => {
    if (oldResultEl.textContent !== "") {
      newResultEl.textContent = calculus(oldNumber, actualNumber, oldSign);
      oldResultEl.textContent = "";
      signEl.textContent = "";
      oldNumber = 0;
      actualNumber = 0;
    }
  });
}

start();
