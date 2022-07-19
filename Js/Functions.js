let memory = '';
let screenNumber = '';

function clearing() {
	endHighlight();
	memory = '';
	screenNumber = '';
	display();
	disableButtons();
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
	disableButtons();
}

function insertComma() {
	switch (true) {
		case screenNumber.includes('.'):
		case numberCount(screenNumber) >= 10:
		case screenNumber == 'ERROR':
			break;
		case screenNumber == '':
			screenNumber = '0';
		default:
			screenNumber += '.';
			break;
	}
	display();
	disableButtons();
}

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
	disableButtons();
}

function insertOperator(input, operator) {
	switch (true) {
		case screenNumber == 'ERROR':
			break;
		case screenNumber != '' && memory != '':
			memory += ' ' + screenNumber;

			memory = +(parseFloat(evaluate(memory))).toFixed(10);
			screenNumber=numberCheck(String(+(memory)));
			display();
			if(screenNumber!='ERROR'){screenNumber=''}
			break;
		case screenNumber != '' && memory == '':
			memory += screenNumber;
			screenNumber = '';
			break;
		case screenNumber == '' && memory != '': //TODO:
                memory = memory.slice(0, -1);			
			break;
		case screenNumber == '' && memory == '':
			let displayed = document.getElementById('Display').innerText.replace(',', '.');
			memory = displayed;
			break;
	}
	memory += ' ' + operator;
	endHighlight();
	highlight(input);
	disableButtons();
}

function equals() {
	endHighlight();
	memory += ' ' + screenNumber;
	console.log(memory);
    memory = +(parseFloat(evaluate(memory))).toFixed(10);
	console.log(memory);
	screenNumber=numberCheck(String(+memory));
	display();
	memory='';
	if(screenNumber!='ERROR'){screenNumber=''}
	disableButtons();
	
}

function display(number = screenNumber) {
	const display = document.getElementById('Display');
	if (number == '') display.innerText = 0;
	else display.innerText = number.replace('.', ',');
}

function numberCheck(number){
	switch(true){
		case number=='NaN':
		case number=='undefined':
		case number=='Infinity':
		case number=='-Infinity':
			number='ERROR';
			break;
		case numberCount(number)>10:
			if(number.includes('.')){
				do{
					number = number.slice(0,-1);
				}while(numberCount(number)>10 && number.includes('.'));
			}
			number='ERROR';
			break;
		default:
			break;
	}
	return number;
}

function numberCount(numbers) {
	return numbers.replace(/[^0-9]/g, '').length;
}

function evaluate(str) {
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
}

function highlight(input) {
	input.classList.add('highlight');
}

function endHighlight() {
	const buttons = document.querySelectorAll('input');
	buttons.forEach((b) =>{
		b.classList.remove('highlight');
	});
}

function unableButtons(list){
	list.forEach((b) => {
		b.classList.remove('disable');
	});
}

function disableButtons(){
	const list = document.querySelectorAll("input");
	unableButtons(list);
	switch(true){
		case (numberCount(screenNumber)>=10):
			list.forEach((b) =>{
				if(b.classList.contains('number')){
					b.classList.add('disable');
				}
			});
			break;
		case (screenNumber.includes('.')):
			document.getElementById('comma').classList.add('disable');
			break;
		case (screenNumber=='ERROR'):
			list.forEach((b) =>{
				b.classList.add('disable');
			});
			document.getElementById('clear').classList.remove('disable');
		break;
	}
}


document.addEventListener('keydown', (event) => {
	var name = event.key;
	var code = event.code;
	switch(true){
		case ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(name):
			insert(name);
			break;
		case ['+', '-', '/', '*'].includes(name):
			document.querySelectorAll('input').forEach((i) =>{
				if(i.value==name){input=i;}
			});
			insertOperator(input,name);
			break;
		case [','].includes(name):
		case code == 'NumpadDecimal':
			insertComma();
			break;
		case ['Enter'].includes(name):
			equals();
			break;
		case ['Escape'].includes(name):
			clearing();
			break;
		case ['Control'].includes(name):
			polarity();
			break;
		default:
			break;
	}
  }, false);
