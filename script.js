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
let isText = false;

function start() {
  resetCalculator();
  addButtonsNumber();
  deleteButton();
  acButton();
  signButton();
  operationButtons();
  equal();
  pointButton();
}

function numberAfterDecimalPoint(number) {
  const [_, decimalPart] = number.split(".");
  return decimalPart.length;
}

function addButtonsNumber() {
  numButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (isText === true) {
        resetCalculator();
      } else {
        if (newResultEl.textContent === "0" || wasEqual === 1) {
          newResultEl.textContent = "";
          wasEqual = 0;
          actualNumber = 0;
        }
        if (
          +(newResultEl.textContent + button.dataset.number) <=
            999999999.99999 &&
          +(newResultEl.textContent + button.dataset.number) >= -999999999.99999
        ) {
          if (newResultEl.textContent === "-0") {
            newResultEl.textContent = "";
            newResultEl.textContent += 0 - button.dataset.number;
          } else {
            if (
              isFloat === false ||
              numberAfterDecimalPoint(newResultEl.textContent) <= 4
            ) {
              newResultEl.textContent += button.dataset.number;
              actualNumber = +newResultEl.textContent;
            }
          }
        }
      }
    });
  });
}

function deleteButton() {
  deleteButtonEl.addEventListener("click", () => {
    if (isText === true) {
      resetCalculator();
    } else {
      if (newResultEl.textContent !== "0") {
        if (!newResultEl.textContent.includes("e")) {
          newResultEl.textContent = newResultEl.textContent.slice(0, -1);
          actualNumber = parseFloat(newResultEl.textContent);
          if (newResultEl.textContent === "") {
            newResultEl.textContent = "0";
            actualNumber = parseFloat(newResultEl.textContent);
          }
        } else {
          actualNumber /= 10;
          limitOutput(newResultEl, actualNumber);
          if (newResultEl.textContent === "") {
            newResultEl.textContent = "0";
            actualNumber = parseFloat(newResultEl.textContent);
          }
        }
      }
    }
  });
}

function resetCalculator() {
  newResultEl.textContent = "0";
  oldResultEl.textContent = "";
  signEl.textContent = "";
  oldNumber = 0;
  actualNumber = 0;
  isFloat = false;
  isText = false;
}

function acButton() {
  acButtonEl.addEventListener("click", () => {
    resetCalculator();
  });
}

function signButton() {
  changeSignButtonEl.addEventListener("click", () => {
    if (isText === true) {
      resetCalculator();
    } else {
      if (newResultEl.textContent[0] === "-") {
        newResultEl.textContent = newResultEl.textContent.slice(1);
      } else {
        newResultEl.textContent = "-" + newResultEl.textContent;
      }
      actualNumber *= -1;
    }
  });
}

function rounding(n, number) {
  // n for how many decimals and number for the number you want to round
  const d = Math.pow(10, n);
  return Math.trunc((number + Number.EPSILON) * d) / d;
}

function operate(a, b, sign) {
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "%":
      return rounding(5, a / b);
    case "x":
      return a * b;
  }
}

function prepareForNextCalc(button) {
  actualNumber = 0;
  newResultEl.textContent = 0;
  limitOutput(oldResultEl, oldNumber);
  signEl.textContent = button.dataset.operation;
  oldSign = button.dataset.operation;
}

function operationButtons() {
  operationButtonsList.forEach((button) => {
    button.addEventListener("click", () => {
      if (isText === true) {
        resetCalculator();
      } else {
        if (oldResultEl.textContent === "") {
          oldNumber = actualNumber;
          prepareForNextCalc(button);
        } else {
          if (newResultEl.textContent !== "0") {
            if (
              oldSign === "%" &&
              operate(oldNumber, actualNumber, oldSign) === 0
            ) {
              resetCalculator();
              newResultEl.textContent =
                "I'm too dumb to calculate such small numbers";
              isText = true;
            } else {
              oldNumber = operate(oldNumber, actualNumber, oldSign);
              prepareForNextCalc(button);
            }
          } else {
            signEl.textContent = button.dataset.operation;
            oldSign = button.dataset.operation;
          }
        }
        isFloat = false;
      }
    });
  });
}

function limitOutput(contentName, contentValue) {
  if (contentValue.toString().length <= 15) {
    contentName.textContent = contentValue;
  } else {
    contentName.textContent = contentValue.toExponential(2);
  }
}

function equal() {
  equalEl.addEventListener("click", () => {
    if (isText === true) {
      resetCalculator();
    } else {
      if (oldResultEl.textContent !== "") {
        if (actualNumber === 0 && oldSign === "%") {
          resetCalculator();
          newResultEl.textContent = "Not how math works";
          isText = true;
        } else if (
          oldSign === "%" &&
          operate(oldNumber, actualNumber, oldSign) === 0
        ) {
          resetCalculator();
          newResultEl.textContent =
            "I'm too dumb to calculate such small numbers";
          isText = true;
        } else {
          actualNumber = operate(oldNumber, actualNumber, oldSign);
          limitOutput(newResultEl, actualNumber);
          oldResultEl.textContent = "";
          signEl.textContent = "";
          wasEqual = 1;
          isFloat = false;
        }
      }
    }
  });
}

function pointButton() {
  pointEl.addEventListener("click", () => {
    if (isText === true) {
      resetCalculator();
    } else {
      if (isFloat === false) {
        isFloat = true;
        newResultEl.textContent += ".";
      }
    }
  });
}

start();
