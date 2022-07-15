let firstElement='0';
let secondElement='0';
let sign;


function clearing(){
    firstElement='0';
    secondElement='0';
    display();  
}

function insert(element){
    switch(true){
        case (secondElement==''):
        case (secondElement=='0'):
            secondElement=element;
            break;
        case (numberCount(secondElement)>=10):
            break;
        default:
            secondElement+=element;
            break;
    }
    display();
}

function insertComma(){
    switch(true){
        case (secondElement.includes('.')):
        case (numberCount(secondElement)>=10):
            break;
        case (secondElement==''):
            secondElement='0';
        case (secondElement=='0'):
        default:
            secondElement+='.';
            break;
    }
    display();
}

function polarity(){
    switch(true){
        case (secondElement==''):
        case (secondElement=='0'):
        case (secondElement=='0.'):
            break;
        default:
            secondElement=String(-secondElement); //Numbers don't have replace function.
            break;
    }
    display();
}

function insertOperator(operator){
    switch(true){
        case (sign==null):
            firstElement=secondElement;
            secondElement='';
        case (sign!=null):
            sign=operator;

            break;
    }
    //display();
}
function equals(){
    
}

function numberCount(numbers){
    return numbers.replace(/[^0-9]/g, '').length;
}

function display(){
    console.log(firstElement);
    console.log(secondElement);
    console.log(sign);
    const display = document.getElementById("Display");
    display.innerText=secondElement.replace(".",",");
}