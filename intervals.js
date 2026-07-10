// === INTERVALS ===
// Problemas sobre rangos [start, end]. El truco casi siempre es:
// ordenar por el inicio del intervalo y después recorrer comparando
// con el anterior (o con uno que vamos "construyendo").

// --- PROBLEMA 1: Merge Intervals ---
// Dado un array de intervalos [start, end], fusionar los que se solapan.
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = (intervals) => {
    if (intervals.length <= 1) return intervals;

    // Ordenamos por el inicio: así cualquier solapamiento queda "adyacente"
    const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
    const result = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const last = result[result.length - 1];
        const current = sorted[i];

        if (current[0] <= last[1]) {
            // Se solapan (o son contiguos): extendemos el último
            last[1] = Math.max(last[1], current[1]);
        } else {
            result.push(current);
        }
    }

    return result;
};

// --- PROBLEMA 2: Insert Interval ---
// Dado un array de intervalos ya ordenados y sin solapamientos,
// insertar uno nuevo fusionando donde corresponda.
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = (intervals, newInterval) => {
    const result = [];
    let [start, end] = newInterval;
    let i = 0;

    // 1) Todos los intervalos que terminan antes de que empiece el nuevo
    while (i < intervals.length && intervals[i][1] < start) {
        result.push(intervals[i]);
        i++;
    }

    // 2) Todos los que se solapan con el nuevo: los vamos fusionando
    while (i < intervals.length && intervals[i][0] <= end) {
        start = Math.min(start, intervals[i][0]);
        end = Math.max(end, intervals[i][1]);
        i++;
    }
    result.push([start, end]);

    // 3) El resto, que empieza después de que termina el nuevo
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};

// --- PROBLEMA 3: Non-overlapping Intervals ---
// Dado un array de intervalos, encontrar el mínimo número de intervalos
// a eliminar para que el resto no se solape.
/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = (intervals) => {
    if (intervals.length === 0) return 0;

    // Greedy: ordenamos por el FIN del intervalo. El que termina antes
    // deja más lugar libre para los siguientes.
    const sorted = [...intervals].sort((a, b) => a[1] - b[1]);

    let removals = 0;
    let prevEnd = sorted[0][1];

    for (let i = 1; i < sorted.length; i++) {
        const [start, end] = sorted[i];

        if (start < prevEnd) {
            // Se solapa con el anterior que "sobrevivió": lo descartamos
            removals++;
        } else {
            prevEnd = end;
        }
    }

    return removals;
};

/*
=== MARCO TEÓRICO: INTERVALS ===

1. ¿CUÁNDO USAR ESTE PATRÓN?
   - El input es una lista de rangos [start, end]
   - Preguntan por fusionar, insertar, contar solapamientos,
     o encontrar el mínimo a remover

2. IDEA CENTRAL:
   - Ordenar es casi siempre el primer paso (por start o por end
     según el problema).
   - Una vez ordenado, un solo recorrido lineal alcanza para comparar
     cada intervalo con el "último que quedó válido".

3. CUÁNDO ORDENAR POR START vs POR END:
   - Por START: cuando fusionás o insertás (merge, insert interval).
     Necesitás procesar los intervalos en el orden en que "empiezan".
   - Por END: cuando hacés selección greedy (erase overlapping,
     "max number of non-overlapping intervals", scheduling).
     El que termina antes deja más margen para los siguientes.

4. CONDICIÓN DE SOLAPAMIENTO:
   - Dos intervalos [a, b] y [c, d] (con a <= c) se solapan si c <= b.
   - Si c > b, no se solapan.

5. COMPLEJIDAD:
   - Tiempo: O(n log n) por el sort inicial (el recorrido es O(n))
   - Espacio: O(n) para el resultado (o O(1) si se pide in-place)
*/

console.log("=== Merge Intervals ===");
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]]));                     // [[1,5]]

console.log("\n=== Insert Interval ===");
console.log(insert([[1, 3], [6, 9]], [2, 5]));            // [[1,5],[6,9]]
console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]));
// [[1,2],[3,10],[12,16]]

console.log("\n=== Non-overlapping Intervals ===");
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]));         // 2
console.log(eraseOverlapIntervals([[1, 2], [2, 3]]));                 // 0
