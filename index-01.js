//SetTimeout Excercise


/**
 * @param {Function} fn - The function to be executed after a delay.
 * @param {Array} args - The arguments to pass to fn when executed.
 * @param {number} t - The delay time in milliseconds before executing fn.
 * @return {Function} - A cancel function that prevents fn execution if called before t.
 */
var cancellable = function (fn, args, t) {
  // Schedule the function execution after t milliseconds
  const timeoutId = setTimeout(() => fn(args), t);

  // Return a cancel function that clears the timeout
  return function cancelFn() {
    clearTimeout(timeoutId);
    console.log("Execution cancelled!");
  };
};

const result = [];

const fn = (x) => x * 5;

const args = [2],
  t = 20,
  cancelTimeMs = 5000;

const start = performance.now();

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);
const maxT = Math.max(t, cancelTimeMs);

setTimeout(cancel, cancelTimeMs);

setTimeout(() => {
  console.log(result); // [{"time":20,"returned":10}]
}, cancelTimeMs);
