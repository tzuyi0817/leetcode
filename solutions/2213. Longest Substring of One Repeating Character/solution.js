/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
const longestRepeating = function (s, queryCharacters, queryIndices) {
  const n = queryCharacters.length;
  const tree = new SegmentTree(s);
  const result = [];

  for (let index = 0; index < n; index++) {
    tree.update(queryCharacters[index], queryIndices[index]);
    result.push(tree.getLongestRepeating());
  }

  return result;
};

class TreeNode {
  constructor(l, r, maxChar, prefixChar, suffixChar, maxLength, prefixLength, suffixLength, left = null, right = null) {
    this.l = l;
    this.r = r;
    this.maxChar = maxChar;
    this.prefixChar = prefixChar;
    this.suffixChar = suffixChar;
    this.maxLength = maxLength;
    this.prefixLength = prefixLength;
    this.suffixLength = suffixLength;
    this.left = left;
    this.right = right;
  }
}

class SegmentTree {
  constructor(s) {
    this.root = this.build(s, 0, s.length - 1);
  }

  build(s, l, r) {
    if (l === r) {
      return new TreeNode(l, r, s[l], s[l], s[l], 1, 1, 1);
    }

    const mid = Math.floor((l + r) / 2);
    const left = this.build(s, l, mid);
    const right = this.build(s, mid + 1, r);

    return this.merge(left, right);
  }

  merge(left, right) {
    let maxLength = 0;
    let maxChar = '';
    const prefixChar = left.prefixChar;
    let prefixLength = left.prefixLength;
    const suffixChar = right.suffixChar;
    let suffixLength = right.suffixLength;

    if (left.maxLength > right.maxLength) {
      maxLength = left.maxLength;
      maxChar = left.maxChar;
    } else {
      maxLength = right.maxLength;
      maxChar = right.maxChar;
    }

    if (left.suffixChar === right.prefixChar && left.suffixLength + right.prefixLength > maxLength) {
      maxLength = left.suffixLength + right.prefixLength;
      maxChar = left.maxChar;
    }

    if (prefixChar === right.prefixChar && left.l + prefixLength === right.l) {
      prefixLength += right.prefixLength;
    }

    if (suffixChar === left.suffixChar && right.r - suffixLength === left.r) {
      suffixLength += left.suffixLength;
    }

    return new TreeNode(
      left.l,
      right.r,
      maxChar,
      prefixChar,
      suffixChar,
      maxLength,
      prefixLength,
      suffixLength,
      left,
      right,
    );
  }

  update(char, index) {
    this.root = this._update(this.root, char, index);
  }

  _update(root, char, index) {
    if (root.l === index && root.r === index) {
      root.maxChar = char;
      root.prefixChar = char;
      root.suffixChar = char;
      root.maxLength = 1;
      root.prefixLength = 1;
      root.suffixLength = 1;

      return root;
    }

    const mid = Math.floor((root.l + root.r) / 2);

    if (index <= mid) {
      const left = this._update(root.left, char, index);

      return this.merge(left, root.right);
    } else {
      const right = this._update(root.right, char, index);

      return this.merge(root.left, right);
    }
  }

  getLongestRepeating() {
    return this.root.maxLength;
  }
}
