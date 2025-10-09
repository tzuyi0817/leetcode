/**
 * @param {number[]} skill
 * @param {number[]} mana
 * @return {number}
 */
const minTime = function (skill, mana) {
  const n = skill.length;
  const m = mana.length;
  const sumSkill = skill.reduce((result, s) => result + s);
  let prevWizardDone = sumSkill * mana[0];

  for (let index = 1; index < m; index++) {
    let prevPotionDone = prevWizardDone;

    for (let wizard = n - 2; wizard >= 0; wizard--) {
      const time = skill[wizard] * mana[index];

      prevPotionDone -= skill[wizard + 1] * mana[index - 1];
      prevWizardDone = Math.max(prevPotionDone, prevWizardDone - time);
    }

    prevWizardDone += sumSkill * mana[index];
  }

  return prevWizardDone;
};
