//"use strict"
 
const cToF = function (celcius) {

    const cTemp = celcius;
    const ToFahr = cTemp * ( 9 / 5 ) + 32;
    const msg = `${cTemp}\xB0C is ${ToFahr} \xB0F .`;
    return msg;
}


const  fToC = function (fahrenheit) {
    
    const fTemp = fahrenheit;
    const fToCel =(fTemp - 32 ) * (5/9);
    const msg = `${fTemp}\xB0F is ${fToCel}\xB0C .`;
    return msg; 
}

console.log(fToC(98.4));
console.log(cToF(36.888));