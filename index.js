const display = document.getElementById("display-value");

// Initializing the calculator

let currentValue = "";
let previousValue = "";
let operator = null;

// Append number or decimal
const appendNumber = (number) =>{
    if (number === "." && currentValue.includes(".")) return;// prevent multiple decimals
    currentValue += number;
    updateDisplay(currentValue);
}
//chosen an operator
const chooseOperator = (selectedOperator) =>{
    if (currentValue === "" ) return; //do nothing if no value is entered
    if  (previousValue!== "") {
        compute();
    }
    operator = selectedOperator;
    previousValue = currentValue;
    currentValue = "";
}
//Compute the results
const compute = () =>{
    let computation;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    if(isNaN(prev) || isNaN(curr)) return;

    switch(operator){
        case "+":
            computation = prev + curr;
            break;
        case "-":
            computation = prev - curr;
            break;
        case "*":
            computation = prev * curr;
            break;
        case "/":
            computation = curr === 0 ? "Error": prev / curr;
            break;
        case "%":
            computation = prev % curr;
            break;
        default:
            return;
    }
    currentValue = computation.toString();
    operator = null;
    previousValue = "";
    updateDisplay(currentValue);
};
//update display
const updateDisplay = (value) =>{
    display.value = value || 0;
}
//clear display

const clearCalculator = () =>{
    currentValue = "";
    previousValue = "";
    operator = null;
    updateDisplay("0");
}
// Toggle positive/negative
const toggleSign = () => {
    if (currentValue === '') return;
    currentValue = (parseFloat(currentValue) * -1).toString();
    updateDisplay(currentValue);
};

// Add event listeners to buttons
document.querySelectorAll('.numbers').forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operation').forEach((button) => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        if (operator === '=') {
            compute();
        } else {
            chooseOperator(operator === 'x' ? '*' : operator); // Replace 'x' with '*'
        }
    });
});

document.querySelector('.clear').addEventListener('click', clearCalculator);

document.querySelector('.both').addEventListener('click', toggleSign);

document.querySelector('.modulus').addEventListener('click', () => chooseOperator('%'));
document.querySelector('.zero').addEventListener('click', () => appendNumber('0'));
