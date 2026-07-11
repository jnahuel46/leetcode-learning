/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
    const regularNumber = x
    const reversedNumber = x.toString().split("").reverse().join("")

    if (regularNumber === +reversedNumber) {
        return true
    }
    return false
};


// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.
/**
 * @param {string} s
 * @return {boolean}
 */
const isWordPalindrome = function (s) {
    //misma base que la de números pero con limpieza extra
    // paso 1: limpiar la string (lowercase + quitar no alfanuméricos)
    // paso 2: comparar string limpia con su reverso

    // opción A: función auxiliar para limpiar
    // const clean = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    // const regularWord = clean(s);
    // const reversedWord = clean(s.split("").reverse().join(""));
    const cleaned = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const reversed = cleaned.split("").reverse().join("");

    return cleaned === reversed;
};
const input = "A man, a plan a canal, Panama";
const dos = "ab_a"



//Now a tricky onw, you have to return the the number of the index position
//if the position of the srtring to convert the string in a palindrome
// string: bcbc
//Example Either remove 'b' at index  or 'c' at index .

const removeIndex = (s) => {
    const isPalinHelper = (str, left, right) => {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    };

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            if (isPalinHelper(s, left + 1, right)) {
                return left;
            }
            if (isPalinHelper(s, left, right - 1)) {
                return right;
            }
            return -1;
        }
        left++;
        right--;
    }
    return -1; 
}

const s = "aab"

console.log(removeIndex(s))

const isPalindromeSimple = (example) => {
    let left = 0;  
    let right = example.length - 1;

    while (left < right) {
        if (example[left] !== example[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

const example = "aabaa"

console.log(isPalindromeSimple(example))