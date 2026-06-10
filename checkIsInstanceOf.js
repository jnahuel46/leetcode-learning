// Write a function that checks if a given value is an instance of a given class or superclass.
//  For this problem, an object is considered an instance of a given class if that object has access to that class's methods.
// There are no constraints on the data types that can be passed to the function. 
// For example, the value or the class could be undefined.

// Example 1:
// Input: func = () => checkIfInstanceOf(new Date(), Date)
// Output: true
// Explanation: The object returned by the Date constructor is, by definition, an instance of Date.
// Example 2:

// Input: func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
// Output: true
// Explanation:
// class Animal {};
// class Dog extends Animal {};
// checkIfInstanceOf(new Dog(), Animal); // true

// Dog is a subclass of Animal. Therefore, a Dog object is an instance of both Dog and Animal.
// Example 3:

// Input: func = () => checkIfInstanceOf(Date, Date)
// Output: false
// Explanation: A date constructor cannot logically be an instance of itself.
// Example 4:

// Input: func = () => checkIfInstanceOf(5, Number)
// Output: true
// Explanation: 5 is a Number. Note that the "instanceof" keyword would return false. 
// However, it is still considered an instance of Number because it accesses the Number methods. For example "toFixed()".

/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {

    // Object() convierte primitivos a su wrapper object:
    // 5 → new Number(5), "hola" → new String("hola")
    // Si ya es un objeto, lo devuelve tal cual
    let proto = Object.getPrototypeOf(Object(obj));

    // Subimos por la cadena hasta llegar a null (fin de cadena)
    // Cadena ejemplo con Dog extends Animal:
    //   Dog.prototype → Animal.prototype → Object.prototype → null
    while (proto !== null) {
        // Comparamos dos referencias en memoria (no contenido):
        //   proto               → eslabón actual de la cadena del objeto evaluado
        //   classFunction.prototype → objeto prototipo de la clase buscada (fijo, no cambia)
        // Si apuntan al mismo objeto, significa que obj hereda de classFunction
        //
        // Ejemplo con new Dog() y Animal:
        //   iteración 1: proto = Dog.prototype    → ¿es Animal.prototype? NO
        //   iteración 2: proto = Animal.prototype → ¿es Animal.prototype? SÍ → true
        if (proto === classFunction.prototype) return true;

        // Subimos un nivel: Object.getPrototypeOf(x) = "dame el eslabón de arriba"
        proto = Object.getPrototypeOf(proto);
    }

    // Recorrimos toda la cadena sin encontrar la clase
    return false;
};

console.log(checkIfInstanceOf(new Date(), Date))
console.log(checkIfInstanceOf(5, Number))
