let runningTotal=0;
let buffer="0"; /*waiting for user input*/
let previousOperator; /*keep tracking whats previously pressed*/
const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener("click",function(event){
    /*console.log("here") --> to make sure function is happening*/
    buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender(); /*we should always rerender after every single time*/
}

function handleNumber(value) {
    if(buffer==="0") {
        buffer = value;
    } else {
        buffer += value; /* example: you have 5,then you hit 7 ,its 57*/
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case "=":
            if(previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer)); /*turn buffer into number*/
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case "←":
            if(buffer.length === 1) { /* if its 1 digit,result is 0*/
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1); /*if its more digits,everytime you press button delete 1 digit*/
            }
            break;

        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if(previousOperator === "+") {
        runningTotal += intBuffer;
    } else if(previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if(previousOperator === "x") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
function rerender(value) {
    screen.innerText = buffer;
}