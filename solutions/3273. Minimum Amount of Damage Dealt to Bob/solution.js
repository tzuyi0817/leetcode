/**
 * @param {number} power
 * @param {number[]} damage
 * @param {number[]} health
 * @return {number}
 */
const minDamage = function (power, damage, health) {
  const enemies = damage.map((value, index) => {
    const second = Math.ceil(health[index] / power);

    return { value, second };
  });

  let totalDamage = damage.reduce((total, value) => total + value);
  let result = 0;

  enemies.sort((a, b) => {
    return b.value * a.second - a.value * b.second;
  });

  for (const { value, second } of enemies) {
    result += second * totalDamage;
    totalDamage -= value;
  }

  return result;
};
