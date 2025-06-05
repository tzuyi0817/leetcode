/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
const smallestEquivalentString = function (s1, s2, baseStr) {
  const n = s1.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const uf = new UnionFind();
  const result = [];

  for (let index = 0; index < n; index++) {
    const codeA = s1[index].charCodeAt(0) - BASE_CODE;
    const codeB = s2[index].charCodeAt(0) - BASE_CODE;

    uf.union(codeA, codeB);
  }

  for (const letter of baseStr) {
    const code = letter.charCodeAt(0) - BASE_CODE;
    const smallestLetter = String.fromCharCode(uf.find(code) + BASE_CODE);

    result.push(smallestLetter);
  }

  return result.join('');
};

class UnionFind {
  constructor() {
    this.groups = Array.from({ length: 26 }, (_, index) => index);
  }

  find(node) {
    if (this.groups[node] === node) return node;

    this.groups[node] = this.find(this.groups[node]);

    return this.groups[node];
  }

  union(a, b) {
    const groupA = this.find(a);
    const groupB = this.find(b);

    if (groupA === groupB) return;
    if (groupA > groupB) {
      this.groups[groupA] = groupB;
    } else {
      this.groups[groupB] = groupA;
    }
  }
}
