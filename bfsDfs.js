// === BFS / DFS ===
// Dos formas de recorrer árboles y grafos.
// BFS (Breadth-First): nivel por nivel, usa una cola. Ideal para camino más corto.
// DFS (Depth-First): va hasta el fondo primero, usa recursión (o stack). Ideal para explorar.

// Nodo de árbol binario
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper para construir árbol desde array (null = nodo vacío)
const buildTree = (arr) => {
    if (!arr.length) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
        const node = queue.shift();
        if (arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
};

// --- BFS: Binary Tree Level Order Traversal ---
// Retornar los valores del árbol nivel por nivel.
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = (root) => {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
};

// --- DFS: Maximum Depth of Binary Tree ---
// Encontrar la profundidad máxima del árbol.
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = (root) => {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// --- DFS: Number of Islands (grafos en grilla) ---
// Dado un grid de '1' (tierra) y '0' (agua), contar el número de islas.
// Una isla es un grupo de '1's conectados horizontal o verticalmente.
/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = (grid) => {
    if (!grid.length) return 0;

    let count = 0;

    const dfs = (r, c) => {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '0') return;

        grid[r][c] = '0'; // marcamos como visitado
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c); // "hundimos" toda la isla
            }
        }
    }

    return count;
};

/*
=== MARCO TEÓRICO: BFS / DFS ===

1. BFS (Breadth-First Search) — usando COLA (queue):
   - Recorre nivel por nivel
   - Garantiza el CAMINO MÁS CORTO en grafos sin pesos
   - Usa más memoria (guarda todo un nivel)
   - Patrón: while queue: procesar nodo, agregar vecinos

2. DFS (Depth-First Search) — usando RECURSIÓN o STACK:
   - Va hasta el fondo de una rama antes de explorar la siguiente
   - Ideal para: detectar ciclos, contar componentes, path finding, backtracking
   - Usa menos memoria (solo guarda el camino actual en el stack)
   - Patrón: if base_case: return; procesar; llamar recursivamente

3. ¿CUÁNDO USAR CADA UNO?
   BFS → camino más corto, mínimos pasos, recorrido por niveles
   DFS → exploración completa, contar regiones, backtracking, topological sort

4. COMPLEJIDAD (árbol/grafo con V vértices y E aristas):
   - Tiempo: O(V + E)
   - Espacio: O(V) en el peor caso

5. MARCAR VISITADOS:
   - En árboles no hace falta (no hay ciclos)
   - En grafos es obligatorio para evitar loops infinitos
   - Técnicas: Set de visitados, o modificar el grid in-place (marcar '0')
*/

// Ejemplos
const tree1 = buildTree([3, 9, 20, null, null, 15, 7]);
const tree2 = buildTree([1, 2, 3, 4, 5]);

console.log("=== BFS Level Order ===");
console.log(levelOrder(tree1)); // [[3], [9, 20], [15, 7]]
console.log(levelOrder(tree2)); // [[1], [2, 3], [4, 5]]

console.log("\n=== DFS Max Depth ===");
console.log(maxDepth(tree1)); // 3
console.log(maxDepth(tree2)); // 3
console.log(maxDepth(buildTree([1, null, 2]))); // 2

console.log("\n=== DFS Number of Islands ===");
const grid1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];
console.log(numIslands(grid1)); // 1

const grid2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];
console.log(numIslands(grid2)); // 3
