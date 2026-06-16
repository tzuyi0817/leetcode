/**
 * @param {string} s
 * @return {string}
 */
const processStr = function (s) {
  const REMOVE = '*';
  const DUPLICATE = '#';
  const REVERSE = '%';
  const operationMap = {
    [REMOVE]: arr => {
      arr.pop();

      return arr;
    },
    [DUPLICATE]: arr => {
      arr.push(...arr);

      return arr;
    },
    [REVERSE]: arr => arr.toReversed(),
    default: (arr, char) => {
      arr.push(char);

      return arr;
    },
  };
  let current = [];

  for (const char of s) {
    const operation = operationMap[char] ?? operationMap.default;

    current = operation(current, char);
  }

  return current.join('');
};
