/**
 * @param {string} code
 * @return {boolean}
 */
const isValid = function (code) {
  if (code[0] !== '<' || code.at(-1) !== '>') return false;
  const n = code.length;
  const stack = [];
  let index = 0;
  let isHasTag = false;

  while (index < n) {
    const value = code[index];

    index += 1;
    if (value !== '<') continue;
    if (code[index] === '!') {
      if (!isHasTag) return false;
      const cdata = '![CDATA[';
      const startSlice = code.slice(index, index + cdata.length);

      if (startSlice !== cdata) return false;
      const closeIndex = code.indexOf(']]>', index);

      if (closeIndex === -1) return false;
      index = closeIndex + 3;
      continue;
    }
    let tag = '';

    while (code[index] !== '>') {
      tag += code[index];
      index += 1;
    }
    if (tag.replace('/', '').length > 9) return false;
    if (/^[A-Z]+$/.test(tag)) {
      isHasTag = true;
      stack.push(tag);
      index += 1;
      continue;
    }
    if (`/${stack.at(-1)}` !== tag) return false;
    stack.pop();
    index += 1;
    if (!stack.length && index < n) return false;
  }
  return isHasTag && !stack.length;
};
