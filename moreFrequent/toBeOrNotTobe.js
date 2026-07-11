/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
    const toBe = (funcVal) => {
        if (val === funcVal) {
            return true
        } else {
            throw new Error("Not Equal")
        }
    }
    const notToBe = (funcVal) => {
        if (val !== funcVal) {
            return true
        } else {
            throw new Error("Equal")
        }
    }
    return { toBe, notToBe }
};

console.log(expect(5).toBe(5)) // true
//console.log(expect(5).notToBe(5)) // throws "Equal"
