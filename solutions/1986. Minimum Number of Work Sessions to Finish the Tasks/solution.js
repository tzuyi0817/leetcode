/**
 * @param {number[]} tasks
 * @param {number} sessionTime
 * @return {number}
 */
const minSessions = function (tasks, sessionTime) {
  const size = tasks.length;
  const isCompleteTasks = (sessions, task = 0) => {
    if (task >= size) return true;
    const time = tasks[task];

    for (let index = 0; index < sessions.length; index++) {
      if (sessions[index] + time > sessionTime) continue;
      sessions[index] += time;
      if (isCompleteTasks(sessions, task + 1)) return true;
      sessions[index] -= time;
      if (sessions[index] === 0) return false;
    }
    return false;
  };

  for (let workSession = 1; workSession <= size; workSession++) {
    const sessions = new Array(workSession).fill(0);

    if (isCompleteTasks(sessions)) return workSession;
  }
  return 0;
};
