// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
const prompt = require('prompt-sync')();

let inputs = [];
let operators = [`+`, `-`, `*`, `/`];
let numbers = [`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`0`];
let functions = [`c`, `e`];
let validInputs = operators.concat(numbers, functions);
let keepGoing = true;

while (keepGoing) {
    let input = getInput();
    if (input != undefined) {
        //don't add operator if operator was most recent input
        if (numbers.includes(input)) {
            inputs.push(input);
        } else if (operators.includes(input)) {
            if (numbers.includes(inputs[inputs.length - 1])) {
                inputs.push(input);
            }
        } else if (functions.includes(input)) {
            if (input === `c`) {
                inputs = [];
            } else if (input === `e` && numbers.includes(inputs[inputs.length - 1])) {
                //only use e (enter) after a number has been inputted 
                keepGoing = false;
                console.log(processInputs());
            }
        }
    }
}

function getInput() {
    let input = prompt(`Next input: `)
    if (validInputs.includes(input)) {
        return input;
    }
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
    console.log(processedInputs);
    return evaluateInputs(processedInputs);
}

function evaluateInputs(processedInputs) {
    while (processedInputs.length > 1) {
            let result = compute(processedInputs.filter((item, index) => index < 3));
            processedInputs = processedInputs.slice(3);
            processedInputs.unshift(result);
    }
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