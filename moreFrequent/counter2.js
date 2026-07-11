/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (n) {
    let counter = n
    
    function increment() {
        return ++counter
    }
    function reset() {
        counter = n
        return counter
    }
    function decrement() {
        return --counter
    }
    return {
        increment,
        reset,
        decrement
    }
};


const counter = createCounter(0)

console.log(counter.increment(),
    counter.increment(),
    counter.decrement(),
    counter.reset(),
    counter.reset())

//[1,2,1,0,0]