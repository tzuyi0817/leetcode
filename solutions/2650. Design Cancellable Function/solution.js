/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
const cancellable = function (generator) {
  let canceled = false;

  const cancelTask = () => {
    canceled = true;
  };

  const promiseTask = async () => {
    let current = generator.next();

    while (!current.done) {
      try {
        const nextValue = await current.value;

        current = canceled ? generator.throw('Cancelled') : generator.next(nextValue);
      } catch (error) {
        current = generator.throw(error);
      }
    }

    return current.value;
  };

  return [cancelTask, promiseTask()];
};

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */
