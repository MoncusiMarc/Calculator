let memory = new Array(3).fill('');

function clearing(){
    endHighlight();
    memory.fill('');
    display();
    checkingButtons();
}

function insert(number) {
    switch (true){
        case numberCount(memory[2]) >= 10:
        case memory[2] == 'ERROR':
            break;
        case ['', '0'].includes(memory[2]):
            memory[2] = number;
            break;
        default:
            memory[2] += number;
            break;
    }
    display();
    checkingButtons();
}

function insertComma(){
    switch(true){
        case memory[2].includes('.'):
        case numberCount(memory[2])>=10:
        case memory[2]=='ERROR':
            break;
        case memory[2]== '':
            memory[2] = '0';
        default:
            memory[2] += '.';
            break;
    }
    display();
    checkingButtons();
}

function polarity() {
    switch (true){
        case ['ERROR', '0', '0.'].includes(memory[2]):
            break;
        case memory[2] == '':
            memory[0] = String(-memory[0]);
            break;
        case memory[2].charAt(memory[2].length -1) == '.':
            memory[2] = String(-memory[2]) + '.';
        default:
            memory[2] = String(-memory[2]);
    }
    display();
    checkingButtons();
}

function insertOperator(input,operator){
    switch(true){
        case memory[2] == 'ERROR':
            break;
        case memory[0] == '' && memory[2] == '':
            memory[0] = document.getElementById('Display').innerText(',','.');
            break;
        case memory[0] == '' && memory[2] != '':
            memory[0] = memory[2];
            memory[2] = '';
            break;
        case memory[0] != '' && memory[2] == '':
            break;
        case memory[0] != '' && memory[2] != '':
            memory[0] = +parseFloat(evaluate(memory.join(' '))).toFixed(10);
            memory[0] = toDecimal(memory[0]);
            memory[2] = numberCheck(memory[0]);
            break;
        default:
            memory[2] = 'ERROR';
    }
    memory[1] = operator;
    endHighlight();
    highlight(input);
    checkingButtons();
}

function equals()  {
    memory[0] = +parseFloat(evaluate(memory.join(' '))).toFixed(10);
    memory[0] = toDecimal(memory[0]);
    memory[2] = numberCheck(memory[0]);
    display();
    memory[0] = ''; //HOW TO REDUCE FROM 87 TO 91, MAYBE FILL('')
    memory[1] = '';
    if(memory[2]!='ERROR'){
        memory[2]= '';
    } 
    endHighlight();
    checkingButtons();
}


function display(number = memory[2]){
    const display = document.getElementById('Display');
    if (number == '') display.innerText = '0';
    else display.innerText = number.replace('.',',');
}

function numberCheck(number){
    switch (true) {
        case ['NaN', 'undefined', 'Infinity', '-Infinity'].includes(number):
            number = 'ERROR';
            break;
        case numberCount(number) > 10:
            if(number.includes('.')){
                do{
                    number = number.slice(0, -1);
                }while(numberCount(number)>10 && number.includes('.'));
                if(numberCount(number)> 10) number = 'ERROR';
                if(number.includes('.')) number = number.slice(0,-1);
            }
            break;
        default:
            break;
    }
    return String(number);
}

function numberCount(number){
    return number.replace(/[^0-9]/g, '').length;
}

function numberToDecimal(number){
    if (Math.abs(number) <1.0){
        var e = parseInt(number.toString().split('e-')[1]);
        if(e){
            number *= Math.pow(10,e-1);
            number = '0.' + (new Array(e)).join('0') + number.toString().substring(2);
        }
    } else {
        var e = parseInt(number.toString().split('+')[1]);
        if(e > 20){
            e -= 20;
            number /= Math.pow(10,e);
            number += (new Array(e+1)).join('0');
        }
    }
    return number;
}

function evaluate(str){
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

function highlight(input){
    input.classList.add('highlight');
}

function endHighlight() {
    const buttons = document.querySelectorAll('input');
    buttons.forEach((b) => {
        b.classList.remove('highlight');
    });
}

function unableButtons(list){
    list.forEach((b) =>{
        b.classList.remove('disable');
    });
}
function checkingButtons(){
    const list = document.querySelectorAll('input');
    unableButtons(list);
    switch (true) {
        case numberCount(memory[2]) >= 10:
            list.forEach((b) => {
                if(b.classList.contains('number')) b.classList.add('disable');
            });
            break;
        case memory[2].includes('.'):
            document.getElementById('comma').classList.add('disable');
            break;
        case memory[2] == 'ERROR':
            list.forEach((b) =>{
                b.classList.add('disable');
            })
            document.getElementById('clear').classList.remove('disable');
            break;
        case ['0', '0.'].includes(memory[2]):
        case [''].includes(memory[2]):
            document.getElementById('plusminus').classList.add('disable');
            break;
    }
}

document.addEventListener(
    'keydown',
    (event) => {
        event.preventDefault();
        var name = event.key;
        var code = event.code;
        switch (true) {
            case ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(name):
                insert(name);
                break;
            case ['+', '-', '/', '*'].includes(name):
                document.querySelectorAll('input').forEach((i) => {
                    if (i.value == name) {
                        input = i;
                    }
                });
                insertOperator(input, name);
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
    },
    false
);

window.onload = function(){
    checkingButtons();
    document.getElementById('n0').classList.add('disable');
}