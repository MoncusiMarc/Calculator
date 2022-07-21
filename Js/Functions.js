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
        case ['', '0'].includes(screenNumber):
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
        case ['ERROR', '0', '0.'].includes(screenNumber):
            break;
        case screenNumber == '':
            if(["+","-","*","/"].some(operator => memory.includes(operator))){
                let tmp = memory.split(" ");
                tmp[0] = String(-tmp[0]);
                memory = tmp.join(' ');
            }else{
                memory = document
                    .getElementById('Display')
                    .innerText.replace(',', '.');
                memory = String(-memory);
            }
            display(memory.split(' ')[0]);
            break;
        case screenNumber.charAt(screenNumber.length - 1) == '.':
            screenNumber = String(-screenNumber);
            screenNumber += '.';
            display();
            break;
        default:
            screenNumber = String(-screenNumber);
            display();
            break;
    }
    disableButtons();
}

function insertOperator(input, operator) {
    switch (true) {
        case screenNumber == 'ERROR':
            break;
        case screenNumber != '' && memory != '':
            memory += ' ' + screenNumber;
            memory = +parseFloat(evaluate(memory)).toFixed(10);
            memory = toDecimal(memory);
            screenNumber = numberCheck(memory);
            display();
            if (screenNumber != 'ERROR') {
                screenNumber = '';
            }
            break;
        case screenNumber != '' && memory == '':
            memory += screenNumber;
            screenNumber = '';
            break;
        case screenNumber == '' && memory != '':
            memory = memory.slice(0, -1);
            break;
        case screenNumber == '' && memory == '':
            memory = document
                .getElementById('Display')
                .innerText.replace(',', '.');
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
    memory = +parseFloat(evaluate(memory)).toFixed(10);
    memory = toDecimal(memory);
    screenNumber = numberCheck(String(memory));
    display();
    memory = '';
    if (screenNumber != 'ERROR') {
        screenNumber = '';
    }
    disableButtons();
}

function display(number = screenNumber) {
    const display = document.getElementById('Display');
    if (number == '') display.innerText = '0';
    else display.innerText = number.replace('.', ',');
}

function numberCheck(number) {
    switch (true) {
        case number == 'NaN':
        case number == 'undefined':
        case number == 'Infinity':
        case number == '-Infinity':
            number = 'ERROR';
            break;
        case numberCount(number) > 10: //TODO
            if (number.includes('.')) {
                do {
                    number = number.slice(0, -1);
                } while (numberCount(number) > 10 && number.includes('.'));
                if(numberCount(number)> 10) number = 'ERROR';
                if(number.includes('.')) number = number.slice(0,-1);
                break;
            }
            number = 'ERROR';
            break;
        case numberCount(number)<0:
            number='ERROR';
            break;
        default:
            break;
    }
    return String(number);
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

function toDecimal(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

function highlight(input) {
    input.classList.add('highlight');
}

function endHighlight() {
    const buttons = document.querySelectorAll('input');
    buttons.forEach((b) => {
        b.classList.remove('highlight');
    });
}

function unableButtons(list) {
    list.forEach((b) => {
        b.classList.remove('disable');
    });
}

function disableButtons() {
    const list = document.querySelectorAll('input');
    unableButtons(list);
    switch (true) {
        case numberCount(screenNumber) >= 10:
            list.forEach((b) => {
                if (b.classList.contains('number')) {
                    b.classList.add('disable');
                }
            });
            break;
        case screenNumber.includes('.'):
            document.getElementById('comma').classList.add('disable');
            break;
        case screenNumber == 'ERROR':
            list.forEach((b) => {
                b.classList.add('disable');
            });
            document.getElementById('clear').classList.remove('disable');
            break;
        case ['0', '0,'].includes(screenNumber):
        case [''].includes(memory):
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
    disableButtons();
}