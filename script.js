const display = document.getElementById("display");
let currentInput = "";
let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

const numberButtons = document.querySelectorAll(".btn:not(.operator):not(.equals):not(.clear):not(.backspace)");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Cannot divide by 0!";
  return a / b;
}

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

numberButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }
    if (btn.textContent === "." && currentInput.includes(".")) return;
    currentInput += btn.textContent;
    updateDisplay();
  });
});

operatorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (operator !== null && currentInput !== "") calculate();
    firstNumber = currentInput;
    operator = btn.textContent;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", () => {
  if (!operator || currentInput === "" || firstNumber === null) return;
  calculate();
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
});

backspaceButton.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
});

function calculate() {
  let result = operate(operator, firstNumber, currentInput);
  currentInput = (typeof result === "number") ? Math.round(result * 1000) / 1000 + "" : result;
  operator = null;
  firstNumber = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

window.addEventListener("keydown", e => {
  if (/[0-9]/.test(e.key)) document.querySelector(`.btn:contains('${e.key}')`)?.click();
  if (["+", "-", "*", "/"].includes(e.key)) document.querySelector(`.operator:contains('${e.key}')`)?.click();
  if (e.key === "Enter") equalsButton.click();
  if (e.key === "Backspace") backspaceButton.click();
  if (e.key === "Escape") clearButton.click();
  if (e.key === ".") document.querySelector(".btn:contains('.')")?.click();
});
