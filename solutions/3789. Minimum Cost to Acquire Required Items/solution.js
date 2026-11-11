/**
 * @param {number} cost1
 * @param {number} cost2
 * @param {number} costBoth
 * @param {number} need1
 * @param {number} need2
 * @return {number}
 */
const minimumCost = function (cost1, cost2, costBoth, need1, need2) {
  if (!need1) {
    const cost = Math.min(cost2, costBoth);

    return cost * need2;
  }

  if (!need2) {
    const cost = Math.min(cost1, costBoth);

    return cost * need1;
  }

  if (cost1 >= costBoth && cost2 >= costBoth) {
    const need = Math.max(need1, need2);

    return costBoth * need;
  }

  if (costBoth <= cost1) {
    const remainNeed2 = Math.max(0, need2 - need1);

    return costBoth * need1 + cost2 * remainNeed2;
  }

  if (costBoth <= cost2) {
    const remainNeed1 = Math.max(0, need1 - need2);

    return costBoth * need2 + cost1 * remainNeed1;
  }

  if (costBoth <= cost1 + cost2) {
    const needBoth = Math.min(need1, need2);
    const both = costBoth * needBoth;
    const remainCost1 = (need1 - needBoth) * cost1;
    const remainCost2 = (need2 - needBoth) * cost2;

    return both + remainCost1 + remainCost2;
  }

  return need1 * cost1 + need2 * cost2;
};
