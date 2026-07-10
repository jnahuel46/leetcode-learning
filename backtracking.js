// === BACKTRACKING ===
// Exploramos todas las combinaciones posibles construyendo una solución
// paso a paso, y "deshacemos" (backtrack) el último paso cuando no sirve
// o cuando ya la registramos, para probar la siguiente opción.
// Patrón general: elegir → explorar → deselegir.

// --- PROBLEMA 1: Subsets ---
// Dado un array de números únicos, devolver todos los subconjuntos posibles.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
    const result = [];
    const current = [];

    const backtrack = (start) => {
        // Cada estado de "current" es un subconjunto válido: lo guardamos ya
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);      // elegir
            backtrack(i + 1);           // explorar
            current.pop();              // deselegir
        }
    };

    backtrack(0);
    return result;
};

// --- PROBLEMA 2: Permutations ---
// Dado un array de números únicos, devolver todas las permutaciones posibles.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
    const result = [];
    const current = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = () => {
        // Solo las hojas del árbol (current del mismo largo que nums)
        // son permutaciones completas
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue; // ya está en la permutación actual

            used[i] = true;
            current.push(nums[i]);   // elegir

            backtrack();              // explorar

            current.pop();           // deselegir
            used[i] = false;
        }
    };

    backtrack();
    return result;
};

// --- PROBLEMA 3: Combination Sum ---
// Dado un array de candidatos (sin duplicados) y un target, devolver
// todas las combinaciones únicas donde los candidatos suman target.
// El mismo número puede usarse varias veces.
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
    const result = [];
    const current = [];

    const backtrack = (start, remaining) => {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0) return; // poda: nos pasamos, no sirve seguir

        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            // pasamos "i" (no i+1) porque el mismo número se puede repetir
            backtrack(i, remaining - candidates[i]);
            current.pop();
        }
    };

    backtrack(0, target);
    return result;
};

/*
=== MARCO TEÓRICO: BACKTRACKING ===

1. ¿CUÁNDO USAR ESTE PATRÓN?
   - Piden TODAS las combinaciones/permutaciones/subconjuntos posibles
   - Palabras clave: "todas las formas de...", "todos los subconjuntos",
     "todas las permutaciones", sudoku, N-queens, generar paréntesis

2. ESTRUCTURA GENERAL (siempre la misma):
   const backtrack = (estado) => {
       if (condición de fin) {
           result.push(construir respuesta);
           return;
       }
       for (cada opción disponible) {
           elegir la opción         // current.push / marcar usado
           backtrack(nuevo estado)  // explorar
           deshacer la elección     // current.pop / desmarcar
       }
   };

3. LAS 3 VARIANTES CLÁSICAS Y SU DIFERENCIA:
   a) SUBSETS: cada nodo del árbol es una respuesta válida (no solo hojas).
      Se avanza con "start" para no repetir combinaciones (no reusar índices previos).

   b) PERMUTATIONS: solo las hojas (mismo largo que el input) son respuesta.
      Se necesita un array "used[]" porque el orden importa y podemos
      volver a usar índices anteriores en otro orden.

   c) COMBINATION SUM: hay "poda" (pruning) porque hay un target numérico.
      Si permite reusar el mismo elemento, la recursión pasa "i" en vez
      de "i + 1".

4. LA CLAVE DEL BACKTRACKING: el "pop()" (o "used[i] = false")
   Es lo que distingue esto de un simple DFS: mutamos el estado compartido,
   probamos, y lo revertimos para que la siguiente rama del árbol
   arranque limpia.

5. COMPLEJIDAD:
   - Generalmente exponencial: O(2^n) para subsets, O(n!) para permutations.
   - Es esperable — el punto es generar TODAS las posibilidades.
*/

console.log("=== Subsets ===");
console.log(subsets([1, 2, 3]));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

console.log("\n=== Permutations ===");
console.log(permute([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

console.log("\n=== Combination Sum ===");
console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8));    // [[2,2,2,2],[2,3,3],[3,5]]
