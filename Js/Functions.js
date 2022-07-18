
let memory = '';
let screenNumber = '';

function clearing() {
	endHighlight();
	memory = '';
	screenNumber = '';
	display();
}

function insert(number) {
	switch (true) {
		case numberCount(screenNumber) >= 10:
		case screenNumber == 'ERROR':
			break;
		case screenNumber == '':
		case screenNumber == '0':
			screenNumber = number;
			break;
		default:
			screenNumber += number;
			break;
	}
	display();
}

function insertComma() {
	switch (true) {
		case screenNumber.includes('.'):
		case numberCount(screenNumber) >= 10:
		case screenNumber == 'ERROR':
			break;
		case screenNumber == '':
			screenNumber = '0';
		case screenNumber == '0':
		default:
			screenNumber += '.';
			break;
	}
	display();
}

// 12 // + // +/- // =
// escenari linia 284?? com afecta el +/-?
function polarity() {
	switch (true) {
		case screenNumber == 'ERROR':
		case screenNumber == '':
		case screenNumber == '0':
		case screenNumber == '0.':
			break;
        case screenNumber.charAt(screenNumber.length - 1) == '.':
            screenNumber = String(-screenNumber);
            screenNumber += '.';
            break;
		default:
			screenNumber = String(-screenNumber);
			break;
	}
	display();
}

function insertOperator(input, operator) {
    console.log('OPERATOR');
    console.log('MEMORY: '+memory);
    console.log('SCREEN: '+screenNumber);
	switch (true) {
		case screenNumber == 'ERROR':
			break;
		case screenNumber != '' && memory != '':
			equals();
			break;
		case screenNumber != '' && memory == '':
			memory += screenNumber;
			screenNumber = '';
			break;
		case screenNumber == '' && memory != '': //TODO: chapuza para resolver problema en la linea 251 y 267
            if (['+', '-', '/', '*', '.'].includes(memory.charAt(screenNumber.length-1))){
                memory = memory.slice(0, -1);
            }
			
			break;
		case screenNumber == '' && memory == '':
			//TODO: que passa si apretem un operador sense que s'hagi entrat res.
			//Utilitza el 0 del display com a primer operant o no.
			let displayed = document.getElementById('Display').innerText.replace(',', '.');
			memory = displayed;
			break;
	}
	memory += ' ' + operator;
	endHighlight();
	highlight(input);
	//display(); //TODO: deberia aparecer el numero antiguo o el 0 del proximo.
}
function equals() {
	endHighlight();
	memory += ' ' + screenNumber;
    console.log('MEMORY: '+memory);
    console.log('SCREEN: '+screenNumber);
	memory = String(Math.evaluate(memory));

	switch (true) {
		case memory == 'NaN':
		case memory == 'undefined':
		case memory == 'Infinity':
        case memory == '-Infinity':
		case numberCount(memory) > 10:
			screenNumber = 'ERROR';
			display();
			break;
		default:
			display(memory);
			screenNumber = '';
			break;
	}
}

function display(number = screenNumber) {
	const display = document.getElementById('Display');
	if (number == '') display.innerText = 0;
	else display.innerText = number.replace('.', ',');
}

function highlight(input) {
	input.classList.add('highlight');
}

function endHighlight() {
	const buttons = document.querySelectorAll('input');
	buttons.forEach(function (b) {
		b.classList.remove('highlight');
	});
}

function numberCount(numbers) {
	return numbers.replace(/[^0-9]/g, '').length;
}

Math.evaluate = function (str) {
	for (var i = 0; i < str.length; i++) {
		if (isNaN(str[i]) && !['+', '-', '/', '*', '.'].includes(str[i])) {
			return NaN;
		}
	}

	try {
		return eval(str);
	} catch (e) {
		if (e.name !== 'SyntaxError') throw e;
		return NaN;
	}
};