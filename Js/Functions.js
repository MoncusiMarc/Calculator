let screenNumber = '';
let savedNumber = '';
let savedSign = '';

const digitsOnScreen = 10;

window.onload = function(){
    setButtonsStatus(screenNumber,true);
}

function getDisplay(){
    return document.getElementById('Display').innerText.replace(',','.');
}

function setDisplay(number){
    const display = document.getElementById('Display').innerText;
    if(number = '') display = '0';
    else display = number.replace('.',',');
}

function getButtons(){
    const calculator = document.querySelector('div.Keyboard');
    return calculator.querySelectorAll('input');
}

function setButtonHighlight(button,highlight){
    if(highlight){
        button.classList.add('highlight');
    }else{
        button.classList.remove('highlight')
    }
}

function setAllButtonsHighlight(state){
    getButtons.forEach((button)=>{
        setButtonHighlight(button,state);
    })
}

function setButtonsStatus(number,reset0){
    let list = getButtons();
    list.forEach((button)=>button.classList.remove('disable'));
    if(digitCount(number)>=digitsOnScreen){
        list.forEach((button) => {
        if(button.classList.contains('number')) button.classList.add('disable');
        });
    }
    if(number.includes('.')){
        document.getElementById('comma').classList.add('disable');
    }
    if(number == 'ERROR'){
        list.forEach((button) =>{
            button.classList.add('disable');
        })
        document.getElementById('clear').classList.remove('disable');
    }
    if(Number(number)==0){
        document.getElementById('plusminus').classList.add('disable');
    }
    if(reset0){
        document.getElementById('n0').classList.add('disable');
    }
}

function insertNumber(number){
    let overWriteStates = ['','0'];
    if(digitCount(screenNumber)<digitsOnScreen && screenNumber != 'ERROR'){
        if(overWriteStates.includes(screenNumber)) screenNumber = number;
        else   screenNumber += number;
        
    }
    setDisplay(screenNumber);
    setButtonsStatus(screenNumber,false);
}

function insertComma(){
    if(digitCount(screenNumber)<digitsOnScreen && screenNumber != 'ERROR' && !screenNumber.includes('.')){
        if(screenNumber == '') screenNumber = 0;
        screenNumber += '.';
    }
}

function insertNegation(){
    if(screenNumber != 'ERROR' && Number(screenNumber) !='0'){
        if(screenNumber == '' && savedNumber == ''){
            screenNumber = String(-getDisplay());
        }else if(screenNumber.charAt(screenNumber.length -1) !='.'){
            screenNumber = String(-screenNumber) + '.';
        }else{
            screenNumber = String(-screenNumber);
        }
    }
    setDisplay(screenNumber);
    setButtonsStatus(screenNumber,false);
}

function insertOperator(button, operator){
    if(screenNumber != 'ERROR' ){
        if(screenNumber == ''){
            if(savedNumber == '') savedNumber = getDisplay();
        }else if(screenNumber != ''){
            if(savedNumber ==''){
                savedNumber = screenNumber;
                screenNumber = '';
            }else{
                screenNumber = evaluate();
                setDisplay(screenNumber);
                savedNumber = savedSign = '';
                if(screenNumber != 'ERROR') screenNumber ='';
            }
        }else{
            screenNumber = 'ERROR';
        }
    }
    savedSign = operator;
    setAllButtonsHighlight(false);
    setButtonHighlight(button,true);
    setButtonsStatus(screenNumber,false);
}

function calculate(){
    screenNumber = evaluate();
    console.log(screenNumber);
    setDisplay(screenNumber);
    savedNumber = savedSign = '';
    if(screenNumber != 'ERROR') screenNumber ='';
    setAllButtonsHighlight(false);
    setButtonsStatus(screenNumber,false);
}

function clearing(){
    setAllButtonsHighlight(false);
    screenNumber = savedNumber = savedSign = '';
    setDisplay(screenNumber);
    setButtonsStatus(screenNumber,true);
}

function isNumberWellFormed(number){
    let ErrorStates = ['NaN', 'undefined', 'Infinity', '-Infinity'];
    if(ErrorStates.includes(number)){
        number = 'ERROR';
    }else if(digitCount(number)> digitsOnScreen){
        if(number.includes('.')){
            do{
                number.number.slice(0,-1);
            }while(digitCount(number)>digitsOnScreen && number.includes('.'));
            if(number.includes('.')) number = number.slice(0,-1);
            if(digitCount(number)> digitsOnScreen) number= 'ERROR';
        }else{
            number='ERROR';
        }
    }
    return String(number);
}

function digitCount(number){
    return number.replace(/[^0-9]/g, '').length;
}

function exponentialNumberToDecimal(){
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

function evaluate(){
    let firstNumber = parseFloat(savedNumber).toFixed(10);
    let secondNumber = parseFloat(screenNumber).toFixed(10);
    let result = 0.0;
    if(!isNaN(firstNumber) && !isNaN(secondNumber)){
        switch(savedSign){
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
                result = 'NaN';
                break;
        }
    }
    console.log(result);
    if(result.includes('e')) result = exponentialNumberToDecimal(result);
    console.log(result);
    result = Number(result);
    console.log(result);
    return isNumberWellFormed(result);
}

document.addEventListener(
    'keydown',
    (event) => {
        event.preventDefault();
        var name = event.key;
        var code = event.code;
        switch(name){
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9': case '0':
                insertNumber(name);
                break;
            case '+': case '-': case '/': case '*':
                getButtons.forEach((i) => {
                    if(i.value == name){
                        input = i;
                    }
                });
                insertOperator(input,name);
                break;
            case '.':
                if(code !='NumpadDecimal') break;
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