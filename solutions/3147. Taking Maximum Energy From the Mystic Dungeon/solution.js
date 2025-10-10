/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
const maximumEnergy = function (energy, k) {
  const n = energy.length;
  const prevMaxEnergy = energy.slice(0, k);

  for (let index = k; index < n; index++) {
    const current = energy[index];
    const pos = index % k;
    const prevEnergy = prevMaxEnergy[pos];
    const maxEnergy = Math.max(prevEnergy + current, current);

    prevMaxEnergy[pos] = maxEnergy;
  }

  return Math.max(...prevMaxEnergy);
};
