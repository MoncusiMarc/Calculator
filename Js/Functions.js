const MAX_DIGITS_ON_SCREEN = 10;

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelectorAll('[data-equals]')
const plusminusButton = document.querySelectorAll('[data-plusminus]')
const commaButton = document.querySelectorAll('[data-comma]')
const clearButton = document.querySelectorAll('[data-clear]')
const displayElement = document.querySelectorAll('[data-display]')

const Calculator = new Calculator(displayElement);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        Calculator.insertNumber(button.innerText);
        Calculator.setDisplay();
    })
})
commaButton.addEventListener('click',()=>{
    Calculator.insertComma();
    Calculator.setDisplay();
})

plusminusButton.addEventListener('click',()=>{
    Calculator.insertNegation();
    Calculator.setDisplay();
})

operatorButtons.forEach(button => {
    button.addEventListener('click',()=>{
        Calculator.insertOperator(button.innerText);
    })
})
equalsButton.addEventListener('click',()=>{
        Calculator.calculate();
        Calculator.setDisplay();
})

clearButton.addEventListener('click',()=>{
    Calculator.clearing();
    Calculator.setDisplay();
})

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