
// Invertir objeto
// Dado un objeto donde las claves son strings y los valores también son strings, devuelve un nuevo objeto donde las claves y los valores estén intercambiados.

// Es decir, cada clave del objeto original se convierte en el valor del nuevo objeto, y cada valor del original se convierte en la clave del nuevo objeto.

// Si hay valores duplicados en el objeto original, la última clave encontrada prevalece.

// Ejemplos
// invertirObjeto({ a: "1", b: "2", c: "3" })
// // { "1": "a", "2": "b", "3": "c" }

// invertirObjeto({ nombre: "Juan", apellido: "Perez" })
// // { Juan: "nombre", Perez: "apellido" }

// invertirObjeto({ x: "mismo", y: "mismo" })
// // { mismo: "y" }

// invertirObjeto({})
// // {}
// Restricciones
// Todas las claves y valores del objeto de entrada son strings.
// Si dos claves tienen el mismo valor, la que aparezca después en la iteración prevalece.
function invertirObjeto(obj: Record<string, string>): Record<string, string> {
    const entries = Object.entries(obj)

    const map1 = new Map();
    for (let e of entries) {
        console.log("iteracion", e)
        map1.set(e[1], e[0])
    }
    const modificado = Object.fromEntries(map1)
    return modificado;
}
invertirObjeto({ "a": "1", "b": "2", "c": "3" })
console.log(invertirObjeto({ "a": "1", "b": "2", "c": "3" }))