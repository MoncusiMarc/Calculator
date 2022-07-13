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
        case (secondElement.length>=10):    //TODO: function with only number counting
            break;
        default:
            secondElement+=element;
            break;
    }
    display();
}
function insertComma(){
    switch(true){
        case (secondElement.includes(',')):
        case(secondElement.length>=10):     //TODO: function with only number counting
            break;
        case (secondElement=='0'):  
        default:
            secondElement+=',';
            break;
    }
    display();
}
function polarity(){
    switch(true){
        case (secondElement=='0'):
        case (secondElement=='0,'):
            break;
        default:
            secondElement=-secondElement;
            break;
    }
    display();
}

function display(){
    console.log(secondElement);
    const display = document.getElementById("Display");
    display.innerText=secondElement;
}