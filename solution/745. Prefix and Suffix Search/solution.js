/**
 * @param {string[]} words
 */
var WordFilter = function(words) {
    this.trie = new Map();

    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let prefix = '';

        for (let left = 0; left < word.length; left++) {
            let current = this.trie;

            prefix += word[left];

            if (!current.has(prefix)) {
               current.set(prefix, new Map()); 
            }
            current = current.get(prefix);

            for (let right = 0; right < word.length; right++) {
                const suffix = word.slice(right);

                current.set(suffix, index);
            }
        }
    }
};

/** 
 * @param {string} pref 
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function(pref, suff) {
    if (!this.trie.has(pref)) return -1;

    const current = this.trie.get(pref);

    return current.get(suff) ?? -1;
};

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */