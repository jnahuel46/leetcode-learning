// === STACK (Pila) ===
// Estructura LIFO (Last In, First Out). En JS usamos un array con push/pop.
// Clave en problemas donde necesitás "recordar" elementos anteriores
// mientras avanzás, especialmente cuando el orden importa.

// --- PROBLEMA 1: Valid Parentheses ---
// Dado un string con '(', ')', '{', '}', '[', ']',
// determinar si los paréntesis están correctamente balanceados.
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };

    for (const char of s) {
        if (!pairs[char]) {
            stack.push(char); // es un abridor, lo apilamos
        } else {
            if (stack.pop() !== pairs[char]) return false; // el tope no matchea
        }
    }

    return stack.length === 0; // si quedó algo, falta cerrar
};

// --- PROBLEMA 2: Min Stack ---
// Stack que soporta push, pop, top y getMin en O(1).
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = []; // pila auxiliar que guarda el mínimo actual en cada paso
    }

    /** @param {number} val */
    push(val) {
        this.stack.push(val);
        const currentMin = this.minStack.length
            ? Math.min(val, this.minStack[this.minStack.length - 1])
            : val;
        this.minStack.push(currentMin);
    }

    pop() {
        this.stack.pop();
        this.minStack.pop();
    }

    /** @return {number} */
    top() {
        return this.stack[this.stack.length - 1];
    }

    /** @return {number} */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// --- PROBLEMA 3: Daily Temperatures (Stack Monotónico) ---
// Dado un array de temperaturas, para cada día encontrar cuántos días
// hay que esperar hasta una temperatura más caliente. 0 si nunca llega.
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const dailyTemperatures = (temperatures) => {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // guarda índices de días pendientes (temperaturas decrecientes)

    for (let i = 0; i < temperatures.length; i++) {
        // Mientras el día actual sea más cálido que el tope del stack, resolvemos
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }

    return result;
};

/*
=== MARCO TEÓRICO: STACK ===

1. ¿CUÁNDO USAR STACK?
   - Problemas de balanceo/matching: paréntesis, tags HTML
   - Cuando necesitás deshacer o "ir hacia atrás": undo, backtracking
   - Cuando el elemento que agregaste "más recientemente" es el más relevante
   - Implementar recursión iterativamente (DFS con stack explícito)

2. STACK MONOTÓNICO:
   Un stack donde los elementos siempre están en orden (creciente o decreciente).
   Cuando entra un elemento que "rompe" el orden, sacamos elementos hasta restaurarlo.
   Útil para: "próximo mayor elemento", "temperaturas", "histograma más grande".

   Patrón:
   for each element:
       while stack not empty AND current "domina" top:
           pop and process top
       push current

3. MIN STACK — TRUCO:
   En vez de calcular el mínimo de todo el stack al hacer pop (O(n)),
   mantenemos una pila paralela donde cada posición guarda el mínimo
   hasta ese punto. Push y pop en ambas siempre juntos → O(1) para getMin.

4. OPERACIONES Y COMPLEJIDAD:
   - push: O(1)
   - pop: O(1)
   - top/peek: O(1)
   - Stack monotónico: O(n) total (cada elemento entra y sale una sola vez)
*/

console.log("=== Valid Parentheses ===");
console.log(isValid("()"));     // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
console.log(isValid("([)]"));   // false
console.log(isValid("{[]}"));   // true

console.log("\n=== Min Stack ===");
const ms = new MinStack();
ms.push(-2);
ms.push(0);
ms.push(-3);
console.log(ms.getMin()); // -3
ms.pop();
console.log(ms.top());    // 0
console.log(ms.getMin()); // -2

console.log("\n=== Daily Temperatures ===");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30, 40, 50, 60]));                  // [1,1,1,0]
console.log(dailyTemperatures([30, 60, 90]));                      // [1,1,0]
