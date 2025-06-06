# [1993. Operations on Tree](https://leetcode.com/problems/operations-on-tree)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a tree with <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code> in the form of a parent array <code>parent</code> where <code>parent[i]</code> is the parent of the <code>i<sup>th</sup></code> node. The root of the tree is node <code>0</code>, so <code>parent[0] = -1</code> since it has no parent. You want to design a data structure that allows users to lock, unlock, and upgrade nodes in the tree.</p>

<p>The data structure should support the following functions:</p>

<ul>
	<li><strong>Lock:</strong> <strong>Locks</strong> the given node for the given user and prevents other users from locking the same node. You may only lock a node using this function if the node is unlocked.</li>
	<li><strong>Unlock: Unlocks</strong> the given node for the given user. You may only unlock a node using this function if it is currently locked by the same user.</li>
	<li><b>Upgrade</b><strong>: Locks</strong> the given node for the given user and <strong>unlocks</strong> all of its descendants <strong>regardless</strong> of who locked it. You may only upgrade a node if <strong>all</strong> 3 conditions are true:
	<ul>
		<li>The node is unlocked,</li>
		<li>It has at least one locked descendant (by <strong>any</strong> user), and</li>
		<li>It does not have any locked ancestors.</li>
	</ul>
	</li>
</ul>

<p>Implement the <code>LockingTree</code> class:</p>

<ul>
	<li><code>LockingTree(int[] parent)</code> initializes the data structure with the parent array.</li>
	<li><code>lock(int num, int user)</code> returns <code>true</code> if it is possible for the user with id <code>user</code> to lock the node <code>num</code>, or <code>false</code> otherwise. If it is possible, the node <code>num</code> will become<strong> locked</strong> by the user with id <code>user</code>.</li>
	<li><code>unlock(int num, int user)</code> returns <code>true</code> if it is possible for the user with id <code>user</code> to unlock the node <code>num</code>, or <code>false</code> otherwise. If it is possible, the node <code>num</code> will become <strong>unlocked</strong>.</li>
	<li><code>upgrade(int num, int user)</code> returns <code>true</code> if it is possible for the user with id <code>user</code> to upgrade the node <code>num</code>, or <code>false</code> otherwise. If it is possible, the node <code>num</code> will be <strong>upgraded</strong>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/29/untitled.png" style="width: 375px; height: 246px;">
<pre><strong>Input</strong>
["LockingTree", "lock", "unlock", "unlock", "lock", "upgrade", "lock"]
[[[-1, 0, 0, 1, 1, 2, 2]], [2, 2], [2, 3], [2, 2], [4, 5], [0, 1], [0, 1]]
<strong>Output</strong>
[null, true, false, true, true, true, false]

<strong>Explanation</strong>
LockingTree lockingTree = new LockingTree([-1, 0, 0, 1, 1, 2, 2]);
lockingTree.lock(2, 2); // return true because node 2 is unlocked.
// Node 2 will now be locked by user 2.
lockingTree.unlock(2, 3); // return false because user 3 cannot unlock a node locked by user 2.
lockingTree.unlock(2, 2); // return true because node 2 was previously locked by user 2.
// Node 2 will now be unlocked.
lockingTree.lock(4, 5); // return true because node 4 is unlocked.
// Node 4 will now be locked by user 5.
lockingTree.upgrade(0, 1); // return true because node 0 is unlocked and has at least one locked descendant (node 4).
// Node 0 will now be locked by user 1 and node 4 will now be unlocked.
lockingTree.lock(0, 1); // return false because node 0 is already locked.

</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == parent.length</code></li>
	<li><code>2 &lt;= n &lt;= 2000</code></li>
	<li><code>0 &lt;= parent[i] &lt;= n - 1</code> for <code>i != 0</code></li>
	<li><code>parent[0] == -1</code></li>
	<li><code>0 &lt;= num &lt;= n - 1</code></li>
	<li><code>1 &lt;= user &lt;= 10<sup>4</sup></code></li>
	<li><code>parent</code> represents a valid tree.</li>
	<li>At most <code>2000</code> calls <strong>in total</strong> will be made to <code>lock</code>, <code>unlock</code>, and <code>upgrade</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
