/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
const maxActiveSectionsAfterTrade = function (s, queries) {
  const n = s.length;
  const { zeroGroups, zeroGroupIndex } = createZeroGroups(s);
  let ones = 0;

  for (let index = 0; index < n; index++) {
    const value = Number(s[index]);

    ones += value;
  }

  if (zeroGroups.length < 2) {
    return queries.map(() => ones);
  }

  const mergeZeroGroups = [];

  for (let index = 1; index < zeroGroups.length; index++) {
    const a = zeroGroups[index - 1].length;
    const b = zeroGroups[index].length;

    mergeZeroGroups.push(a + b);
  }

  const st = new SparseTable(mergeZeroGroups);

  return queries.map(([l, r]) => {
    const lIndex = zeroGroupIndex[l];
    const lGroup = zeroGroups[lIndex];
    const left = lIndex === -1 ? -1 : lGroup.length - l + lGroup.start;
    const rIndex = zeroGroupIndex[r];
    const rGroup = zeroGroups[rIndex];
    const right = rIndex === -1 ? -1 : r - rGroup.start + 1;
    const startGroupIndex = lIndex + 1;
    const endGroupIndex = s[r] === '0' ? rIndex - 1 : rIndex;
    let maxOnes = ones;

    if (s[l] === '0' && s[r] === '0' && startGroupIndex === rIndex) {
      maxOnes = Math.max(left + right + ones, maxOnes);
    } else if (startGroupIndex <= endGroupIndex - 1) {
      const maxMerge = st.query(startGroupIndex, endGroupIndex - 1);

      maxOnes = Math.max(maxMerge + ones, maxOnes);
    }

    if (s[l] === '0' && startGroupIndex <= endGroupIndex) {
      const nextGroup = zeroGroups[startGroupIndex];

      maxOnes = Math.max(left + nextGroup.length + ones, maxOnes);
    }

    if (s[r] === '0' && startGroupIndex <= endGroupIndex) {
      const prevGroup = zeroGroups[endGroupIndex];

      maxOnes = Math.max(right + prevGroup.length + ones, maxOnes);
    }

    return maxOnes;
  });
};

class SparseTable {
  constructor(nums) {
    const n = nums.length;
    const maxK = 32 - Math.clz32(n);

    this.st = Array.from({ length: maxK + 1 }, () => new Array(n).fill(0));

    for (let index = 0; index < n; index++) {
      this.st[0][index] = nums[index];
    }

    for (let log = 1; log <= maxK; log++) {
      const half = 1 << (log - 1);

      for (let index = 0; index + half < n; index++) {
        const intervalA = this.st[log - 1][index];
        const intervalB = this.st[log - 1][index + half];

        this.st[log][index] = Math.max(intervalA, intervalB);
      }
    }
  }

  query(l, r) {
    const len = r - l + 1;
    const log = 31 - Math.clz32(len);
    const half = 1 << log;

    return Math.max(this.st[log][l], this.st[log][r - half + 1]);
  }
}

function createZeroGroups(s) {
  const n = s.length;
  const zeroGroups = [];
  const zeroGroupIndex = [];

  for (let index = 0; index < n; index++) {
    if (s[index] === '0') {
      if (s[index - 1] === '0') {
        zeroGroups.at(-1).length += 1;
      } else {
        zeroGroups.push({ start: index, length: 1 });
      }
    }

    zeroGroupIndex.push(zeroGroups.length - 1);
  }

  return { zeroGroups, zeroGroupIndex };
}
