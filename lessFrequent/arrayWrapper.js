// Create a class ArrayWrapper that accepts an array of integers in its constructor. This class should have two features:

// When two instances of this class are added together with the + operator, the resulting value is the sum of all the elements in both arrays.
// When the String() function is called on the instance, it will return a comma separated string surrounded by brackets. For example, [1,2,3].


// Example 1:

// Input: nums = [[1,2],[3,4]], operation = "Add"
// Output: 10
// Explanation:
// const obj1 = new ArrayWrapper([1,2]);
// const obj2 = new ArrayWrapper([3,4]);
// obj1 + obj2; // 10
// Example 2:

// Input: nums = [[23,98,42,70]], operation = "String"
// Output: "[23,98,42,70]"
// Explanation:
// const obj = new ArrayWrapper([23,98,42,70]);
// String(obj); // "[23,98,42,70]"
// Example 3:

// Input: nums = [[],[]], operation = "Add"
// Output: 0
// Explanation:
// const obj1 = new ArrayWrapper([]);
// const obj2 = new ArrayWrapper([]);
// obj1 + obj2; // 0


// Constraints:

// 0 <= nums.length <= 1000
// 0 <= nums[i] <= 1000
// Note: nums is the array passed to the constructor

/**
 * @param {number[]} nums
 * @return {void}
 */
// Constructor function — every function in JS has a .prototype object.
// When called with `new`, the instance's internal [[Prototype]] links to ArrayWrapper.prototype.
// Methods defined there are shared across all instances (not copied), saving memory.
var ArrayWrapper = function (nums) {
    this.nums = nums
};

/**
 * @return {number}
 */
// JS uses the prototype chain to look up methods: if a property isn't on the instance,
// it walks up to ArrayWrapper.prototype, then Object.prototype, then null.
// valueOf is called automatically in numeric contexts (e.g. obj1 + obj2).
ArrayWrapper.prototype.valueOf = function () {
    if (this.nums.length === 0) {
        return 0
    }
    let sum = 0
    for (let i = 0; i < this.nums.length; i++) {
        sum = sum + this.nums[i]
    }
    return sum
}

/**
 * @return {string}
 */
// toString is inherited from Object.prototype by default (returns "[object Object]").
// By defining it on ArrayWrapper.prototype, we shadow that default for all instances.
// JS finds this method first in the chain before reaching Object.prototype.
ArrayWrapper.prototype.toString = function () {
    const dinamicStr = `[${this.nums.toString()}]`
    return dinamicStr

}
const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
obj1 + obj2; // 10
const obj3 = new ArrayWrapper([]);
const obj4 = new ArrayWrapper([]);
obj3 + obj4; // 10
console.log("sum", obj1 + obj2)
console.log("sum", obj3 + obj4)
console.log(String(obj1)) // "[1,2]"
console.log(String(obj2)) // "[3,4]"
