/**
 * @param {number} n
 * @param {number[]} blacklist
 */
const Solution = function (n, blacklist) {
  let current = n - 1;

  this.boundary = n - blacklist.length;
  this.blacklistMap = new Map();

  for (const num of blacklist) {
    this.blacklistMap.set(num, -1);
  }

  for (const num of blacklist) {
    if (num >= this.boundary) continue;

    while (this.blacklistMap.has(current)) current -= 1;
    this.blacklistMap.set(num, current);
    current -= 1;
  }
};

/**
 * @return {number}
 */
Solution.prototype.pick = function () {
  const random = Math.floor(Math.random() * this.boundary);

  return this.blacklistMap.get(random) ?? random;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
