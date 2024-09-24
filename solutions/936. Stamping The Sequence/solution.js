/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
const movesToStamp = function (stamp, target) {
  const n = target.length;
  const result = [];
  const current = target.split('');
  const visited = Array(n).fill(false);
  let masks = 0;

  const isCanReplace = start => {
    for (let index = 0; index < stamp.length; index++) {
      const value = current[index + start];

      if (value === stamp[index] || value === '?') continue;
      return false;
    }
    return true;
  };

  const replaceToMask = start => {
    let count = 0;

    for (let index = 0; index < stamp.length; index++) {
      if (current[index + start] === '?') continue;
      current[index + start] = '?';
      count += 1;
    }
    return count;
  };

  while (masks < n) {
    let isStamped = false;

    for (let index = 0; index <= n - stamp.length; index++) {
      if (visited[index] || !isCanReplace(index)) continue;
      masks += replaceToMask(index);
      result.push(index);
      visited[index] = true;
      isStamped = true;
    }
    if (!isStamped) return [];
  }
  return masks === n ? result.reverse() : [];
};
