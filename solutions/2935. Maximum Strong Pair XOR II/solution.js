/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumStrongPairXor = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxBit = 32 - Math.clz32(maxNum);
  const trie = new Trie(maxBit);
  let left = 0;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (left < index && nums[left] < num - nums[left]) {
      trie.remove(nums[left]);
      left += 1;
    }

    trie.insert(num);

    const xor = trie.getMaxXor(num);

    result = Math.max(xor, result);
  }

  return result;
};

class TrieNode {
  children = [null, null];
  count = 0;
}

class Trie {
  constructor(bit) {
    this.maxBit = bit;
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!node.children[bit]) {
        node.children[bit] = new TrieNode();
      }

      node = node.children[bit];
      node.count += 1;
    }
  }

  remove(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;

      node = node.children[bit];
      node.count -= 1;
    }
  }

  getMaxXor(num) {
    let maxXor = 0;
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;
      const toggleBit = bit ^ 1;
      const { children } = node;

      if (!children[toggleBit] && !children[bit]) return 0;

      if (children[toggleBit] && children[toggleBit].count) {
        maxXor |= 1 << index;
        node = children[toggleBit];
      } else {
        node = children[bit];
      }
    }

    return maxXor;
  }
}
