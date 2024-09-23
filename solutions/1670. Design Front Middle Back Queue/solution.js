var FrontMiddleBackQueue = function() {
    this.leftQueue = [];
    this.rightQueue = [];
};

FrontMiddleBackQueue.prototype.balanceQueue = function() {
    const leftSize = this.leftQueue.length;
    const rightSize = this.rightQueue.length

    if (leftSize > rightSize) {
        this.rightQueue.unshift(this.leftQueue.pop());
    } else if (leftSize + 1 === rightSize - 1) {
        this.leftQueue.push(this.rightQueue.shift());
    }
}

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function(val) {
    this.leftQueue.unshift(val);
    this.balanceQueue();
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
    this.leftQueue.length === this.rightQueue.length
        ? this.rightQueue.unshift(val)
        : this.leftQueue.push(val);
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function(val) {
    this.rightQueue.push(val);
    this.balanceQueue();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function() {
    if (!this.leftQueue.length) {
        return this.rightQueue.shift() ?? -1;
    }
    const val = this.leftQueue.shift();

    this.balanceQueue();
    return val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function() {
    return this.leftQueue.length === this.rightQueue.length
        ? this.leftQueue.pop() ?? -1
        : this.rightQueue.shift();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function() {
    const val = this.rightQueue.pop();

    this.balanceQueue();
    return val ?? -1;
};

/** 
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */
