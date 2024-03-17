
const prime = (num) => {

    if ( num <= 1 ) {
       return false;
    }
    let i = 2;
    while ( i < num){
        if ( num % i === 0 ) {
            return false;
        }
        i++
    }
    return true;
}


let num = 7;

if(prime(num)) {
    console.log(num + ' is prime number');
} else {
    console.log(num + ' is not a prime number');
}