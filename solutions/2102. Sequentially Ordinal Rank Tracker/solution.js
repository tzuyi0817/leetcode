const SORTracker = function () {
  this.readHeap = new PriorityQueue((a, b) => {
    return a.score - b.score || b.name.localeCompare(a.name);
  });
  this.unreadHeap = new PriorityQueue((a, b) => {
    return b.score - a.score || a.name.localeCompare(b.name);
  });
};

/**
 * @param {string} name
 * @param {number} score
 * @return {void}
 */
SORTracker.prototype.add = function (name, score) {
  const read = this.readHeap.front();

  if (read && (score > read.score || (score === read.score && name.localeCompare(read.name) < 0))) {
    this.unreadHeap.enqueue(this.readHeap.dequeue());
    this.readHeap.enqueue({ name, score });
  } else {
    this.unreadHeap.enqueue({ name, score });
  }
};

/**
 * @return {string}
 */
SORTracker.prototype.get = function () {
  const unread = this.unreadHeap.dequeue();

  this.readHeap.enqueue(unread);

  return unread.name;
};

/**
 * Your SORTracker object will be instantiated and called as such:
 * var obj = new SORTracker()
 * obj.add(name,score)
 * var param_2 = obj.get()
 */
