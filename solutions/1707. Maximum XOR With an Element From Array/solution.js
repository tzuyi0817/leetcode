/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const maximizeXor = function (nums, queries) {
  const m = nums.length;
  const n = queries.length;
  const indexedQueries = queries.map((query, index) => {
    const [xor, max] = query;

    return { xor, max, index };
  });

  nums.sort((a, b) => a - b);
  indexedQueries.sort((a, b) => a.max - b.max);

  const maxNum = Math.max(nums[m - 1], indexedQueries[n - 1].max);
  const trie = new BitTrie(maxNum);
  const result = Array.from({ length: n }, () => -1);
  let index = 0;

  for (const query of indexedQueries) {
    while (index < m && nums[index] <= query.max) {
      trie.insert(nums[index]);
      index += 1;
    }

    if (index) {
      result[query.index] = trie.getMaxXor(query.xor);
    }
  }

  return result;
};

class TrieNode {
  zero = null;
  one = null;
}

class BitTrie {
  root = new TrieNode();

  constructor(maxNum) {
    this.maxBit = Math.ceil(Math.log2(maxNum));
  }

  insert(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      if ((num >> index) & 1) {
        node.one = node.one ?? new TrieNode();
        node = node.one;
      } else {
        node.zero = node.zero ?? new TrieNode();
        node = node.zero;
      }
    }
  }

  getMaxXor(num) {
    let node = this.root;
    let xor = 0;

    for (let index = this.maxBit; index >= 0; index--) {
      if ((num >> index) & 1) {
        if (node.zero) {
          xor |= 1 << index;
          node = node.zero;
        } else {
          node = node.one;
        }
      } else {
        if (node.one) {
          xor |= 1 << index;
          node = node.one;
        } else {
          node = node.zero;
        }
      }
    }

    return xor;
  }
}
