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
let operationsHistory = document.querySelector(".history");
//light-mode
let lightModeBtn = document.querySelector(".light-mode-btn");
let calc = document.querySelector(".calc");
class Calculator {
  //passing display elements
  constructor(prevOperandElement, currentOperandElement, operationsHistory) {
    this.prevOperandElement = prevOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.operationsHistory = operationsHistory;
    //clear the displayed nums once the calculator is created
    this.clear();
  }
  //delete all inputs
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
    this.history = "";
    this.updateDisplay();
  }

  //delete a single num
  delete() {
    this.currentOperand = this.currentOperand.slice(
      0,
      this.currentOperand.length - 1
    );
    this.history = this.currentOperand;
  }

  //
  appendNum(number) {
    //controlling the -ve sign
    if (number == "-" && this.currentOperand != "") {
      return;
    }
    //to prevent adding multiple .
    if (number == ".") {
      if (this.currentOperand.includes(".")) {
        return;
      }
    }
    //if the last char of history is equal
    //then we should clear the previous operation
    // if (this.history[this.history.length - 1] == "=") {
    //   this.clear();
    // }
    this.currentOperand += number;

    this.history += number;
  }

  //display the result
  updateDisplay() {
    if (
      this.currentOperand === Infinity ||
      this.previousOperand === Infinity ||
      this.currentOperand === NaN ||
      this.previousOperand === NaN
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
    // if (!this.currentOperand) {
    //   this.history += "=";
    // }
  }

  chooseOperation(operator) {
    let ops = ["+", "-", "/", "x"];

    if ((this.currentOperand === "") & (this.operator == undefined)) return;
    //already have operand (operator) operand?
    //then finish the previous math first
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operator = operator;
    //if multiple operaors were inserted in a row
    //then we will assign the latest operator
    if (ops.includes(this.history.slice(this.history.length - 1))) {
      let historyArr = this.history.split("")
      historyArr.pop()
      this.history = historyArr.join("")
    }
    this.history += operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
}

let calculator = new Calculator(
  prevOperandElement,
  currentOperandElement,
  operationsHistory
);

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
  removeActiveClass(operators, "active-operator");
  removeActiveClass(nums, "num-pressed");
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
    targetElement.style.transition = "0.3s";
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
  removeActiveClass(nums, "num-pressed");
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
    removeActiveClass(nums, "num-pressed");
    num.classList.add("num-pressed");
  });
});

//light mode
lightModeBtn.addEventListener("click", () => {
  if (document.body.style.color != "black") {
    document.body.style.color = "black";
    calc.style.backgroundColor = "#f1f2f6";
    calc.style.transition = "0.5s";
    lightModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    lightModeBtn.style.transition = "0.2s";
  } else {
    document.body.style.color = "#f1f2f6";
    calc.style.backgroundColor = "#353b4871";
    lightModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
