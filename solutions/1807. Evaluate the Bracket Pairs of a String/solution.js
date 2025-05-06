/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
const evaluate = function (s, knowledge) {
  const knowledgeMap = knowledge.reduce((map, [key, value]) => {
    return (map[key] = value), map;
  }, {});
  let result = '';
  let key = '';
  let isStart = false;

  for (const char of s) {
    if (char === '(') isStart = true;
    else if (char === ')') {
      result += knowledgeMap[key] ?? '?';
      isStart = false;
      key = '';
    } else {
      isStart ? (key += char) : (result += char);
    }
  }
  return result;
};
