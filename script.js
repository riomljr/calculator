
let operate = 0;
let numA='';
let numB;


function negative (){
    numA = 0 -numA;
    display(numA);
}
//modulo fucntion
function modulo (){
    numA = numA/100;
    display(numA);
}

//gets first number value
function grabValue(value){
    if(!numA) numA = value;
    else numA += value; 
    display(numA);
};

//adds values to display section
function display(num){
    const dis = document.querySelector('.display');
    dis.textContent = num;
}

//evalutae operator selected
function operatorGrab(a, op){
    
    if(operate != 0){
     execute(numB, numA, operate);
     numB = numA;
     numA = 0;
     operate = op
    }
    else {
    numB = numA;
    numA = 0;
    operate = op;
    }
};

//backspace
function backspace(){
    numA = numA.toString();
    let len = numA.length;
    numA = numA.slice(0,len-1);
    display(numA);
}
//reset variables
function clearNums(){
    numA = 0;
    numB = 0;
    display("");
    operate = 0;
}

function logResults(result){
    numA = result;
    console.log(numA);
    display(numA);
    operate = 0;
    numB = 0;  
}

//Math functions
function divi(a, b){
  if (b == 0) {
    display("CAN'T / 0");
  }
  else logResults(a/b);
}

//compares info provided by buttons/users.
function execute (a, b, sign) {
 let newA = Number(a);
 let newB = Number(b);
    switch (sign) {
        case 'add':logResults(newA+newB);
        break;
        case 'substract':logResults(newA-newB);
        break;
        case 'multiply': logResults(newA*newB);
        break;
        case 'divide': divi(newA, newB);
        break;
    }
};

//Event listener functions
    function eval(e){
        let num = /\d/;
        let period = numA.toString().includes('.');
        const buttonVal = e.target.value;
        if(!buttonVal) return;
        if (buttonVal == 'b') backspace();
        //scans for integers
        if(num.test(buttonVal)) grabValue(buttonVal);
        else {
            switch(buttonVal){
                case 'C': clearNums();
                break;
                case '.': if(!period) grabValue('.');
                break;
                case '-' :negative();
                break;
                case '%': modulo();
                break;
            }
        }
    }

    function getOpVal(e){
        const opVal = e.target.value;
        if (opVal == "=") execute(numB,numA, operate);
        else operatorGrab(numA, opVal);
    }

    const container = document.querySelector('#numsContainer');
    container.addEventListener('click', eval);

    const operaters = document.querySelector('#operators');
    operaters.addEventListener('click', getOpVal);