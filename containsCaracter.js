function containsChar(text, char) {
    if (text.includes(char)) return true
    return false
}

console.log(containsChar("hola", "o"))
console.log(containsChar("hola", "z"))
console.log(containsChar("abc", "a"))
