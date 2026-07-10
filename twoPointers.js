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
    let left = 0;
    let rigth = nums.length - 1;
    while (left < rigth) {
        if (nums[left] === 0) {
            nums.splice(left, 1);
        }
    }

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
