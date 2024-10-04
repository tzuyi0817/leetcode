/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function (skill) {
  const n = skill.length;
  const totalSkill = skill.reduce((result, value) => result + value);
  const teamSkill = totalSkill / (n / 2);
  const skillMap = new Map();
  let result = 0;

  for (const value of skill) {
    const count = skillMap.get(value) ?? 0;

    skillMap.set(value, count + 1);
  }

  for (const [value, count] of skillMap) {
    const target = teamSkill - value;

    if (skillMap.get(target) !== count) return -1;

    result += value * target * count;
  }
  return result / 2;
};
