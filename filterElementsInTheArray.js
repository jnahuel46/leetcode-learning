/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
const filter = function (arr, fn) {
    let arrThatMatch = [];
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            arrThatMatch.push(arr[i])
        }
    }
    return arrThatMatch;
};

const arr = [0, 10, 20, 30];
const greaterThan10 = (n, i) => {
    return n > 10;
};
console.log(filter(arr, greaterThan10));
