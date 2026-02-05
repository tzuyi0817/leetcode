/**
 * @param {string} message
 * @param {number} limit
 * @return {string[]}
 */
const splitMessage = function (message, limit) {
  const n = message.length;
  const BASE_LEN = 3;
  let lenA = 1;
  let b = 1;

  while (b * limit < b * (`${b}`.length + BASE_LEN) + lenA + n) {
    const len = `${b}`.length * 2;

    if (len + BASE_LEN >= limit) return [];

    b += 1;
    lenA += `${b}`.length;
  }

  const result = [];
  let index = 0;

  for (let part = 1; part <= b; part++) {
    const suffix = `<${part}/${b}>`;
    const len = limit - suffix.length;
    const sliceMessage = message.slice(index, index + len);

    index += len;
    result.push(`${sliceMessage}${suffix}`);
  }

  return result;
};
