// Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.
// You may assume the array is the output of JSON.parse.
// Example 1:

// Input: nums = [null, {}, 3]
// Output: 3
// Explanation: Calling nums.last() should return the last element: 3.
/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
    let lastElement;
    if (this === undefined || this.length === 0) return (lastElement = -1);
    for (let index = 0; index < this.length; index++) {
        if (index === this.length - 1) {
            lastElement = this[index];
        }
    }
    return lastElement;
};

const arr = [1, 5, 6];
console.log(arr.last(arr));