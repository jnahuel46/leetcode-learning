// Given a function fn, return a memoized version of that function.

// A memoized function is a function that will never be called twice with
//  the same inputs. Instead it will return a cached value.

// You can assume there are 3 possible input functions: sum, fib, and factorial.

// sum accepts two integers a and b and returns a + b.
//  Assume that if a value has already been cached for the arguments (b, a) where a != b,
//  it cannot be used for the arguments (a, b). For example, if the arguments are (3, 2) and (2, 3), two separate calls should be made.


// Example 1:
// Input:
// fnName = "sum"
// actions = ["call","call","getCallCount","call","getCallCount"]
// values = [[2,2],[2,2],[],[1,2],[]]
// Output: [4,4,1,3,2]
// Explanation:
// const sum = (a, b) => a + b;
// const memoizedSum = memoize(sum);
// memoizedSum(2, 2); // "call" - returns 4. sum() was called as (2, 2) was not seen before.
// memoizedSum(2, 2); // "call" - returns 4. However sum() was not called because the same inputs were seen before.
// // "getCallCount" - total call count: 1
// memoizedSum(1, 2); // "call" - returns 3. sum() was called as (1, 2) was not seen before.
// // "getCallCount" - total call count: 2

//entonces basicamente un funcion memorizda es una funcion que
// va a retornar el valor, pero si tiene los mismos argumentos, no tiene que contar como llamada
//conceptos aplicados, el primer aporach siepre esta bien , de basarte en el concepto de closure para guardar el estado
//pero hay que ir un paso mas alla y usar map para guardar los argumentos y el valor retornado
//ya que los argumentos pueden ser muchos y no solo uno
//luego el uso de spread operator para guardar los argumentos en un array
//luego el uso de map para guardar los argumentos y el valor retornado
//luego el uso de JSON.stringify para convertir los argumentos en string y poder usarlos como key en el map
//luego la verificación si el map tiene la key, si no la tiene, llama a la función y guarda el resultado en el map
//si ya tiene la key, retorna el valor guardado en el map
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const mapsArgs = new Map();
    let storedValue
    let count = 0
    return function (...args) {
        const storeArgs = [...args]
        const cleanStore = JSON.stringify(storeArgs)
        
        if (!mapsArgs.has(cleanStore)) {
            const returnedValue = fn(...args);
            storedValue = returnedValue;
            mapsArgs.set(cleanStore, storedValue)
            count ++
            return storedValue
        } else {
            return mapsArgs.get(cleanStore)

        }
    }
}



let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
})

console.log(memoizedFn(2, 3))
console.log(memoizedFn(2, 4))
console.log(memoizedFn(2, 3))

console.log("callCount", callCount) // 1 