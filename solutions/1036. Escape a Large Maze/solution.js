/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
const isEscapePossible = function (blocked, source, target) {
  if (!blocked.length) return true;
  const n = 10 ** 6;
  const maxBlockedArea = blocked.length ** 2 / 2;
  const blockedSet = new Set();

  for (const [x, y] of blocked) {
    blockedSet.add(x * n + y);
  }

  const escapeMaze = ([x, y], seen, exit) => {
    if (x < 0 || y < 0 || x >= n || y >= n) return false;
    if (seen.size > maxBlockedArea) return true;
    if (exit[0] === x && exit[1] === y) return true;
    const key = x * n + y;

    if (blockedSet.has(key) || seen.has(key)) return false;
    seen.add(key);

    const right = escapeMaze([x + 1, y], seen, exit);
    const left = escapeMaze([x - 1, y], seen, exit);
    const lower = escapeMaze([x, y + 1], seen, exit);
    const upper = escapeMaze([x, y - 1], seen, exit);

    return right || left || lower || upper;
  };

  return escapeMaze(source, new Set(), target) && escapeMaze(target, new Set(), source);
};
