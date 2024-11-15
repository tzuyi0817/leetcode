# [1172. Dinner Plate Stacks](https://leetcode.com/problems/dinner-plate-stacks)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have an infinite number of stacks arranged in a row and numbered (left to right) from <code>0</code>, each of the stacks has the same maximum capacity.</p>

<p>Implement the <code>DinnerPlates</code> class:</p>

<ul>
	<li><code>DinnerPlates(int capacity)</code> Initializes the object with the maximum capacity of the stacks <code>capacity</code>.</li>
	<li><code>void push(int val)</code> Pushes the given integer <code>val</code> into the leftmost stack with a size less than <code>capacity</code>.</li>
	<li><code>int pop()</code> Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns <code>-1</code> if all the stacks are empty.</li>
	<li><code>int popAtStack(int index)</code> Returns the value at the top of the stack with the given index <code>index</code> and removes it from that stack or returns <code>-1</code> if the stack with that given index is empty.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"]
[[2], [1], [2], [3], [4], [5], [0], [20], [21], [0], [2], [], [], [], [], []]
<strong>Output</strong>
[null, null, null, null, null, null, 2, null, null, 20, 21, 5, 4, 3, 1, -1]

<strong>Explanation:</strong> 
DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈ 
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3 
                                                        ﹈ ﹈  
D.pop()            // Returns 4.  The stacks are now:   1  3 
                                                        ﹈ ﹈   
D.pop()            // Returns 3.  The stacks are now:   1 
                                                        ﹈   
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= capacity &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= val &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>0 &lt;= index &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>push</code>, <code>pop</code>, and <code>popAtStack</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(push calls)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} capacity
 */
const DinnerPlates = function (capacity) {
  this.platesStacks = [];
  this.capacity = capacity;
  this.stackQueue = new MaxPriorityQueue();
  this.notFullQueue = new MinPriorityQueue();
  this.emptyStackMemo = new Set();
};

/**
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
  if (this.notFullQueue.isEmpty()) {
    this.notFullQueue.enqueue(this.platesStacks.length);
  }
  const index = this.notFullQueue.front().element;

  if (!this.platesStacks[index]) {
    this.platesStacks[index] = [];
  }
  const stack = this.platesStacks[index];

  if (!stack.length) {
    this.stackQueue.enqueue(index);
  }
  stack.push(val);
  if (stack.length !== this.capacity) return;

  this.notFullQueue.dequeue();
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
  if (this.stackQueue.isEmpty()) return -1;

  let index = this.stackQueue.front().element;

  if (this.emptyStackMemo.has(index)) {
    this.stackQueue.dequeue();
    this.emptyStackMemo.delete(index);
    if (this.stackQueue.isEmpty()) return -1;

    index = this.stackQueue.front().element;
  }
  const stack = this.platesStacks[index];

  if (stack.length === this.capacity) {
    this.notFullQueue.enqueue(index);
  }
  const value = stack.pop();

  if (stack.length) return value;

  this.stackQueue.dequeue();
  return value;
};

/**
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
  const stack = this.platesStacks[index];

  if (!stack?.length) return -1;
  if (stack.length === this.capacity) {
    this.notFullQueue.enqueue(index);
  }
  const value = stack.pop();

  if (stack.length) return value;

  this.emptyStackMemo.add(index);
  return value;
};

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * var obj = new DinnerPlates(capacity)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAtStack(index)
 */
```
