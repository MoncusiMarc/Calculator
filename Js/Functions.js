//	ARCHIVO FUNCTIONS

const MAX_DIGITS_ON_SCREEN = 10;

const numberButtons = document.querySelectorAll('[data-number]')
const num0Button = document.querySelector('#n0')
const operatorButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const plusMinusButton = document.querySelector('[data-plusMinus]')
const commaButton = document.querySelector('[data-comma]')
const clearButton = document.querySelector('[data-clear]')
const displayElement = document.querySelector('[data-display]')

const Calculator = new calculator(displayElement.innerText)

window.onload = function() {
	setAllButtonsStatus()
}

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        Calculator.insertNumber(button.innerText)
        Calculator.updateDisplay()
		setAllButtonsStatus()
    })
})
commaButton.addEventListener('click',()=>{
    Calculator.insertComma()
    Calculator.updateDisplay()
	setAllButtonsStatus()
})

plusMinusButton.addEventListener('click',()=>{
    Calculator.insertNegation()
    Calculator.updateDisplay()
	setAllButtonsStatus()
})

operatorButtons.forEach(button => {
    button.addEventListener('click',()=>{
        Calculator.insertOperator(button.innerText)
		Calculator.updateDisplay()
		setAllButtonsHighlight(false)
		setButtonHighlight(button, true)
		setAllButtonsStatus()
    })
})
equalsButton.addEventListener('click',()=>{
        Calculator.calculate()
        Calculator.updateDisplay()
		setAllButtonsStatus()
})

clearButton.addEventListener('click',()=>{
    Calculator.clearing()
    Calculator.updateDisplay()
	setAllButtonsHighlight(false)
	setAllButtonsStatus()
})


document.addEventListener(
	'keydown',
	event => {
		event.preventDefault()
		var name = event.key
		var code = event.code
		switch (name) {
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '0':
				Calculator.insertNumber(name)
				Calculator.updateDisplay()
				setAllButtonsStatus()
				break;
			case '+':
			case '-':
			case '/':
			case '*':
				operatorButtons.forEach(button => {
					if (button.innerText == name) {
						input = button
					}
				})
				Calculator.insertOperator(input.innerText)
				Calculator.updateDisplay()
				setAllButtonsHighlight(false)
				setButtonHighlight(input, true)
				setAllButtonsStatus()
				break
			case '.':
				if (code != 'NumpadDecimal') break
			case ',':
				Calculator.insertComma()
				Calculator.updateDisplay()
				setAllButtonsStatus()
				break
			case 'Enter':
				Calculator.calculate()
				Calculator.updateDisplay()
				setAllButtonsStatus()
				break
			case 'Escape':
				Calculator.clearing()
				Calculator.updateDisplay()
				setAllButtonsHighlight(false)
				setAllButtonsStatus()
				break
			case 'Control':
				Calculator.insertNegation()
				Calculator.updateDisplay()
				setAllButtonsStatus()
				break
			default:
				break
		}
	},
	false
)

function digitCount(number) {
	return number.replace(/[^0-9]/g, '').length;
}

function isNumberWellFormed(number) {
	let ErrorStates = ['NaN', 'undefined', 'Infinity', '-Infinity'];
	if (ErrorStates.includes(number)) {
		number = 'ERROR';
	} else if (digitCount(number) > MAX_DIGITS_ON_SCREEN) {
		if (number.includes('.')) {
			while (digitCount(number) > MAX_DIGITS_ON_SCREEN && number.includes('.')) {
				number = number.slice(0, -1);
			}
			if (number.charAt(number.length - 1) == '.') number = number.slice(0, -1);
			if (digitCount(number) > MAX_DIGITS_ON_SCREEN) number = 'ERROR';
		} else {
			number = 'ERROR';
		}
	}
	return String(number);
}

function exponentialNumberToDecimal(number) {
	if (Math.abs(number) < 1.0) {
		var e = parseInt(number.toString().split('e-')[1]);
		if (e) {
			number *= Math.pow(10, e - 1);
			number = '0.' + new Array(e).join('0') + number.toString().substring(2);
		}
	} else {
		var e = parseInt(number.toString().split('+')[1]);
		if (e > 20) {
			e -= 20;
			number /= Math.pow(10, e);
			number += new Array(e + 1).join('0');
		}
	}
	return number;
}

function evaluate() {
	let firstNumber = parseFloat(Calculator.getSavedNumber());
	let secondNumber = parseFloat(Calculator.getDisplay());
	let result = 0.0;
	if (!isNaN(firstNumber) || !isNaN(secondNumber)) {
		switch (Calculator.getSavedOperation()) {
			case '+':
				result = firstNumber + secondNumber;
				break;
			case '-':
				result = firstNumber - secondNumber;
				break;
			case '*':
				result = firstNumber * secondNumber;
				break;
			case '/':
				result = firstNumber / secondNumber;
				break;
			default:
				result = secondNumber;
				break;
		}
	}
	if (String(result).includes('e')) {
		result = exponentialNumberToDecimal(result);
		result = isNumberWellFormed(String(result));
		if (result.charAt(result.length - 1) == 0 && result.includes('.')) {
			result = Number(result);
		}
		return result;
	}
	result = Number(parseFloat(result).toFixed(10));
	return isNumberWellFormed(String(result));
}

function getButtons() {
	const calculator = document.querySelector('div.Keyboard');
	return calculator.querySelectorAll('input');
}