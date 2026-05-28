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

// "function*" (con asterisco) define una función generadora.
// A diferencia de una función normal, llamarla NO ejecuta su cuerpo de inmediato:
// devuelve un objeto Generator que actúa como un iterador pausable.
// El cuerpo solo corre cuando llamás .next(), y se pausa en cada "yield".
var fibGenerator = function* () {
    // Fibonacci arranca en 0 y 1. Estas dos variables representan la "ventana deslizante"
    // de los dos últimos valores: siempre necesitamos los dos anteriores para calcular el siguiente.
    let current = 0;
    let newValue = 1;

    // El while(true) no es un bug ni un loop infinito descontrolado:
    // el generador no avanza solo. Cada iteración solo ocurre cuando alguien llama .next()
    // desde afuera, por lo que el loop es seguro — simplemente dice "podés pedir tantos valores como quieras".
    while (true) {
        // yield pausa la ejecución y "entrega" current al llamador como { value: current, done: false }.
        // La función queda congelada en esta línea hasta el próximo .next().
        yield current;

        // Al reanudar, calculamos el siguiente número de Fibonacci (suma de los dos anteriores)
        // antes de pisarlos, porque si no perderíamos el valor de current.
        let newNextValue = current + newValue;

        // Avanzamos la ventana: el "anterior" pasa a ser el "actual" y el nuevo sum pasa a ser el "próximo".
        // Esto produce la secuencia: 0,1 → 1,1 → 1,2 → 2,3 → 3,5 ...
        // (por eso el 1 aparece dos veces: primero como newValue, luego como current)
        current = newValue;
        newValue = newNextValue;
    }
};

// Llamar fibGenerator() crea el objeto Generator pero NO ejecuta nada todavía.
// El cuerpo de la función está "en pausa" antes de la primera línea.
const gen = fibGenerator();

// Cada .next() reanuda la función desde donde se pausó, corre hasta el próximo yield,
// y devuelve { value: <lo que se yieldeó>, done: false }.
// Cuando la función termina (no hay más yields), done pasa a true.
console.log(gen.next().value) // 0  → primer yield
console.log(gen.next().value) // 1  → segundo yield
console.log(gen.next().value) // 1  → tercer yield  (el 1 se repite, ver nota del swap arriba)
console.log(gen.next().value) // 2  → cuarto yield
console.log(gen.next().value) // 3  → quinto yield
// Constraints:

// 0 <= callCount <= 50