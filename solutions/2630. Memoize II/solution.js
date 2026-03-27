/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const resultSymbol = Symbol('result');
  const hashMap = new Map();

  return function (...params) {
    let currentMap = hashMap;

    for (const param of params) {
      if (!currentMap.has(param)) {
        currentMap.set(param, new Map());
      }

      currentMap = currentMap.get(param);
    }

    if (currentMap.has(resultSymbol)) {
      return currentMap.get(resultSymbol);
    }

    const result = fn(...params);

    currentMap.set(resultSymbol, result);

    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
