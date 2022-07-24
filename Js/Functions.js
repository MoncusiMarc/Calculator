let screenNumber = ''; //Should i just use the getdisplaynumber()?
let memoryNumber = '';
let memorySign = '';

function getDisplay(){
    return document.getElementById('Display').innerText.replace(',','.');
}

function setDisplay(number){
    const display = document.getElementById('Display').innerText;
    if(number = '') display = '0';
    else display = number.replace('.',',');
}

function setButtonHighlight(button,highlight){

}

function setAllButtonsHighlight(){
    
}

function setButtonsStatus(){

}

function insertNumber(number){

}

function insertComma(){

}

function insertOperator(){

}

function negateNumber(){

}