var isFirst = true
var isComplete = false
var isCurrentlyOp = false
var result = document.querySelector('.result');
var record = document.querySelector('.record')
var btnPth = document.querySelector('.btn-pth');
var firstNum = '';
var equation = '';
var isFirstParenthesis = true
var isMinus = false

const handleOperand = (val) => {
  if (firstNum === '') firstNum = val;
  else if (firstNum === '0' && val === '0') return;
  else if (val === '0' && firstNum === '-') {
    result.innerHTML = '';
    equation = '';
  } else if (firstNum === '0') {
    result.innerHTML = result.innerHTML.slice(0, -1);
  }

  if (isComplete) {
    result.innerHTML = ''
    record.innerHTML = ''
    equation = ''
    isComplete = false;
  }

  result.innerHTML += val;
  equation += val;
  isCurrentlyOp = false;
  isMinus = false;
  if (isFirstParenthesis) btnPth.disabled = true;
};

const handleOperator = (val) => {
  if (isFirst) record.innerHTML = '';
  if (isMinus) return;
  if (result.innerHTML === '' || result.innerHTML[result.innerHTML.length-1] === '(') {
    if (val === '-') {
      isMinus = true;
      result.innerHTML += val;
      equation += val;
      firstNum = '-';
    }
    return;
  }
  if (isCurrentlyOp) {
    console.log(result.innerHTML)
    result.innerHTML = result.innerHTML.slice(0, -2);
    equation = equation.slice(0, -1);
  }
  result.innerHTML += ' ' + val + ' ';
  equation += val === '×' ? '*' : val;
  isFirst = false;
  isComplete = false;
  firstNum = ''
  isCurrentlyOp = true;
  if (isFirstParenthesis) btnPth.disabled = false;
}

const handleEqual = () => {
  if (isCurrentlyOp) {
    alert('Please complete the equation');
    return;
  }
  if (isFirst) return
  record.innerHTML = result.innerHTML;
  result.innerHTML = solve();
  equation = result.innerHTML;
  isComplete = true;
  isFirst = true;
}

const solve = () => {
  try {
    res = eval(equation)
    res = Math.abs(res) * 1000 % 10 > 0 ? res.toFixed(3): res;
  } catch (e) {
    res = 'Error';
  }
  return res;
}

const handleAC = () => {
  result.innerHTML = '';
  record.innerHTML = '';
  equation = '';
  isFirst = true;
  isFirstParenthesis = true;
}

const handlePlusMinus = () => {
  result.innerHTML = -Number(result.innerHTML);
}

const handleParenthesis = () => {
  if (isFirstParenthesis) {
    result.innerHTML += '(';
    equation += '(';
  }  else {
    result.innerHTML += ')';
    equation += ')';
  }
  isFirstParenthesis = !isFirstParenthesis;
}