/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
const maxAverageRatio = function (classes, extraStudents) {
  const n = classes.length;
  const maxHeap = new MaxPriorityQueue(({ additionRatio }) => additionRatio);
  let totalRatio = 0;

  const enqueue = (pass, total) => {
    const ratio = pass / total;
    const assignRatio = (pass + 1) / (total + 1);

    maxHeap.enqueue({ pass, total, additionRatio: assignRatio - ratio });
  };

  for (const [pass, total] of classes) {
    enqueue(pass, total);
  }

  while (extraStudents) {
    const { pass, total } = maxHeap.dequeue();

    enqueue(pass + 1, total + 1);
    extraStudents -= 1;
  }

  while (maxHeap.size()) {
    const { pass, total } = maxHeap.dequeue();

    totalRatio += pass / total;
  }

  return totalRatio / n;
};
