// === DYNAMIC PROGRAMMING ===
// Descomponemos el problema en subproblemas más chicos y guardamos sus resultados
// para no recalcularlos. La diferencia con recursión pura: MEMORIZACIÓN.
// Dos enfoques: top-down (memoization) y bottom-up (tabulation).

// --- PROBLEMA 1: Climbing Stairs ---
// Para subir n escalones podés dar 1 o 2 pasos a la vez.
// ¿De cuántas formas distintas podés llegar al tope?
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = (n) => {
    if (n <= 2) return n;

    // dp[i] = formas de llegar al escalón i
    // dp[i] = dp[i-1] + dp[i-2]  (llegué desde i-1 dando 1 paso, o desde i-2 dando 2)
    let prev2 = 1; // dp[1]
    let prev1 = 2; // dp[2]

    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};

// --- PROBLEMA 2: Coin Change ---
// Dado un array de monedas y un amount, encontrar el mínimo número
// de monedas para completar ese amount. Retornar -1 si es imposible.
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = (coins, amount) => {
    // dp[i] = mínimo de monedas para hacer el valor i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // para hacer 0, necesitamos 0 monedas

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};

// --- PROBLEMA 3: Longest Common Subsequence ---
// Dado dos strings, encontrar la longitud de la subsecuencia común más larga.
// (Los caracteres no tienen que ser contiguos, pero sí en orden.)
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = (text1, text2) => {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] = LCS de text1[0..i-1] y text2[0..j-1]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1; // mismo caracter: extendemos la LCS
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // tomamos el mejor
            }
        }
    }

    return dp[m][n];
};

/*
=== MARCO TEÓRICO: DYNAMIC PROGRAMMING ===

1. ¿CUÁNDO USAR DP?
   Dos señales clave:
   a) SUBPROBLEMAS SOLAPADOS: el mismo subproblema se resuelve múltiples veces
   b) SUBESTRUCTURA ÓPTIMA: la solución óptima se construye con soluciones óptimas
      de subproblemas

2. ENFOQUES:
   a) Top-down (Memoization): recursión + cache. Más natural de pensar.
      function dp(n):
          if n in memo: return memo[n]
          memo[n] = dp(n-1) + dp(n-2)
          return memo[n]

   b) Bottom-up (Tabulation): llenar una tabla desde los casos base.
      Más eficiente (sin overhead de recursión), es lo que usamos aquí.

3. PASOS PARA RESOLVER UN PROBLEMA DP:
   1. Definir el estado: ¿qué representa dp[i]?
   2. Definir la transición: ¿cómo se calcula dp[i] a partir de estados anteriores?
   3. Identificar el caso base (dp[0], dp[1], etc.)
   4. Identificar el orden de llenado (generalmente de izquierda a derecha)
   5. Retornar dp[n] o el estado final

4. OPTIMIZACIÓN DE ESPACIO:
   Muchos problemas DP 1D solo necesitan los últimos 1-2 valores (como Climbing Stairs).
   Podés pasar de O(n) a O(1) guardando solo prev1 y prev2.

5. COMPLEJIDAD:
   - Climbing Stairs: O(n) tiempo, O(1) espacio
   - Coin Change: O(amount * coins.length) tiempo, O(amount) espacio
   - LCS: O(m * n) tiempo, O(m * n) espacio
*/

console.log("=== Climbing Stairs ===");
console.log(climbStairs(2)); // 2  (1+1, 2)
console.log(climbStairs(3)); // 3  (1+1+1, 1+2, 2+1)
console.log(climbStairs(5)); // 8

console.log("\n=== Coin Change ===");
console.log(coinChange([1, 5, 10, 25], 36)); // 3  (25+10+1)
console.log(coinChange([1, 2, 5], 11));       // 3  (5+5+1)
console.log(coinChange([2], 3));              // -1 (imposible)

console.log("\n=== Longest Common Subsequence ===");
console.log(longestCommonSubsequence("abcde", "ace")); // 3  ("ace")
console.log(longestCommonSubsequence("abc", "abc"));   // 3
console.log(longestCommonSubsequence("abc", "def"));   // 0
