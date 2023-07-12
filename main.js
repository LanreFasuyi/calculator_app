class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // method to append a number to the screen
  appendNumber(number) {
    // this usecase considers "." as a number since . element it uses the data-number selector and so should
    if (number === "." && this.currentOperand.toString().includes(".")) return;
    this.currentOperand = this.currentOperand + number.toString();
  }

  chooseOperation(operation) {
    // there must be an operand to perform any operation
    if (this.currentOperand === "") return;

    // if there is a previous operand, go ahead and calculate
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    // get previous and current values
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // if any of prev or current is not a number
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    // split numbers into integer and decimal parts
    let integerDigits = parseFloat(stringNumber.split(".")[0]);
    let decimalDigits = parseFloat(stringNumber.split(".")[1]);

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
      if (decimalDigits !== null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// get object values
const numberButtons = document.querySelectorAll("data-number");

const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Initialize the calculator by creating an instance
