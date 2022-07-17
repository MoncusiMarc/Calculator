let memoryNumber='';
let screenNumber='';
let sign='';

const buttons = document.querySelectorAll("input");

function clearing(){
    endHighlight();
    memoryNumber='0';
    screenNumber='0';
    sign='';
    display();  
}

function insert(number){
    switch(true){
        case (numberCount(screenNumber)>=10):
        case (screenNumber=="ERROR"):
            break;
        case (screenNumber==''):
        case (screenNumber=='0'):
            screenNumber=number;
            break;
        default:
            screenNumber+=number;
            break;
    }
    display();
}

function insertComma(){
    switch(true){
        case (screenNumber.includes('.')):
        case (numberCount(screenNumber)>=10):
        case (screenNumber=="ERROR"):
            break;
        case (screenNumber==''):
            screenNumber='0';
        case (screenNumber=='0'):
        default:
            screenNumber+='.';
            break;
    }
    display();
}

function polarity(){
    switch(true){
        case (screenNumber=='ERROR'):
        case (screenNumber==''):
        case (screenNumber=='0'):
        case (screenNumber=='0.'):
            break;
        default:
            screenNumber=String(-screenNumber); //Numbers don't have replace function.
            break;
    }
    display();
}

function insertOperator(input,operator){
    endHighlight();
    highlight(input);
    
    //switch(true){
    //    case (sign==''):
    //        memoryNumber=screenNumber;
    //        screenNumber='';
    //    default:
    //        sign=operator;
    //        break;
    //}
    //display();
}
function equals(){
    endHighlight();

}

function highlight(input){
    input.classList.add("highlight");
}

function endHighlight(){
            const buttons = document.querySelectorAll("input");
    buttons.forEach(function(b){
        b.classList.remove("highlight");
    });
}

function numberCount(numbers){
    return numbers.replace(/[^0-9]/g, '').length;
}

function display(){
    console.log(memoryNumber);
    console.log(screenNumber);
    console.log(sign);
    const display = document.getElementById("Display");
    display.innerText=screenNumber.replace(".",",");
}