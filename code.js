let inputs = [];
let operators = [`+`, `-`, `*`, `/`];
let numbers = [`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`0`];
let functions = [`e`, `c`, `b`];
let validInputs = operators.concat(numbers, functions);
let keepGoing = true;
let display = ``;
let displayDiv;
let nonNumberButtons = operators.concat(functions);
let calcJustPerformed = false;

window.onload = (event) => {
    // console.log('yeah');
    for (let i = 0; i <= 9; i++) {
        let btn = document.querySelector(`.b${i}`)
        // console.log(btn);
        btn.addEventListener(`click`, () => {
            collectInput(i.toString());
        })
    }
    for (let i = 0; i < 7; i++) {
        let btn = document.querySelector(`.b1${i}`)
        btn.addEventListener(`click`, () => {
            collectInput(nonNumberButtons[i].toString())
        })
    }
    displayDiv = document.querySelector(`.rect`);
}

function collectInput(input) {
    if (input != undefined) {
        //don't add operator if operator was most recent input
        if (numbers.includes(input)) {
            if (calcJustPerformed) {
                inputs = [input];
                display = input;
                calcJustPerformed = false;
            } else {
                inputs.push(input);
                display += input;
            }
        } else if (operators.includes(input)) {
            if (numbers.includes(inputs[inputs.length - 1])) {
                inputs.push(input);
            } else if (operators.includes(inputs[inputs.length - 1])) {
                inputs[inputs.length - 1] = input;
                display = display.substring(0, display.length - 1);
            }
            calcJustPerformed = false;
            display += input;
        } else if (functions.includes(input)) {
            if (input === `c`) {
                inputs = [];
                calcJustPerformed = false;
                display = ``;
            } else if (input === `e` && numbers.includes(inputs[inputs.length - 1])) {
                //only use e (enter) after a number has been inputted 
                // console.log(inputs);
                calcJustPerformed = false;
                display = processInputs();
                display = +display;
                if (display.toFixed(3) != display) {
                    display = display.toFixed(3);
                }
                console.log(display);
            } else if (input === `b`) {
                calcJustPerformed = false;
                inputs.splice(inputs.length - 1, 1);
                display = display.substring(0, display.length - 1);
            }
        }
    }
    displayDiv.textContent = display;
    // console.log(inputs);
}

function processInputs() {
    let processedInputs = [];
    while (operators.filter(value => inputs.includes(value)).length > 0) {
        let index = inputs.findIndex(input => {
            return operators.includes(input);
        });
        let operand = inputs.filter((input, i) => {
            return i < index;
        })
        operand = +operand.join(``);
        processedInputs.push(operand);
        processedInputs.push(inputs[index]);
        inputs = inputs.slice(index + 1);
    }
    let operand = +inputs.join(``);
    processedInputs.push(operand);
    // console.log(processedInputs);
    return evaluateInputs(processedInputs);
}

function evaluateInputs(processedInputs) {
    while (processedInputs.length > 1) {
            let result = compute(processedInputs.filter((item, index) => index < 3));
            processedInputs = processedInputs.slice(3);
            processedInputs.unshift(result);
    }
    inputs = processedInputs[0].toString().split("");
    calcJustPerformed = true;
    return processedInputs[0]
}

function compute(items) {
    let operand1 = items[0]
    let operator = items[1]
    let operand2 = items[2]
    switch (operator) {
        case `+`:
            return operand1 + operand2;
            break;
        case `-`:
            return operand1 - operand2;
            break;
        case `*`:
            return operand1 * operand2;
            break;
        case `/`:
            return operand1 / operand2;
            break;
    }
}