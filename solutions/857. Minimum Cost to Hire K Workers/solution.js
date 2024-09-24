/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */
const mincostToHireWorkers = function (quality, wage, k) {
  const n = quality.length;
  const workers = quality.map((q, index) => {
    return { perQualityWage: wage[index] / q, quality: q };
  });

  workers.sort((a, b) => a.perQualityWage - b.perQualityWage);

  const qualities = new MaxPriorityQueue();

  let currentTotalQuality = 0;

  for (let index = 0; index < k; index++) {
    const { quality } = workers[index];

    qualities.enqueue(quality);
    currentTotalQuality += quality;
  }
  let result = currentTotalQuality * workers[k - 1].perQualityWage;

  for (let index = k; index < n; index++) {
    const worker = workers[index];
    const maxQuality = qualities.front().element;

    if (maxQuality > worker.quality) {
      qualities.dequeue();
      qualities.enqueue(worker.quality);
      currentTotalQuality += worker.quality - maxQuality;
    }
    const totalWage = currentTotalQuality * worker.perQualityWage;

    result = Math.min(totalWage, result);
  }
  return result;
};
