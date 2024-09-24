/**
 * @param {number[]} milestones
 * @return {number}
 */
const numberOfWeeks = function (milestones) {
  const maxMilestone = Math.max(...milestones);
  const sumMilestone = milestones.reduce((sum, milestone) => sum + milestone);

  return Math.min(sumMilestone, (sumMilestone - maxMilestone) * 2 + 1);
};
