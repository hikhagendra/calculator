let screen = document.getElementById("screen");
let keys = document.getElementById("keys");
let userInput = [];

keys.addEventListener("click", function (e) {
  if (
    e.target.classList[0] === "number" ||
    e.target.classList[0] === "operator"
  ) {
    addToScreen(e.target.getAttribute("data-value"));
  } else if (e.target.classList[0] === "clear") {
    clearScreen();
  } else if (e.target.classList[0]) {
    calculate();
  }
});

function addToScreen(value) {
  let isPvNum = !isNaN(Number(value));
  let isSvNum = !isNaN(
    Number(screen.textContent[screen.textContent.length - 1])
  );

  if (
    (isSvNum === false && isPvNum) ||
    (isSvNum && isPvNum) ||
    (isSvNum && isPvNum === false)
  ) {
    userInput.push(value);
    screen.textContent = userInput.join("");
  } else if (isSvNum === false && isPvNum === false) {
    userInput.pop();
    userInput.push(value);
    screen.textContent = userInput.join("");
  }
}

function clearScreen() {
  userInput = [];
  screen.textContent = "";
}

function calculate() {
  let expression = userInput.join("");
  let numbers = expression.match(/\d+/g);
  let operators = expression.match(/[\+\-\*\/]/g);
  let output = parseInt(numbers[0]);
  
  for(let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let number = parseInt(numbers[i + 1]);

    if(operator === '+') {
        output += number;
    } else if (operator === '-') {
        output -= number;
    } else if (operator === '*') {
        output *= number;
    } else if (operator === '/') {
        output /= number;
    }
  }

  console.log(output);
}
