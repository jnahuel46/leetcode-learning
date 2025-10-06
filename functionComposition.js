/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
    const sortedFunctions = functions.reverse()
    return function (x) {
        let acummResult = x
        for (let index = 0; index < sortedFunctions.length; index++) {
            const fn = sortedFunctions[index]
            acummResult = fn(acummResult);            
        }
        return acummResult
    }
};


const fn = compose([x => x + 1, x => 2 * x])
console.log(fn(4)) 