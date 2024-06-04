
var RandomizedCollection = function() {
    this.collectionMap = new Map();
    this.collects = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    const indexes = this.collectionMap.get(val) ?? new Set();
    const isPresent = indexes.size > 0;

    indexes.add(this.collects.length);
    this.collects.push(val);
    if (!isPresent) {
        this.collectionMap.set(val, indexes);
    }
    return !isPresent;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    const indexes = this.collectionMap.get(val);

    if (!indexes || !indexes.size) return false;
    const index = indexes.values().next().value;

    indexes.delete(index);
    if (index !== this.collects.length - 1) {
        const lastIndex = this.collects.length - 1;
        const last = this.collects[lastIndex];
        const lastIndexes = this.collectionMap.get(last);

        [this.collects[index], this.collects[lastIndex]] = [this.collects[lastIndex], this.collects[index]];
        lastIndexes.add(index).delete(lastIndex);
    }
    this.collects.pop();
    return true;
};

/**
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
    const random = Math.floor(Math.random() * this.collects.length);

    return this.collects[random];
};

/** 
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */