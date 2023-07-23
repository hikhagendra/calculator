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

  if(screen.textContent === '' && isPvNum === false) {
    return;
  }

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
  let multiplication = expression.match(/(\d+[\*]\d+)+/g);

  if (multiplication !== null) {
    for (let i = 0; i < multiplication.length; i++) {
      expression = expression.replace(
        multiplication[i],
        process(multiplication[i])
      );
    }
  }

  let division = expression.match(/(\d+[/]\d+)+/g);

  if (division !== null) {
    for (let i = 0; i < division.length; i++) {
      expression = expression.replace(
        division[i],
        process(division[i])
      );
    }
  }

  let addition = expression.match(/(\d+[\+]\d+)+/g);

  if (addition !== null) {
    for (let i = 0; i < addition.length; i++) {
      expression = expression.replace(addition[i], process(addition[i]));
    }
  }

  let subtraction = expression.match(/(\d+[\-]\d+)+/g);

  if (subtraction !== null) {
    for (let i = 0; i < subtraction.length; i++) {
      expression = expression.replace(subtraction[i], process(subtraction[i]));
    }
  }

  screen.textContent = expression;
  userInput = [expression];
}

function process(exp) {
  let numbers = exp.match(/\d+/g);
  let operators = exp.match(/[\+\-\*\/]/g);
  let output = parseInt(numbers[0]);

  for (let i = 0; i < operators.length; i++) {
    let operator = operators[i];
    let number = parseInt(numbers[i + 1]);

    if (operator === "+") {
      output += number;
    } else if (operator === "-") {
      output -= number;
    } else if (operator === "*") {
      output *= number;
    } else if (operator === "/") {
      output /= number;
    }
  }

  return output;
}
