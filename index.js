import { sum, difference, product, fraction } from "./util/util.js";

// the active variable is the one currently being edited
// starts with a
const operators = ["/", "*", "-", "+"];
const calculator = {
  a: "0",
  b: "",
  operator: ""
};

const clear = function() {
  calculator.a = "0";
  calculator.b = "";
  calculator.operator = "";

  console.log(`clear ended with: ${calculator.a}, ${calculator.b}, ${calculator.operator}`);

  // render the value
  displayValue();
};

const getDeletable = function(deletable) {
  if (deletable.length === 1) {
    // replace last digit with 0
    return "0";
  } else if (deletable.length > 1) {
    // remove digit from the right
    return deletable.substring(0, deletable.length - 1);
  }
};

const deleteDigit = function() {
  // choose which operand to work on
  if (calculator.b === "") {
    // a is active
    calculator.a = getDeletable(calculator.a);
  } else if (calculator.b.length > 0) {
    // b is active
    calculator.b = getDeletable(calculator.b);
  }

  console.log(`deleteDigit ended with: ${calculator.a}, ${calculator.b}`);

  // render the value
  displayValue();
};

const getInsertable = function(insertable, option) {
  if (option === ".") {
    if (insertable.includes(".")) {
      // only one decimal separator allowed
      return insertable;
    }
    // append decimal separator
    return insertable + option;
  } else if (insertable === "0") {
    // replace 0 with digit
    return option;
  } else if (insertable.length > 0) {
    // append digit from the right
    return insertable + option;
  }
};

const insertDigit = function(option) {
  // choose which operand to work on
  if (calculator.b === "") {
    // a is active
    calculator.a = getInsertable(calculator.a, option);
  } else if (calculator.b.length > 0) {
    // b is active
    calculator.b = getInsertable(calculator.b, option);
  }

  console.log(`insertDigit ended with: ${calculator.a}, ${calculator.b}`);

  // render the value
  displayValue();
};

const operate = function(option) {
  if (option === "=" && calculator.b === "") {
    return;
  }
  let result;
  if (calculator.b.length > 0) {
    // calculate a operator b
    switch (calculator.operator) {
      case "/":
        result = fraction(calculator.a, calculator.b);
        break;
      case "*":
        result = product(calculator.a, calculator.b);
        break;
      case "-":
        result = difference(calculator.a, calculator.b);
        break;
      case "+":
        result = sum(calculator.a, calculator.b);
        break;
      default:
        break;
    }

    console.log(`result: ${result}`);

    // convert float to string
    if (result === "MATH ERROR") {
      clear();

      // render the value
      displayValue(result);
      console.log(`operate error: ${result}`);
      return;
    }

    // save the result
    calculator.a = result.toPrecision(12);

    // a becomes active
    calculator.b = "";
  }
  if (operators.includes(option)) {
    calculator.operator = option;

    // b becomes active
    calculator.b = "0";
  }

  console.log(`operate ended with: ${calculator.a}, ${calculator.b}, ${calculator.operator}`);

  // render the value
  displayValue();
};

const displayValue = function(option = "") {
  let value;

  // assign the value
  if (option === "MATH ERROR") {
    value = option;
  } else if (calculator.b === "") {
    value = calculator.a;
    // clear previous calculation
    calculatorPrevious.textContent = "";
  } else {
    value = calculator.b;
    // display a and operator if b is active
    console.log(`render ${calculator.a} ${calculator.operator}`);
    calculatorPrevious.textContent = `${calculator.a} ${calculator.operator}`;
  }

  // display the value
  console.log(`render ${value}`);
  calculatorValue.textContent = value;
};

const calculatorKeys = document.getElementById("calculator__keys");
calculatorKeys.addEventListener("click", (e) => {
  const { action } = e.target.dataset;
  console.log(action);
  switch (action) {
    case "clear":
      clear();
      break;
    case "delete":
      deleteDigit();
      break;
    case "7":
      insertDigit("7");
      break;
    case "8":
      insertDigit("8");
      break;
    case "9":
      insertDigit("9");
      break;
    case "divide":
      operate("/");
      break;
    case "4":
      insertDigit("4");
      break;
    case "5":
      insertDigit("5");
      break;
    case "6":
      insertDigit("6");
      break;
    case "multiply":
      operate("*");
      break;
    case "1":
      insertDigit("1");
      break;
    case "2":
      insertDigit("2");
      break;
    case "3":
      insertDigit("3");
      break;
    case "subtract":
      operate("-");
      break;
    case "decimal":
      insertDigit(".");
      break;
    case "0":
      insertDigit("0");
      break;
    case "equal":
      operate("=");
      break;
    case "add":
      operate("+");
      break;
    default:
      break;
  }
});

const calculatorPrevious = document.getElementById("calculator__previous");
const calculatorValue = document.getElementById("calculator__value");
displayValue();
