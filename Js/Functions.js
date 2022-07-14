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
        case (secondElement=='0'):  
        default:
            secondElement+='.';
            break;
    }
    display();
}

function polarity(){
    switch(true){
        case (secondElement=='0'):
        case (secondElement=='0.'):
            break;
        default:
            secondElement=String(-secondElement); //Numbers don't have replace function.
            break;
    }
    display();
}

function numberCount(numbers){
    return numbers.replace(/[^0-9]/g, '').length;
}

function display(){
    const display = document.getElementById("Display");
    display.innerText=secondElement.replace(".",",");
}
