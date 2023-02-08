const result = document.querySelector(".result");
var textEquation = "";
var onOp = false;
var onDecimal = false;

/***
 * Custom eval function to handle errors from eval native function
 * Fix decimal places to 3 when it's repeating
 * @param {String} textEquation - The equation to be evaluated
 */
const customEval = (textEquation) => {
  try {
    const res = eval(textEquation);
    return res;
    // Equivalent to the above line
    // if (res.toString().includes(".")) {
    //   const decimal = res.toString().split(".")[1];
    //   if (decimal.length > 3) {
    //     return res.toFixed(3);
    //   }
    // }
    // return res;
  } catch (e) {
    window.alert(
      `Invalid equation, please try again\nError Message: ${e.message}`
    );
    window.location.reload();
  }
};

const handleBtnClick = (el) => {
  console.log(el);
  const btnValue = el.innerHTML.trim();
  switch (btnValue) {
    case "AC":
      textEquation = "0";
      result.innerHTML = textEquation;
      onOp = false;
      break;
    case "←":
      /***
       * We don't want to make the result on HTML empty
       */
      if (textEquation.length <= 1) {
        textEquation = "0";
        result.innerHTML = textEquation;
      } else {
        if (onOp) onOp = false;

        textEquation = textEquation.slice(0, -1);
        result.innerHTML = result.innerHTML.slice(0, -1);

        /**
         * Check if the last character is an operator
         * If it is, set onOp to true
         */
        if (
          textEquation[textEquation.length - 1] === "+" ||
          textEquation[textEquation.length - 1] === "-" ||
          textEquation[textEquation.length - 1] === "*" ||
          textEquation[textEquation.length - 1] === "/"
        ) {
          onOp = true;
        }
      }
      break;
    case "=":
      result.innerHTML = customEval(textEquation);
      textEquation = result.innerHTML;
      break;
    case ",":
      if (onDecimal) {
        if (onOp) onDecimal = false;
        return;
      }
      if (
        textEquation[textEquation.length - 1] === "+" ||
        textEquation[textEquation.length - 1] === "-" ||
        textEquation[textEquation.length - 1] === "*" ||
        textEquation[textEquation.length - 1] === "/"
      ) {
        onDecimal = false;
        return
      }
      onDecimal = true;
      textEquation += ".";
      result.innerHTML += btnValue;
      break;
    default:
      /**
       * To handle display so it wouldnt be like "09+1"
       */
      if (result.innerHTML === "0" && el.id === "btn-num") {
        result.innerHTML = "";
        textEquation = "";
      }

      /**
       * handle different operators clicked in a row
       */
      if (el.id === "btn-op" && onOp === true ) {
        textEquation = textEquation.slice(0, -1);
        result.innerHTML = result.innerHTML.slice(0, -1);
      }

      if (el.id === 'btn-op' && textEquation[textEquation.length - 1] === ".") {
        return
      }

      if (el.id === "btn-op") onOp = true;
      else onOp = false;

      /**
       * Special case for multiplication and decimal point
       */
      if (btnValue === "×") textEquation += "*";
      else textEquation += btnValue;

      result.innerHTML += btnValue;
  }
};
