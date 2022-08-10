// delete, clear, equal
let btns = document.querySelectorAll("button");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");
let equalBtn = document.querySelector(".equal");
//operators and numbers
let operators = document.querySelectorAll(".operators");
let nums = document.querySelectorAll(".nums");
let negative = document.querySelector(".negative");
//displaying the results
let prevOperandElement = document.querySelector(".prev-operand");
let currentOperandElement = document.querySelector(".current-operand");
let operationsHistory = document.querySelector('.history')

class Calculator {
  //passing display elements
  constructor(prevOperandElement, currentOperandElement, operationsHistory) {
    this.prevOperandElement = prevOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.operationsHistory = operationsHistory
    //clear the displayed nums once the calculator is created
    this.clear();
  }
  //delete all inputs
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.history = ""
    this.updateDisplay();
  }

  //delete a single num
  delete() {
    this.currentOperand = this.currentOperand.slice(
      0,
      this.currentOperand.length - 1
    );
  }

  //
  appendNum(number) {
    //to prevent adding multiple .
    if(number == "-" && this.currentOperand != ""){
      return
    }
    if (number == ".") {
      if (this.currentOperand.includes(".")) {
        return;
      }
    }
    this.currentOperand += number;
    this.history += number
  }

  //display the result
  updateDisplay() {
    if (
      this.currentOperand == Infinity ||
      this.previousOperand == Infinity ||
      this.currentOperand == NaN ||
      this.previousOperand == NaN
    ) {
      this.prevOperandElement.innerHTML = "";
      this.currentOperandElement.innerHTML = "";
      this.operationsHistory.innerHTML = "";
    } else {
      this.prevOperandElement.innerHTML = this.previousOperand;
      this.currentOperandElement.innerHTML = this.currentOperand;
      this.operationsHistory.innerHTML = this.history;
    }
    
  }

  //do the math
  compute() {
    let result;
    if (this.previousOperand == "") {
      return;
    }
    switch (this.operator) {
      case "+":
        result = Number(this.previousOperand) + Number(this.currentOperand);
        break;
      case "-":
        result = Number(this.previousOperand) - Number(this.currentOperand);
        break;
      case "x":
        result = Number(this.previousOperand) * Number(this.currentOperand);
        break;
      case "/":
        result = Number(this.previousOperand) / Number(this.currentOperand);
        break;
      case "%":
        result = Number(this.previousOperand) / 100;
        
        break;
    }

    this.operator = undefined;
    this.currentOperand = result;
    this.previousOperand = "";
  }

  chooseOperation(operator) {
    if ((this.currentOperand === "") & (this.operator == undefined)) return;
    //already have operand (operator) operand?
    //then finish the previous math first
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operator = operator;
    this.history += operator
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
}

let calculator = new Calculator(prevOperandElement, currentOperandElement, operationsHistory);

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
  removeActiveClass(operators, "active-operator");
  removeActiveClass(nums,"num-pressed");
});

nums.forEach((num) =>
  num.addEventListener("click", () => {
    calculator.appendNum(num.innerHTML);
    calculator.updateDisplay();
  })
);

function removeActiveClass(targetElements, targetClass) {
  targetElements.forEach((targetElement) => {
    targetElement.classList.remove(targetClass);
  });
}

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    //add class to operator
    removeActiveClass(operators, "active-operator");
    operator.classList.add("active-operator");

    calculator.chooseOperation(operator.innerHTML);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  removeActiveClass(operators, "active-operator");
  removeActiveClass(nums,"num-pressed");
  calculator.compute();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

negative.addEventListener("click", () => {
  calculator.appendNum("-");
  calculator.updateDisplay();
});

nums.forEach((num) => {
  num.addEventListener("click", () => {
    removeActiveClass(nums,"num-pressed");
    num.classList.add("num-pressed");
  });
});
