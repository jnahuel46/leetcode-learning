// === TWO POINTERS ===
// Técnica donde usamos dos índices (izquierda y derecha) que se mueven
// hacia el centro (o en la misma dirección) para evitar el doble loop O(n²).
// Funciona bien con arrays ordenados o cuando buscamos un par/ventana.

// --- PROBLEMA 1: Two Sum II (array ordenado) ---
// Dado un array ORDENADO, encontrar dos números que sumen el target.
// Retornar sus índices (base 1).
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (numbers, target) => {
    let left = 0;
    let rigth = numbers.length - 1;
    while (left < rigth) {
        const result = numbers[left] + numbers[rigth]
        if (result === target) {
            return [left + 1, rigth + 1]
        } else if (result < target) {
            left++;   // la suma es chica, necesito un número más grande -> muevo left
        } else {
            rigth--;  // la suma es grande, necesito un número más chico -> muevo right
        }
    }
    return []
};

// --- PROBLEMA 2: Container With Most Water ---
// Dado un array de alturas, encontrar el par de líneas que forme
// el contenedor con mayor área de agua.
// Área = min(height[left], height[right]) * (right - left)
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = (height) => {

};

// --- PROBLEMA 3: Move Zeroes ---
// Mover todos los 0s al final del array manteniendo el orden relativo
// de los elementos no-cero. In-place, sin array extra.
// const arr1 = [0, 1, 0, 3, 12];
/**
 * @param {number[]} nums
 * @return {void}
 */
const moveZeroes = (nums) => {
    // Ejemplo para seguir el recorrido: nums = [0, 1, 0, 3, 12]

    // "slow" es como un cursor de escritura: apunta a la próxima casilla
    // libre donde tengo que escribir el próximo número que NO sea cero.
    // Arranca en 0 porque todavía no escribimos nada.
    let slow = 0;

    // "fast" es un cursor de lectura: recorre TODO el array, uno por uno,
    // buscando números que no sean cero.
    for (let fast = 0; fast < nums.length; fast++) {

        // Si lo que estoy leyendo (fast) no es cero, es un número que
        // quiero conservar.
        if (nums[fast] !== 0) {
            // Lo escribo en la posición de "slow" (la próxima casilla libre).
            // Ojo: cuando fast === slow, esto es escribir el número sobre
            // sí mismo, no pasa nada raro.
            nums[slow] = nums[fast];

            // Como ya usé esa casilla, muevo "slow" a la siguiente libre.
            slow++;
        }
        // Si nums[fast] === 0, no hago nada: simplemente lo "salteo" y
        // sigo leyendo con fast. Ese 0 se pierde y ya no importa,
        // porque al final lo vamos a reponer.
    }

    // En este punto, todos los números no-cero ya están al principio del
    // array (en el mismo orden en que aparecían), ocupando las posiciones
    // 0 a slow-1. Ejemplo: nums ahora es [1, 3, 12, 3, 12] y slow = 3.

    // Nos falta rellenar el resto del array (desde "slow" hasta el final)
    // con ceros, que es justo donde quedaron los "restos" viejos.
    //
    // Siguiendo el ejemplo: después del for, nums = [1, 3, 12, 3, 12] y
    // slow = 3 (las primeras 3 posiciones ya son los no-cero correctos;
    // el resto es "basura" que nunca se limpió).
    //   slow=3: nums[3] = 0 -> [1, 3, 12, 0, 12], slow++ -> 4
    //   slow=4: nums[4] = 0 -> [1, 3, 12, 0, 0],  slow++ -> 5
    //   slow=5: 5 < nums.length (5) es falso -> termina el loop
    //
    // Resultado final: [1, 3, 12, 0, 0]
    while (slow < nums.length) {
        nums[slow] = 0;
        slow++;
    }

    // Resultado final: [1, 3, 12, 0, 0]
};

/*
=== MARCO TEÓRICO: TWO POINTERS ===

1. ¿CUÁNDO USAR TWO POINTERS?
   - Array o string ordenado y buscás un par con cierta propiedad
   - Querés evitar el doble loop O(n²) y reducirlo a O(n)
   - Problemas de "ventana" o "contenedor" donde la respuesta depende
     de dos extremos que se pueden achicar/agrandar

2. VARIANTES PRINCIPALES:
   a) Opuestos (→ ←): parten de los extremos y se acercan al centro.
      Útil para arrays ordenados (Two Sum II, Container With Most Water).

   b) Mismo sentido (→ →) "slow/fast": un puntero lento escribe/marca,
      uno rápido escanea. Útil para in-place filtering (Move Zeroes,
      Remove Duplicates).

3. COMPLEJIDAD:
   - Tiempo: O(n) — cada puntero recorre el array una sola vez
   - Espacio: O(1) — sin estructuras auxiliares

4. TRUCO CLAVE para opuestos:
   - Si la suma es muy chica → mové left++ (buscás un valor más grande)
   - Si la suma es muy grande → mové right-- (buscás un valor más chico)
   - Esto funciona SOLO porque el array está ordenado

5. TRUCO CLAVE para slow/fast:
   - slow siempre apunta al "próximo slot válido"
   - fast escanea todos los elementos
   - Cuando fast encuentra algo válido, se intercambia con slow y slow avanza
*/

// Ejemplos
// console.log("=== Two Sum II ===");
// console.log(twoSum([2, 7, 11, 15], 9));   // [1, 2]
// console.log(twoSum([2, 3, 4], 6));         // [1, 3]

// console.log("\n=== Max Area ===");
// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
// console.log(maxArea([1, 1]));                         // 1

// console.log("\n=== Move Zeroes ===");
// const arr1 = [0, 1, 0, 3, 12];
// moveZeroes(arr1);
// console.log(arr1); // [1, 3, 12, 0, 0]

// const arr2 = [0, 0, 1];
// moveZeroes(arr2);
// console.log(arr2); // [1, 0, 0]

// === BONUS: TWO SUM SIN ORDENAR (hash map, no es two pointers) ===
// El Two Sum "clásico" de LeetCode (#1) NO garantiza que el array venga
// ordenado. Por eso el truco de mover left++/rigth-- NO sirve acá: esa
// lógica solo tiene sentido si el array está ordenado.
//
// La solución es usar un Map como "memoria" de lo que ya vimos:
// en vez de mover punteros, recorremos el array UNA vez y, para cada
// número, nos preguntamos "¿ya vi antes el número que me falta para
// llegar al target?".
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSumUnsorted = (nums, target) => {
    // seen guarda pares "valor visto" -> "índice donde lo vi".
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        // Si ya tengo nums[i], ¿qué otro número necesito para sumar target?
        const complemento = target - nums[i];

        // ¿Ese complemento ya apareció antes en el recorrido?
        if (seen.has(complemento)) {
            // Sí -> ya tengo los dos índices del par. Devuelvo directo,
            // sin seguir recorriendo.
            return [seen.get(complemento), i];
        }

        // No lo encontré (todavía). Guardo nums[i] por si más adelante
        // otro número lo necesita como complemento.
        seen.set(nums[i], i);
    }

    // Recorrí todo el array y no encontré ningún par -> no hay solución.
    return [];
};

// Ejemplo paso a paso: nums = [3, 2, 4], target = 6
//   i=0: nums[0]=3, complemento=3 (6-3). ¿seen tiene 3? no.
//        -> guardo seen = {3: 0}
//   i=1: nums[1]=2, complemento=4 (6-2). ¿seen tiene 4? no.
//        -> guardo seen = {3: 0, 2: 1}
//   i=2: nums[2]=4, complemento=2 (6-4). ¿seen tiene 2? SÍ (índice 1).
//        -> return [1, 2]  ✅ (nums[1]=2 y nums[2]=4 suman 6)
//
// Por qué es O(n) y no O(n²): es UN SOLO for, sin loop anidado. Cada
// número se revisa una sola vez, y buscar/guardar en un Map es O(1)
// en promedio. Como no necesitamos que el array esté ordenado, no hay
// que pagar el O(n log n) de ordenarlo tampoco.

// console.log("\n=== Two Sum (sin ordenar) ===");
// console.log(twoSumUnsorted([3, 2, 4], 6));      // [1, 2]
// console.log(twoSumUnsorted([2, 7, 11, 15], 9)); // [0, 1]
// console.log(arr2); // [1, 0, 0]
