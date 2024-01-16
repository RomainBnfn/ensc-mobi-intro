console.log("Exercice 1 - Suite de Fibonacci");

function fibonacci(n) {
    if(n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

let n = 0;
let lastResult = 0;
while (lastResult < 10000) {
    n += 1;
    lastResult = fibonacci(n)
    console.log("n: ", n, ", result: ", lastResult);
}
