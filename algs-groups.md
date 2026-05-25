# Algorithm Groups — Interview Cheat Sheet

Guía rápida para identificar qué técnica usar según el problema.

---

## 1. Two Pointers (Doble Puntero)

**Cuándo usarlo:** array o string ordenado, buscar par/trío con suma, palíndromos, eliminar duplicados.

**Señales:**
- "find a pair that sums to X"
- "remove duplicates in-place"
- "is this a palindrome?"
- Input ya está ordenado o se puede ordenar sin perder info

**Template:**
```js
let left = 0, right = arr.length - 1;
while (left < right) {
  // comparar arr[left] y arr[right]
  if (condicion) left++;
  else right--;
}
```

**Ejemplos:** Two Sum II, Container With Most Water, Valid Palindrome, 3Sum

---

## 2. Sliding Window (Ventana Deslizante)

**Cuándo usarlo:** subarray o substring contiguo de tamaño fijo o variable, máximo/mínimo en ventana.

**Señales:**
- "longest/shortest subarray/substring with condition"
- "maximum sum of k elements"
- Palabras clave: contiguous, subarray, substring

**Template:**
```js
let left = 0, sum = 0, best = 0;
for (let right = 0; right < arr.length; right++) {
  sum += arr[right];
  while (condicion_invalida) {
    sum -= arr[left];
    left++;
  }
  best = Math.max(best, right - left + 1);
}
```

**Ejemplos:** Longest Substring Without Repeating, Max Sum Subarray of Size K

---

## 3. Hash Map / Set

**Cuándo usarlo:** frecuencias, buscar duplicados, lookup O(1), anagramas, two sum.

**Señales:**
- "find duplicates"
- "count frequency"
- "two sum" (sin orden necesario)
- "group anagrams"

**Template:**
```js
const map = new Map();
for (const x of arr) {
  map.set(x, (map.get(x) ?? 0) + 1);
}
```

**Ejemplos:** Two Sum, Anagram Groups, Valid Anagram, Contains Duplicate

---

## 4. Binary Search

**Cuándo usarlo:** array ordenado, buscar elemento, encontrar límite (primera/última posición), búsqueda en espacio de soluciones.

**Señales:**
- Array ordenado explícito
- "find minimum/maximum that satisfies condition"
- Respuesta es un número en un rango y se puede verificar en O(n)

**Template:**
```js
let lo = 0, hi = arr.length - 1;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (arr[mid] === target) return mid;
  else if (arr[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
```

**Ejemplos:** Binary Search, Find First and Last Position, Search in Rotated Array

---

## 5. Recursión / Backtracking

**Cuándo usarlo:** explorar todas las combinaciones/permutaciones, árbol de decisiones, generar subconjuntos.

**Señales:**
- "generate all..."
- "find all combinations/permutations/subsets"
- Problemas con árbol de decisiones (incluir o no incluir)

**Template:**
```js
function backtrack(start, current) {
  if (condicion_base) {
    result.push([...current]);
    return;
  }
  for (let i = start; i < arr.length; i++) {
    current.push(arr[i]);
    backtrack(i + 1, current);
    current.pop(); // undo
  }
}
```

**Ejemplos:** Subsets, Permutations, Combination Sum, N-Queens

---

## 6. Dynamic Programming (DP)

**Cuándo usarlo:** problema con subproblemas superpuestos y subestructura óptima, contar caminos, max/min con decisiones.

**Señales:**
- "how many ways..."
- "maximum/minimum cost/profit"
- Si el backtracking bruto es muy lento (exponencial)
- El problema se puede definir como f(n) = f(n-1) + f(n-2) o similar

**Dos enfoques:**
- **Top-down (memoization):** recursión + cache
- **Bottom-up (tabulation):** llenar tabla iterativamente

**Template bottom-up:**
```js
const dp = new Array(n + 1).fill(0);
dp[0] = base_case;
for (let i = 1; i <= n; i++) {
  dp[i] = // transición usando dp[i-1], dp[i-2]...
}
```

**Ejemplos:** Fibonacci, Climbing Stairs, Coin Change, Longest Common Subsequence

---

## 7. BFS / DFS (Grafos y Árboles)

**Cuándo usarlo:** recorrer grafos, árboles, grids (matrices). BFS para camino más corto, DFS para exploración profunda.

**Señales:**
- Grid con 0s y 1s ("islands")
- "shortest path"
- Árbol binario: level-order = BFS, preorder/inorder/postorder = DFS

**BFS template:**
```js
const queue = [start];
const visited = new Set([start]);
while (queue.length) {
  const node = queue.shift();
  for (const neighbor of getNeighbors(node)) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }
}
```

**DFS template (recursivo):**
```js
function dfs(node, visited) {
  if (!node || visited.has(node)) return;
  visited.add(node);
  for (const neighbor of getNeighbors(node)) {
    dfs(neighbor, visited);
  }
}
```

**Ejemplos:** Number of Islands, Binary Tree Level Order, Word Ladder, Clone Graph

---

## 8. Stack / Monotonic Stack

**Cuándo usarlo:** problema de "siguiente mayor/menor elemento", evaluar expresiones, matching de paréntesis.

**Señales:**
- "next greater element"
- "valid parentheses"
- Histogramas, temperatura futura

**Template monotonic stack:**
```js
const stack = [];
for (let i = 0; i < arr.length; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    const idx = stack.pop();
    result[idx] = arr[i]; // siguiente mayor
  }
  stack.push(i);
}
```

**Ejemplos:** Valid Parentheses, Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram

---

## 9. Heap / Priority Queue

**Cuándo usarlo:** k-ésimo mayor/menor elemento, merge de listas ordenadas, top-K frecuentes.

**Señales:**
- "find the Kth largest/smallest"
- "top K frequent elements"
- Streaming de datos con necesidad de mínimo/máximo dinámico

**Nota JS:** no hay heap nativo — usar array ordenado para entrevistas simples, o implementar min-heap.

**Ejemplos:** Kth Largest Element, Top K Frequent Elements, Merge K Sorted Lists

---

## 10. Prefix Sum

**Cuándo usarlo:** queries de suma en rango, subarray con suma igual a k.

**Señales:**
- "sum of elements between index i and j"
- "subarray sum equals k"

**Template:**
```js
const prefix = [0];
for (const x of arr) prefix.push(prefix.at(-1) + x);
// suma rango [l, r] = prefix[r+1] - prefix[l]
```

**Ejemplos:** Range Sum Query, Subarray Sum Equals K

---

## Guía de decisión rápida

```
¿Array ordenado?
  ├─ Buscar elemento → Binary Search
  └─ Buscar par/trío → Two Pointers

¿Subarray/substring contiguo?
  └─ Sliding Window

¿Frecuencias o lookup rápido?
  └─ Hash Map / Set

¿Generar todas las combinaciones?
  └─ Backtracking

¿Contar caminos / max-min con decisiones?
  └─ Dynamic Programming

¿Grid o grafo?
  ├─ Camino más corto → BFS
  └─ Exploración completa → DFS

¿Siguiente mayor/menor / paréntesis?
  └─ Stack

¿Top-K / Kth elemento?
  └─ Heap
```
