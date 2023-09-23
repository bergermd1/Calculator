// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
const prompt = require('prompt-sync')();

let inputs = [];
let operators = [`+`, `-`, `*`, `/`];
let validInputs = [`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`0`,`+`, `-`, `*`, `/`, `c`, `e`]
while (inputs[inputs.length - 1] !== 'e') {
    let input = getInput();
    if (input != undefined) {
        //don't add operator if operator was most recent input
        if (!operators.includes(input) || !operators.includes(inputs[inputs.length - 1])) {
            inputs.push(input);
        }
    }
}
console.log(inputs);

// console.log('yeah');
// let x = console.prompt('?');
function getInput() {
    let input = prompt(`Next input: `)
    // if (input === `xx`) {
    //     break;
    // }
    if (validInputs.includes(input)) {
        return input;
    }
}

