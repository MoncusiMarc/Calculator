class Calculator{

    constructor(number){
        this.displayNumber = String(number);
        this.savedNumber = '';
        this.savedOperation = undefined;

        //TALK TO TONI:
        // si quiero que displayNumber siempre sea el numero que se ve por pantalla,
        // necesitare 2 variables para comprobar:
        // 1)si el numero por pantalla es el resultado
        // 2) si el numero por pantalla es el valor anterior
    }
    
    setDisplay(){
        // displayNumber siempre es el numero que quiero enseñar
        // pero no el numero que siempre se vera
        const display = document.getElementById('Display');
        if (this.displayNumber == '') display.innerText = '0';
        else display.innerText = this.displayNumber.replace('.', ',');
    }
    clearing(){
        this.displayNumber = '';
        this.savedNumber = '';
        this.savedOperation = undefined;
    }

    insertNumber(number) {
        if(
            digitCount(this.displayNumber)> MAX_DIGITS_ON_SCREEN ||
            this.displayNumber == 'ERROR'
        ) return
        let overwriteStates = ['','0']
        if(overwriteStates.includes(this.displayNumber))
            this.displayNumber = number
        else
            this.displayNumber += number
    }
    
    insertComma(){
        if(
            digitCount(this.displayNumber)> MAX_DIGITS_ON_SCREEN ||
            this.displayNumber == 'ERROR' ||
            this.displayNumber.includes('.')
        ) return

    }
    insertNegation(){

    }
    insertOperator(operator){

    }
    calculate(){

    }
}