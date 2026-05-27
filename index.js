const obj = {
    name: "Sample Object",
    value: 42,

};

obj.value = 100;
//Why i can change the value of a property in an object
//Because objects in JavaScript are mutable, meaning their properties can be changed.
// you can change the properties of an object even if the object is declared with const

console.log(obj);