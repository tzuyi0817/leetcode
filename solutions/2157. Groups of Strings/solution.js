/**
 * @param {string[]} words
 * @return {number[]}
 */
const groupStrings = function (words) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = words.length;
  const uf = new UnionFind(n);
  const maskMap = new Map();
  const deleteMaskMap = new Map();

  const getMask = word => {
    let mask = 0;

    for (const char of word) {
      const code = char.charCodeAt(0) - BASE_CODE;

      mask |= 1 << code;
    }

    return mask;
  };

  for (let index = 0; index < n; index++) {
    const mask = getMask(words[index]);

    for (let code = 0; code < 26; code++) {
      if ((mask >> code) & 1) {
        const newMask = mask ^ (1 << code);

        if (maskMap.has(newMask)) {
          uf.union(maskMap.get(newMask), index);
        }

        if (deleteMaskMap.has(newMask)) {
          uf.union(deleteMaskMap.get(newMask), index);
        } else {
          deleteMaskMap.set(newMask, index);
        }
      } else {
        const newMask = mask | (1 << code);

        if (maskMap.has(newMask)) {
          uf.union(maskMap.get(newMask), index);
        }
      }
    }

    maskMap.set(mask, index);
  }

  return [uf.count, uf.maxSize];
};

class UnionFind {
  constructor(n) {
    this.count = n;
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.sizes = Array.from({ length: n }, () => 1);
  }

  get maxSize() {
    return Math.max(...this.sizes);
  }

  find(x) {
    if (this.groups[x] === x) return x;

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(u, v) {
    const groupU = this.find(u);
    const groupV = this.find(v);

    if (groupU === groupV) return;
    if (this.sizes[groupU] < this.sizes[groupV]) {
      this.groups[groupU] = groupV;
      this.sizes[groupV] += this.sizes[groupU];
    } else {
      this.groups[groupV] = groupU;
      this.sizes[groupU] += this.sizes[groupV];
    }

    this.count -= 1;
  }
}
