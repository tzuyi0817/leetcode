/**
 * @param {number[]} parent
 */
const LockingTree = function (parent) {
  this.parent = parent;
  this.lockMap = new Map();
  this.relativeMap = new Map();

  for (const [node, ancestor] of parent.entries()) {
    const descendants = this.relativeMap.get(ancestor) ?? [];

    descendants.push(node);
    this.lockMap.set(node, { user: null, locked: false });
    this.relativeMap.set(ancestor, descendants);
  }
};

/**
 * @param {number} num
 * @param {number} user
 * @return {boolean}
 */
LockingTree.prototype.lock = function (num, user) {
  if (this.isLocked(num)) return false;
  this.lockMap.set(num, { user, locked: true });
  return true;
};

/**
 * @param {number} num
 * @param {number} user
 * @return {boolean}
 */
LockingTree.prototype.unlock = function (num, user) {
  const { user: id, locked } = this.lockMap.get(num);

  if (!locked || (locked && id !== user)) return false;
  this.lockMap.set(num, { user: null, locked: false });
  return true;
};

/**
 * @param {number} num
 * @param {number} user
 * @return {boolean}
 */
LockingTree.prototype.upgrade = function (num, user) {
  if (this.isLocked(num)) return false;
  const isDescendantLocked = this.checkDescendants(num);

  if (!isDescendantLocked) return false;
  let ancestor = this.parent[num];

  while (ancestor > -1) {
    if (this.isLocked(ancestor)) return false;
    ancestor = this.parent[ancestor];
  }
  this.unlockDescendants(num);
  this.lockMap.set(num, { user, locked: true });
  return true;
};

LockingTree.prototype.isLocked = function (num) {
  return this.lockMap.get(num).locked;
};

LockingTree.prototype.checkDescendants = function (num) {
  if (this.isLocked(num)) return true;
  const descendants = this.relativeMap.get(num) ?? [];

  for (const descendant of descendants) {
    if (this.checkDescendants(descendant)) return true;
  }
  return false;
};

LockingTree.prototype.unlockDescendants = function (num) {
  const descendants = this.relativeMap.get(num) ?? [];

  for (const descendant of descendants) {
    this.unlockDescendants(descendant);
  }
  if (!this.isLocked(num)) return;
  this.lockMap.set(num, { user: null, locked: false });
};

/**
 * Your LockingTree object will be instantiated and called as such:
 * var obj = new LockingTree(parent)
 * var param_1 = obj.lock(num,user)
 * var param_2 = obj.unlock(num,user)
 * var param_3 = obj.upgrade(num,user)
 */
