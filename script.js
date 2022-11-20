const newResultEl = document.querySelector(".new-result");
const signEl = document.querySelector(".sign");
const oldResultEl = document.querySelector(".old-result");
const numButtonsList = document.querySelectorAll(".num-button");
const deleteButtonEl = document.getElementById("delete-button");
const acButtonEl = document.getElementById("ac-button");
const changeSignButtonEl = document.getElementById("change-sign");
const operationButtonsList = document.querySelectorAll(".operation-button");
const equalEl = document.getElementById("equal");
const pointEl = document.getElementById("point");

let actualNumber = 0;
let oldNumber = 0;
let oldSign;
let wasEqual = 0;
let isFloat = false;

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
  pointButton();
}

function addButtonsNumber() {
  numButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (newResultEl.textContent === "0" || wasEqual === 1) {
        newResultEl.textContent = "";
        wasEqual = 0;
        actualNumber = 0;
      }
      if (
        +newResultEl.textContent <= 999999999 &&
        +newResultEl.textContent >= -999999999
      ) {
        if (newResultEl.textContent === "-0") {
          newResultEl.textContent = "";
          newResultEl.textContent += 0 - button.dataset.number;
        } else {
          newResultEl.textContent += button.dataset.number;
          actualNumber = +newResultEl.textContent;
        }
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
    isFloat = false;
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

function operate(a, b, sign) {
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
        if (newResultEl.textContent !== "0") {
          oldNumber = operate(oldNumber, actualNumber, oldSign);
          prepareForNextCalc(button);
        } else {
          signEl.textContent = button.dataset.operation;
          oldSign = button.dataset.operation;
        }
      }
      isFloat = false;
    });
  });
}

function equal() {
  equalEl.addEventListener("click", () => {
    if (oldResultEl.textContent !== "") {
      newResultEl.textContent = operate(oldNumber, actualNumber, oldSign);
      oldResultEl.textContent = "";
      signEl.textContent = "";
      actualNumber = operate(oldNumber, actualNumber, oldSign);
      wasEqual = 1;
      isFloat = false;
    }
  });
}

function pointButton() {
  pointEl.addEventListener("click", () => {
    if (isFloat === false) {
      isFloat = true;
      newResultEl.textContent += ".";
    }
  });
}

//TODO handle when the actual number is 0 and you press -/+

start();
