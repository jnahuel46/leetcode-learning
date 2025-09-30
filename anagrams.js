const palabras = ["amor", "roma", "perro", "ramo", "mora", "armo", "cats", "tacs", "act"];

const agruparAnagramas = () => {
    //Genero el Mapa que me va a almacer la clave y todas las palabras que matcheen con ella
    //pero ojo, no esta almacenando las palabras ordenadas, almacena la palabra real
    const mapa = new Map();
    for (const palabra of palabras) {
        
        //genero la  clave unica, la cual va a ser comparada para ir recibiendo los valores
        const claveGenerada = palabra.split("").sort().join("");
        if (!mapa.has(claveGenerada)) {
            mapa.set(claveGenerada, [])
        }

        mapa.get(claveGenerada).push(palabra)
    }
    return mapa;
}

const mapaFinal = agruparAnagramas(palabras);
console.log(mapaFinal)
for (const [palabra] of mapaFinal) {
    console.log(palabra)    
}



// /*
// === MARCO TEÓRICO: ANAGRAMAS Y ESTRUCTURA DE DATOS MAP ===

// 1. ¿QUÉ ES UN ANAGRAMA?
//    - Dos palabras son anagramas si contienen exactamente las mismas letras
//    - Solo cambia el orden de las letras
//    - Ejemplos: "amor" y "roma", "listen" y "silent"

// 2. ¿CÓMO DETECTAR ANAGRAMAS PROGRAMÁTICAMENTE?
//    - Si ordenamos alfabéticamente las letras de dos anagramas, obtenemos la misma secuencia
//    - "amor" → ['a','m','o','r'] → sort() → ['a','m','o','r'] → "amor"
//    - "roma" → ['r','o','m','a'] → sort() → ['a','m','o','r'] → "amor"
//    - ¡Misma clave! Son anagramas.

// 3. ¿POR QUÉ USAR MAP EN VEZ DE OBJECT?
//    - Map mantiene el orden de inserción
//    - Map puede usar cualquier tipo como clave (no solo strings)
//    - Map tiene métodos más claros: .set(), .get(), .has()
//    - Map es más eficiente para operaciones frecuentes de agregar/eliminar

// 4. MÉTODOS PRINCIPALES DE MAP:
//    - new Map(): Crea un nuevo mapa vacío
//    - .set(clave, valor): Establece un par clave-valor
//    - .get(clave): Obtiene el valor asociado a una clave
//    - .has(clave): Verifica si existe una clave
//    - .values(): Retorna un iterador con todos los valores
//    - .keys(): Retorna un iterador con todas las claves
//    - .size: Propiedad que indica el número de elementos

// 5. COMPLEJIDAD TEMPORAL:
//    - Ordenar cada palabra: O(n log n) donde n es la longitud de la palabra
//    - Operaciones de Map (set, get, has): O(1) promedio
//    - Complejidad total: O(m * n log n) donde m = número de palabras
// */

// const agruparAnagramas = (palabras) => {
//     // Map para agrupar palabras por su "firma" (letras ordenadas)
//     // Clave: letras ordenadas, Valor: array de palabras con esas letras
//     const mapa = new Map();

//     for (const palabra of palabras) {
//         // PASO 1: Crear la "firma" de la palabra
//         // "amor" → ['a','m','o','r'] → ['a','m','o','r'] → "amor"
//         // "roma" → ['r','o','m','a'] → ['a','m','o','r'] → "amor"
//         const clave = palabra.split('').sort().join('');
        
//         console.log(`Procesando "${palabra}" → clave: "${clave}"`);

//         // PASO 2: Si es la primera palabra con esta firma, crear un nuevo grupo
//         if (!mapa.has(clave)) {
//             mapa.set(clave, []);
//             console.log(`  Nueva clave "${clave}" creada`);
//         }
        
//         // PASO 3: Agregar la palabra al grupo correspondiente
//         mapa.get(clave).push(palabra);
//         console.log(`  "${palabra}" agregada al grupo de "${clave}":`, mapa.get(clave));
//     }

//     console.log('\n=== ESTADO FINAL DEL MAP ===');
//     for (const [clave, grupo] of mapa) {
//         console.log(`"${clave}" → [${grupo.join(', ')}]`);
//     }

//     // PASO 4: Filtrar solo grupos con más de 1 palabra (verdaderos anagramas)
//     // Array.from() convierte el iterador de .values() en un array
//     const anagramas = Array.from(mapa.values()).filter(grupo => grupo.length > 1);
    
//     console.log('\n=== GRUPOS DE ANAGRAMAS ENCONTRADOS ===');
//     anagramas.forEach((grupo, index) => {
//         console.log(`Grupo ${index + 1}: [${grupo.join(', ')}]`);
//     });
    
//     return anagramas;
// }

// /*
// === EJEMPLO PASO A PASO ===
// Entrada: ["amor", "roma", "perro", "ramo", "mora", "armo"]

// Procesamiento:
// 1. "amor" → "amor" → Map: {"amor": ["amor"]}
// 2. "roma" → "amor" → Map: {"amor": ["amor", "roma"]}
// 3. "perro" → "eoprrr" → Map: {"amor": ["amor", "roma"], "eoprrr": ["perro"]}
// 4. "ramo" → "amor" → Map: {"amor": ["amor", "roma", "ramo"], "eoprrr": ["perro"]}
// 5. "mora" → "amor" → Map: {"amor": ["amor", "roma", "ramo", "mora"], "eoprrr": ["perro"]}
// 6. "armo" → "amor" → Map: {"amor": ["amor", "roma", "ramo", "mora", "armo"], "eoprrr": ["perro"]}

// Filtrado (grupos con >1 palabra):
// - ["amor", "roma", "ramo", "mora", "armo"] ✓
// - ["perro"] ✗ (solo 1 palabra)

// Resultado: [["amor", "roma", "ramo", "mora", "armo"]]
// */

// // Ejemplo de uso:
// const palabras = ["amor", "roma", "perro", "ramo", "mora", "armo", "cats", "tacs", "act"];
// console.log('\n=== EJECUTANDO ALGORITMO ===');
// const resultado = agruparAnagramas(palabras);
// console.log('\n=== RESULTADO FINAL ===');
// console.log(resultado);
