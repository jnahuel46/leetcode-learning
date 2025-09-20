//SetInteval excercise

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
    fn(...args);
  const interval = setInterval(function () {
    fn(...args);
  }, t);
  // Return a cancel function that clears the timeout
  return function cancelFn() {
    clearInterval(interval);
  };
};

const result = [];

const fn = (x) => x * 2;
const args = [4],
  t = 35,
  cancelTimeMs = 190;

const start = performance.now();

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);
console.log(222, cancel);
setTimeout(cancel, cancelTimeMs);

setTimeout(() => {
  console.log(result);
}, cancelTimeMs);
