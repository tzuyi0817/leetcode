# [3408. Design Task Manager](https://leetcode.com/problems/design-task-manager)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.</p>

<p>Implement the <code>TaskManager</code> class:</p>

<ul>
	<li>
	<p><code>TaskManager(vector&lt;vector&lt;int&gt;&gt;&amp; tasks)</code> initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form <code>[userId, taskId, priority]</code>, which adds a task to the specified user with the given priority.</p>
	</li>
	<li>
	<p><code>void add(int userId, int taskId, int priority)</code> adds a task with the specified <code>taskId</code> and <code>priority</code> to the user with <code>userId</code>. It is <strong>guaranteed</strong> that <code>taskId</code> does not <em>exist</em> in the system.</p>
	</li>
	<li>
	<p><code>void edit(int taskId, int newPriority)</code> updates the priority of the existing <code>taskId</code> to <code>newPriority</code>. It is <strong>guaranteed</strong> that <code>taskId</code> <em>exists</em> in the system.</p>
	</li>
	<li>
	<p><code>void rmv(int taskId)</code> removes the task identified by <code>taskId</code> from the system. It is <strong>guaranteed</strong> that <code>taskId</code> <em>exists</em> in the system.</p>
	</li>
	<li>
	<p><code>int execTop()</code> executes the task with the <strong>highest</strong> priority across all users. If there are multiple tasks with the same <strong>highest</strong> priority, execute the one with the highest <code>taskId</code>. After executing, the<strong> </strong><code>taskId</code><strong> </strong>is <strong>removed</strong> from the system. Return the <code>userId</code> associated with the executed task. If no tasks are available, return -1.</p>
	</li>
</ul>

<p><strong>Note</strong> that a user may be assigned multiple tasks.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong><br>
<span class="example-io">["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]<br>
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]</span></p>

<p><strong>Output:</strong><br>
<span class="example-io">[null, null, null, 3, null, null, 5] </span></p>

<p><strong>Explanation</strong></p>
TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.<br>
taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.<br>
taskManager.edit(102, 8); // Updates priority of task 102 to 8.<br>
taskManager.execTop(); // return 3. Executes task 103 for User 3.<br>
taskManager.rmv(101); // Removes task 101 from the system.<br>
taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.<br>
taskManager.execTop(); // return 5. Executes task 105 for User 5.</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= tasks.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= userId &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= taskId &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= priority &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= newPriority &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>2 * 10<sup>5</sup></code> calls will be made in <strong>total</strong> to <code>add</code>, <code>edit</code>, <code>rmv</code>, and <code>execTop</code> methods.</li>
	<li>The input is generated such that <code>taskId</code> will be valid.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} tasks
 */
const TaskManager = function (tasks) {
  this.taskMap = new Map();
  this.taskHeap = new PriorityQueue((a, b) => {
    return b.priority - a.priority || b.taskId - a.taskId;
  });

  for (const [userId, taskId, priority] of tasks) {
    this.taskMap.set(taskId, { userId, priority });
    this.taskHeap.enqueue({ userId, taskId, priority });
  }
};

/**
 * @param {number} userId
 * @param {number} taskId
 * @param {number} priority
 * @return {void}
 */
TaskManager.prototype.add = function (userId, taskId, priority) {
  this.taskMap.set(taskId, { userId, priority });
  this.taskHeap.enqueue({ userId, taskId, priority });
};

/**
 * @param {number} taskId
 * @param {number} newPriority
 * @return {void}
 */
TaskManager.prototype.edit = function (taskId, newPriority) {
  const task = this.taskMap.get(taskId);

  task.priority = newPriority;
  this.taskHeap.enqueue({ userId: task.userId, taskId, priority: newPriority });
};

/**
 * @param {number} taskId
 * @return {void}
 */
TaskManager.prototype.rmv = function (taskId) {
  this.taskMap.delete(taskId);
};

/**
 * @return {number}
 */
TaskManager.prototype.execTop = function () {
  while (this.taskHeap.size()) {
    const { userId, taskId, priority } = this.taskHeap.dequeue();
    const task = this.taskMap.get(taskId);

    if (task && userId === task.userId && priority === task.priority) {
      this.taskMap.delete(taskId);

      return userId;
    }
  }

  return -1;
};

/**
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */
```
