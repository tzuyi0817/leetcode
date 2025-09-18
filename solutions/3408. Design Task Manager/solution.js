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
