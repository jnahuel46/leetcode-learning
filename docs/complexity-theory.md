# Complejidad Algorítmica — Teoría

---

## ¿Qué es Big O?

Big O describe cómo crece el tiempo o espacio de un algoritmo en función del tamaño del input `n`. Mide el **peor caso**.

No mide segundos reales — mide la tasa de crecimiento.

---

## Complejidades comunes (de mejor a peor)

| Notación | Nombre | Ejemplo |
|---|---|---|
| O(1) | Constante | Acceso a array por índice |
| O(log n) | Logarítmica | Binary search |
| O(n) | Lineal | Recorrer un array |
| O(n log n) | Lineal-logarítmica | Merge sort, quicksort promedio |
| O(n²) | Cuadrática | Dos loops anidados |
| O(n³) | Cúbica | Tres loops anidados |
| O(2ⁿ) | Exponencial | Backtracking / subsets |
| O(n!) | Factorial | Todas las permutaciones |

---

## Visualización del crecimiento

```
n = 10:
  O(1)      → 1
  O(log n)  → 3
  O(n)      → 10
  O(n log n)→ 33
  O(n²)     → 100
  O(2ⁿ)     → 1,024

n = 100:
  O(1)      → 1
  O(log n)  → 7
  O(n)      → 100
  O(n log n)→ 664
  O(n²)     → 10,000
  O(2ⁿ)     → 1.27 × 10³⁰  ← imposible
```

---

## Reglas para calcular Big O

### 1. Eliminar constantes
```
O(2n) → O(n)
O(500) → O(1)
O(n/2) → O(n)
```

### 2. Eliminar términos no dominantes
```
O(n² + n) → O(n²)
O(n + log n) → O(n)
```

### 3. Loops
```js
// O(n)
for (let i = 0; i < n; i++) { ... }

// O(n²) — loops anidados sobre el mismo input
for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) { ... }

// O(n * m) — loops sobre inputs distintos
for (let i = 0; i < n; i++)
  for (let j = 0; j < m; j++) { ... }
```

### 4. Dividir a la mitad → logarítmico
```js
// O(log n) — cada iteración descarta la mitad
while (n > 1) { n = Math.floor(n / 2); }
```

### 5. Recursión
La complejidad = número de llamadas × trabajo por llamada.

```js
// O(2ⁿ) — cada llamada genera 2 más
function fib(n) {
  return fib(n-1) + fib(n-2);
}

// O(n) con memoization
const memo = {};
function fib(n) {
  if (n in memo) return memo[n];
  memo[n] = fib(n-1) + fib(n-2);
  return memo[n];
}
```

---

## Espacio (Space Complexity)

Igual que tiempo, pero cuenta memoria usada.

- Variables primitivas → O(1)
- Array de tamaño n → O(n)
- Matriz n×n → O(n²)
- Call stack de recursión de profundidad n → O(n)

```js
// O(n) espacio — guarda n resultados
const result = [];
for (let i = 0; i < n; i++) result.push(i);

// O(1) espacio — solo variables
let sum = 0;
for (let i = 0; i < n; i++) sum += i;
```

---

## Big O de estructuras de datos comunes

| Estructura | Acceso | Búsqueda | Inserción | Eliminación |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| Hash Map | O(1) | O(1) | O(1) | O(1) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |
| Binary Search Tree (balanceado) | O(log n) | O(log n) | O(log n) | O(log n) |
| Heap | — | O(n) | O(log n) | O(log n) |

---

## Big O de algoritmos de ordenamiento

| Algoritmo | Mejor | Promedio | Peor | Espacio |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

> `Array.prototype.sort()` en V8 (Node.js) usa TimSort → O(n log n) promedio.

---

## Trampas frecuentes en entrevistas

### String concatenation en loop
```js
// O(n²) — cada concatenación crea un string nuevo
let s = "";
for (const c of arr) s += c;

// O(n) — join al final
const parts = [];
for (const c of arr) parts.push(c);
parts.join("");
```

### `.includes()` o `.indexOf()` dentro de un loop
```js
// O(n²) — includes es O(n) dentro de O(n)
for (const x of arr) {
  if (arr.includes(x)) { ... }
}

// O(n) — convertir a Set primero
const set = new Set(arr);
for (const x of arr) {
  if (set.has(x)) { ... }
}
```

### Recursión sin memo
```js
// O(2ⁿ) — recalcula subproblemas
function fib(n) { return fib(n-1) + fib(n-2); }

// O(n) — memoization
const memo = new Map();
function fib(n) {
  if (memo.has(n)) return memo.get(n);
  const res = fib(n-1) + fib(n-2);
  memo.set(n, res);
  return res;
}
```

---

## Límites prácticos en entrevistas

Dado un tiempo límite de ~1 segundo y que JS ejecuta ≈ 10⁸ operaciones simples/seg:

| n | Complejidad máxima aceptable |
|---|---|
| n ≤ 10 | O(n!) — backtracking total |
| n ≤ 20 | O(2ⁿ) |
| n ≤ 500 | O(n²) |
| n ≤ 10,000 | O(n log n) |
| n ≤ 10⁶ | O(n) |
| n ≤ 10⁸ | O(log n) o O(1) |

---

## Notaciones hermanas (para completar el cuadro)

| Notación | Significado |
|---|---|
| O(f(n)) | Peor caso (upper bound) — la más usada |
| Ω(f(n)) | Mejor caso (lower bound) |
| Θ(f(n)) | Caso exacto (tight bound) — cuando mejor y peor coinciden |
