/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};

const counter = createCounter(10);
counter();
counter();
counter();

// Este código demuestra varios conceptos importantes de JavaScript:

//   Closures (Clausuras)

//   La función interna tiene acceso a la variable n del scope externo, incluso después de que
//   createCounter haya terminado de ejecutarse. Esto es un closure.

//   Factory Function (Función Factoría)

//   createCounter es una función que crea y retorna otras funciones. Cada vez que la llamas, genera
//   una nueva función counter con su propio valor de n.

//   Estado Privado

//   La variable n actúa como estado privado - solo la función retornada puede acceder y modificar
//   este valor.

//   Post-incremento

//   n++ retorna el valor actual de n y luego lo incrementa en 1.
//  Ejecución:
//   const counter = createCounter(10);
//   counter(); // retorna 10, n se vuelve 11
//   counter(); // retorna 11, n se vuelve 12  
//   counter(); // retorna 12, n se vuelve 13

//   Cada llamada a counter() retorna el valor actual y lo incrementa para la próxima llamada.