/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
const smallestSufficientTeam = function (req_skills, people) {
  const m = req_skills.length;
  const n = people.length;
  const totalSkillsMask = 1 << m;
  const dp = Array.from({ length: totalSkillsMask });
  const reqSkillMap = new Map();

  for (let index = 0; index < m; index++) {
    const skill = req_skills[index];

    reqSkillMap.set(skill, index);
  }

  const getSkillMask = skills => {
    let mask = 0;

    for (const skill of skills) {
      mask |= 1 << reqSkillMap.get(skill);
    }
    return mask;
  };

  dp[0] = [];

  for (let index = 0; index < n; index++) {
    const currentMask = getSkillMask(people[index]);

    for (let mask = 0; mask < totalSkillsMask; mask++) {
      const team = dp[mask];

      if (!team) continue;
      const newMask = mask | currentMask;

      if (mask === newMask) continue;
      const otherTeam = dp[newMask];

      if (!otherTeam || otherTeam.length > team.length + 1) {
        dp[newMask] = [...team, index];
      }
    }
  }
  return dp[totalSkillsMask - 1];
};
