// === BINARY SEARCH ===
// Dividimos el espacio de búsqueda a la mitad en cada paso.
// Requiere que el array esté ordenado (o que la condición sea monotónica).
// O(log n) en vez de O(n).

// --- PROBLEMA 1: Binary Search clásico ---
// Dado un array ordenado, encontrar el índice de target.
// Retornar -1 si no existe.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;  // target está a la derecha
        else right = mid - 1;                     // target está a la izquierda
    }

    return -1;
};

// --- PROBLEMA 2: Search in Rotated Sorted Array ---
// El array fue rotado en algún punto (ej: [4,5,6,7,0,1,2]).
// Encontrar el índice de target, o -1 si no existe.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchRotated = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // La mitad izquierda está ordenada
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            // La mitad derecha está ordenada
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }

    return -1;
};

// --- PROBLEMA 3: Find Minimum in Rotated Sorted Array ---
// Encontrar el elemento mínimo del array rotado.
/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = (nums) => {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Si mid es mayor que right, el mínimo está en la mitad derecha
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid; // el mínimo está en la mitad izquierda (o es mid)
    }

    return nums[left];
};

/*
=== MARCO TEÓRICO: BINARY SEARCH ===

1. ¿CUÁNDO USAR BINARY SEARCH?
   - Array ordenado y buscás un valor específico
   - La condición es "monotónica": hay un punto donde pasa de false a true
     (o viceversa) y no vuelve atrás
   - Preguntas del tipo "¿cuál es el mínimo X tal que se cumple condición?"

2. PLANTILLA BASE:
   left = 0, right = n - 1
   while left <= right:
       mid = (left + right) / 2
       if found: return mid
       if too_small: left = mid + 1
       else: right = mid - 1

3. ERRORES COMUNES:
   - Usar left < right vs left <= right: depende de si right puede ser la respuesta
   - mid = (left + right) / 2 puede causar overflow en otros lenguajes;
     en JS es seguro pero el patrón seguro es: left + Math.floor((right - left) / 2)
   - Actualizar left = mid (sin +1) puede causar loop infinito

4. VARIANTE "BUSCAR EN RESPUESTA":
   En vez de buscar en el array, binary search sobre el rango de respuestas posibles.
   Ej: "mínima velocidad para terminar en H horas" → search sobre [1, max(piles)]

5. COMPLEJIDAD:
   - Tiempo: O(log n)
   - Espacio: O(1)
*/

console.log("=== Binary Search clásico ===");
console.log(search([-1, 0, 3, 5, 9, 12], 9));  // 4
console.log(search([-1, 0, 3, 5, 9, 12], 2));  // -1

console.log("\n=== Search in Rotated Array ===");
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(searchRotated([1], 0));                     // -1

console.log("\n=== Find Minimum in Rotated Array ===");
console.log(findMin([3, 4, 5, 1, 2])); // 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
console.log(findMin([11, 13, 15, 17])); // 11
