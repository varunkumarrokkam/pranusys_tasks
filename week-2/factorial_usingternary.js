

const factorial = (num) => {
    return num === 0  ||  num  === 1 ?  1  :  num *  factorial(num - 1);

}

let num = 5;
let result = factorial(5);

console.log(`The factorial of ${num} is ` + result);