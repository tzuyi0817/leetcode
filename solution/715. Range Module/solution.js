var RangeModule = function() {
    this.intervals = [];
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.addRange = function(left, right) {
    const n = this.intervals.length;
    const intervals = [];
    let index = 0;

    while (index < n && this.intervals[index].right < left) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    const interval = { left, right };

    while (index < n && this.intervals[index].left <= interval.right) {
        interval.left = Math.min(this.intervals[index].left, interval.left);
        interval.right = Math.max(this.intervals[index].right, interval.right);
        index += 1;
    }
    intervals.push(interval);

    while (index < n) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    this.intervals = intervals;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {boolean}
 */
RangeModule.prototype.queryRange = function(left, right) {
    let low = 0;
    let high = this.intervals.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const interval = this.intervals[mid];

        if (interval.left <= left && interval.right >= right) return true;

        interval.left > left ? high = mid - 1 : low = mid + 1;
    }
    return false;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.removeRange = function(left, right) {
    const n = this.intervals.length;
    const intervals = [];
    let index = 0;

    if (index < n && this.intervals[index].left > right) return;

    while (index < n && this.intervals[index].right < left) {
        intervals.push(this.intervals[index]);
        index += 1;
    }

    if (index < n && this.intervals[index].left < left) {
        const intervalFirst = { left: this.intervals[index].left, right: left };

        intervals.push(intervalFirst);

        if (this.intervals[index].right > right) {
            const intervalSecond = { left: right, right: this.intervals[index].right };

            intervals.push(intervalSecond);
        }
        index += 1;
    }

    while (index < n && this.intervals[index].right <= right) index += 1;

    if (index < n && this.intervals[index].left < right) {
        intervals.push({ left: right, right: this.intervals[index].right });
        index += 1;
    }

    while (index < n) {
        intervals.push(this.intervals[index]);
        index += 1;
    }
    this.intervals = intervals;
};

/** 
 * Your RangeModule object will be instantiated and called as such:
 * var obj = new RangeModule()
 * obj.addRange(left,right)
 * var param_2 = obj.queryRange(left,right)
 * obj.removeRange(left,right)
 */