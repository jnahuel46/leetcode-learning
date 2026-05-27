//Write a generator function that returns a generator object which yields the fibonacci sequence.

// The fibonacci sequence is defined by the relation Xn = Xn-1 + Xn-2.

// The first few numbers of the series are 0, 1, 1, 2, 3, 5, 8, 13.



// Example 1:

// Input: callCount = 5
// Output: [0,1,1,2,3]
// Explanation:
// const gen = fibGenerator();
// gen.next().value; // 0
// gen.next().value; // 1
// gen.next().value; // 1
// gen.next().value; // 2
// gen.next().value; // 3
// Example 2:

// Input: callCount = 0
// Output: []
// Explanation: gen.next() is never called so nothing is outputted

/**
 * @return {Generator<number>}
 */

// El asterisco después de "function" es lo que la convierte en una función generadora.
// Una función generadora NO ejecuta su cuerpo al ser llamada — en cambio, devuelve
// un objeto Generator que podés controlar manualmente con .next().
var fibGenerator = function* () {
    let prev = 0, curr = 1;

    // while(true) no congela el programa porque "yield" pausa la ejecución.
    // El cuerpo solo avanza cuando alguien llama .next() desde afuera.
    while (true) {
        // yield pausa la función acá y devuelve "prev" como el .value del .next().
        // La próxima vez que se llame .next(), la ejecución retoma justo después de este yield.
        yield prev;

        // Actualiza ambas variables en una línea: prev pasa a ser curr,
        // y curr pasa a ser la suma de los dos anteriores.
        [prev, curr] = [curr, prev + curr];
    }
};

// fibGenerator() devuelve un objeto Generator — la función no corre todavía.
const gen = fibGenerator();

// Cada .next() reanuda la función hasta el próximo yield y devuelve { value, done }.
console.log(gen.next().value) // 0  → primer yield
console.log(gen.next().value) // 1  → segundo yield
console.log(gen.next().value) // 1  → tercer yield
console.log(gen.next().value) // 2  → cuarto yield
console.log(gen.next().value) // 3  → quinto yield
// Constraints:

// 0 <= callCount <= 50