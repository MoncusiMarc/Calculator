let firstElement='0';
let secondElement='0';
let sign;

function clear(){
    console.log("we made it here");
    firstElement='0';
    secondElement='0';
    display();  
}

function insert(int){
    if(secondElement=='0'){
        secondElement=int;
    }else{
        secondElement+=int;
    }
    display();
}

function display(){
    const display = document.getElementById("Display");
    display.innerText=secondElement;
}