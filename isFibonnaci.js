const isFibonacci = (n) => {

    const first = 5 * (n * n) + 4;
    const second = 5 * (n * n) - 4;

    const isSquare = (n) => {
        if (Number.isInteger(Math.sqrt(n))) return true
        return false
    }

    if (isSquare(first) || isSquare(second)) return true
    return false

}


console.log(isFibonacci(0));  // true  (F(0) = 0)
console.log(isFibonacci(1));  // true  (F(1) = 1)
console.log(isFibonacci(8));  // true  (F(6) = 8)
console.log(isFibonacci(10)); // false
console.log(isFibonacci(21)); // true  (F(8) = 21)