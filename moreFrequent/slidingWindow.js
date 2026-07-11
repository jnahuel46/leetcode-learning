// === SLIDING WINDOW ===
// Mantenemos una "ventana" (subarray/substring) que se expande o contrae
// mientras recorremos el array. Evita el doble loop O(n²) → O(n).
// Complemento natural de two pointers: aquí el foco es en el rango [left, right].

// --- PROBLEMA 1: Max Sum Subarray of Size K ---
// Dado un array de números y un tamaño k, encontrar la suma máxima
// de cualquier subarray contiguo de longitud k.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxSumSubarray = (nums, k) => {
    let windowSum = 0;
    let maxSum = 0;

    for (let i = 0; i < nums.length; i++) {
        windowSum += nums[i];

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= nums[i - (k - 1)]; // saco el elemento que sale por la izquierda
        }
    }

    return maxSum;
};

// --- PROBLEMA 2: Longest Substring Without Repeating Characters ---
// Dado un string, encontrar la longitud del substring más largo
// sin caracteres repetidos.
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
    const seen = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Si el caracter ya está en la ventana, achicamos por la izquierda
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

// --- PROBLEMA 3: Minimum Size Subarray Sum ---
// Dado un array de enteros positivos y un target, encontrar la longitud
// mínima del subarray contiguo cuya suma sea >= target.
// Retornar 0 si no existe.
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubarrayLen = (target, nums) => {
    let left = 0;
    let sum = 0;
    let minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        // Mientras la ventana cumpla la condición, intentamos achicarla
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLen === Infinity ? 0 : minLen;
};

/*
=== MARCO TEÓRICO: SLIDING WINDOW ===

1. ¿CUÁNDO USAR SLIDING WINDOW?
   - Buscás algo sobre un subarray/substring contiguo (max, min, longitud)
   - Los datos son lineales (array, string)
   - Agregar un elemento a la derecha y sacar uno por la izquierda
     es una operación O(1)

2. VARIANTES PRINCIPALES:
   a) Ventana FIJA (tamaño k constante):
      - Sumás el nuevo elemento, restás el que sale.
      - Ejemplo: Max Sum Subarray of Size K.

   b) Ventana VARIABLE (se expande y contrae):
      - right siempre avanza; left avanza solo cuando la ventana
        viola la condición.
      - Ejemplo: Longest Substring Without Repeating Chars,
        Minimum Size Subarray Sum.

3. COMPLEJIDAD:
   - Tiempo: O(n) — cada elemento entra y sale de la ventana como máximo una vez
   - Espacio: O(k) o O(alphabet) para ventanas con Set/Map

4. PATRÓN GENERAL (ventana variable):
   for right in range(n):
       agregar nums[right] a la ventana
       while (ventana viola condición):
           sacar nums[left] de la ventana
           left++
       actualizar respuesta con la ventana actual

5. DIFERENCIA CON TWO POINTERS:
   - Two pointers: los punteros se mueven hacia adentro buscando un par.
   - Sliding window: mantenés activamente el contenido del rango [left, right].
*/

console.log("=== Max Sum Subarray (k=3) ===");
console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9  (5+1+3)
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2));     // 7  (3+4)

console.log("\n=== Longest Substring Without Repeating Chars ===");
console.log(lengthOfLongestSubstring("abcabcbb")); // 3  ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // 1  ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // 3  ("wke")

console.log("\n=== Minimum Size Subarray Sum ===");
console.log(minSubarrayLen(7, [2, 3, 1, 2, 4, 3])); // 2  (4+3)
console.log(minSubarrayLen(4, [1, 4, 4]));           // 1  (4)
console.log(minSubarrayLen(11, [1, 1, 1, 1, 1]));   // 0  (no existe)
