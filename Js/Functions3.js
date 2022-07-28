let screenNumber = '';
let savedNumber = '';
let savedSign = '';
let isResult = false;

const MAX_DIGITS_ON_SCREEN = 10;

window.onload = function () {
	setButtonsStatus(true);
};

function getDisplay() {
	return document.getElementById('Display').innerText.replace(',', '.');
}

function setDisplay(number) {
	const display = document.getElementById('Display');
	if (number == '') display.innerText = '0';
	else display.innerText = number.replace('.', ',');
}

function getButtons() {
	const calculator = document.querySelector('div.Keyboard');
	return calculator.querySelectorAll('input');
}

function setButtonHighlight(button, highlight) {
	if (highlight) {
		button.classList.add('highlight');
	} else {
		button.classList.remove('highlight');
	}
}

function setAllButtonsHighlight(highlight) {
	getButtons().forEach(button => {
		setButtonHighlight(button, highlight);
	});
}
function setButtonDisabled(button,disable){
	if(disable){
		button.classList.add('disable');
	}else {
		button.classList.remove('disable');
	}
}
 
function setAllButtonsStatus() { //number -> screenNumber
	let list = getButtons();
	list.forEach(button => button.classList.remove('disable'));
	if (digitCount(number) >= MAX_DIGITS_ON_SCREEN) {
		list.forEach(button => {
			if (button.classList.contains('number')) setButtonDisabled(button,true);
		});
	}
	if (number.includes('.')) {
		setButtonDisabled(document.getElementById('comma'),true);
	}
	if (number == 'ERROR') {
		list.forEach(button => {
			button.classList.add('disable');
		});
		document.getElementById('clear').classList.remove('disable');
	}
	if (Number(number) == 0) {
		document.getElementById('plusMinus').classList.add('disable');
	}
	if (isReset) { 
		document.getElementById('n0').classList.add('disable');
	}
}

function insertNumber(number) {
	if (digitCount(screenNumber) < MAX_DIGITS_ON_SCREEN && screenNumber != 'ERROR') {
		let overWriteStates = ['', '0'];
		if (overWriteStates.includes(screenNumber)) screenNumber = number;
		else screenNumber += number;
		setDisplay(screenNumber);
		setButtonsStatus(screenNumber, false);
	}
}

function insertComma() {
	if (
		digitCount(screenNumber) < MAX_DIGITS_ON_SCREEN &&
		screenNumber != 'ERROR' &&
		!screenNumber.includes('.')
	) {
		if (screenNumber == '') screenNumber = 0;
		screenNumber += '.';
	}
	setDisplay(screenNumber);
	setButtonsStatus(screenNumber, false);
}

function insertNegation() {
	if (screenNumber != 'ERROR' && Number(screenNumber) != '0') {
		if (screenNumber == '' && savedNumber == '') {
			screenNumber = String(-getDisplay()); //me cago en tus fucking muelas
		} else if (screenNumber.charAt(screenNumber.length - 1) == '.') {
			screenNumber = String(-screenNumber) + '.';
		} else {
			screenNumber = String(-screenNumber);
		}
	}
	setDisplay(screenNumber);
	setButtonsStatus(screenNumber, false);
}

function insertOperator(button, operator) {
	if (screenNumber != 'ERROR') {
		if (screenNumber == '') {
			if (savedNumber == '') savedNumber = getDisplay(); // tus putas muelas!!!
		} else if (screenNumber != '') {
			if (savedNumber == '') {
				savedNumber = screenNumber;
				screenNumber = '';
			} else {
				screenNumber = evaluate();
				setDisplay(screenNumber);
				if (screenNumber != 'ERROR') {
					savedNumber = screenNumber;
					screenNumber = '';
				}
			}
		} else {
			screenNumber = 'ERROR';
		}
	}
	savedSign = operator;
	setAllButtonsHighlight(false);
	setButtonHighlight(button, true);
	setButtonsStatus(screenNumber, false);
}

function calculate() {
	screenNumber = evaluate();
	setDisplay(screenNumber);
	savedNumber = savedSign = '';
	if (screenNumber != 'ERROR') screenNumber = '';
	setAllButtonsHighlight(false);
	setButtonsStatus(screenNumber, false);
}

function clearing() {
	setAllButtonsHighlight(false);
	screenNumber = savedNumber = savedSign = '';
	setDisplay(screenNumber);
	setButtonsStatus(screenNumber, true);
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
			if (screenNumber.charAt(screenNumber.length - 1) == '.') number = number.slice(0, -1);
			if (digitCount(number) > MAX_DIGITS_ON_SCREEN) number = 'ERROR';
		} else {
			number = 'ERROR';
		}
	}
	return String(number);
}

function digitCount(number) {
	return number.replace(/[^0-9]/g, '').length;
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
	let firstNumber = parseFloat(savedNumber);
	let secondNumber = parseFloat(screenNumber);
	let result = 0.0;
	if (!isNaN(firstNumber) || !isNaN(secondNumber)) {
		switch (savedSign) {
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

document.addEventListener(
	'keydown',
	event => {
		event.preventDefault();
		var name = event.key;
		var code = event.code;
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
				insertNumber(name);
				break;
			case '+':
			case '-':
			case '/':
			case '*':
				getButtons().forEach(i => {
					if (i.value == name) {
						input = i;
					}
				});
				insertOperator(input, name);
				break;
			case '.':
				if (code != 'NumpadDecimal') break;
			case ',':
				insertComma();
				break;
			case 'Enter':
				calculate();
				break;
			case 'Escape':
				clearing();
				break;
			case 'Control':
				insertNegation();
				break;
			default:
				break;
		}
	},
	false
);
