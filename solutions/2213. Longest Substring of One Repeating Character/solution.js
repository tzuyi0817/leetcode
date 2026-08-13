/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
const longestRepeating = function (s, queryCharacters, queryIndices) {
  const tree = new SegmentTree(s);

  return queryIndices.map((queryIndex, index) => {
    const char = queryCharacters[index];

    tree.update(char, queryIndex);

    return tree.getLongestRepeating();
  });
};

class TreeNode {
  constructor({ l, r, prefixChar, suffixChar, prefixLen, suffixLen, maxLen, leftNode = null, rightNode = null }) {
    this.l = l;
    this.r = r;
    this.prefixChar = prefixChar;
    this.suffixChar = suffixChar;
    this.prefixLen = prefixLen;
    this.suffixLen = suffixLen;
    this.maxLen = maxLen;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class SegmentTree {
  constructor(s) {
    this.root = this.#build(s, 0, s.length - 1);
  }

  #build(s, l, r) {
    if (l === r) {
      return new TreeNode({
        l,
        r,
        prefixChar: s[l],
        suffixChar: s[l],
        prefixLen: 1,
        suffixLen: 1,
        maxLen: 1,
      });
    }

    const mid = Math.floor((l + r) / 2);
    const leftNode = this.#build(s, l, mid);
    const rightNode = this.#build(s, mid + 1, r);

    return this.#merge(leftNode, rightNode);
  }

  #merge(left, right) {
    const prefixChar = left.prefixChar;
    const suffixChar = right.suffixChar;
    let prefixLen = left.prefixLen;
    let suffixLen = right.suffixLen;
    let maxLen = Math.max(left.maxLen, right.maxLen);

    if (left.suffixChar === right.prefixChar) {
      const len = left.suffixLen + right.prefixLen;

      maxLen = Math.max(maxLen, len);
    }

    if (prefixChar === right.prefixChar && left.l + prefixLen === right.l) {
      prefixLen += right.prefixLen;
    }

    if (suffixChar === left.suffixChar && right.r - suffixLen === left.r) {
      suffixLen += left.suffixLen;
    }

    return new TreeNode({
      l: left.l,
      r: right.r,
      prefixChar,
      suffixChar,
      prefixLen,
      suffixLen,
      maxLen,
      leftNode: left,
      rightNode: right,
    });
  }

  update(char, index) {
    this.root = this.#update(char, index, this.root);
  }

  #update(char, index, node) {
    if (node.l === index && node.r === index) {
      node.prefixChar = char;
      node.suffixChar = char;

      return node;
    }

    const mid = Math.floor((node.l + node.r) / 2);

    if (index <= mid) {
      const left = this.#update(char, index, node.leftNode);

      return this.#merge(left, node.rightNode);
    } else {
      const right = this.#update(char, index, node.rightNode);

      return this.#merge(node.leftNode, right);
    }
  }

  getLongestRepeating() {
    return this.root.maxLen;
  }
}
