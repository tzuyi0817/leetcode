# [1125. Smallest Sufficient Team](https://leetcode.com/problems/smallest-sufficient-team)

## Description

<div class="elfjS" data-track-load="description_content"><p>In a project, you have a list of required skills <code>req_skills</code>, and a list of people. The <code>i<sup>th</sup></code> person <code>people[i]</code> contains a list of skills that the person has.</p>

<p>Consider a sufficient team: a set of people such that for every required skill in <code>req_skills</code>, there is at least one person in the team who has that skill. We can represent these teams by the index of each person.</p>

<ul>
	<li>For example, <code>team = [0, 1, 3]</code> represents the people with skills <code>people[0]</code>, <code>people[1]</code>, and <code>people[3]</code>.</li>
</ul>

<p>Return <em>any sufficient team of the smallest possible size, represented by the index of each person</em>. You may return the answer in <strong>any order</strong>.</p>

<p>It is <strong>guaranteed</strong> an answer exists.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
<strong>Output:</strong> [0,2]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
<strong>Output:</strong> [1,2]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= req_skills.length &lt;= 16</code></li>
	<li><code>1 &lt;= req_skills[i].length &lt;= 16</code></li>
	<li><code>req_skills[i]</code> consists of lowercase English letters.</li>
	<li>All the strings of <code>req_skills</code> are <strong>unique</strong>.</li>
	<li><code>1 &lt;= people.length &lt;= 60</code></li>
	<li><code>0 &lt;= people[i].length &lt;= 16</code></li>
	<li><code>1 &lt;= people[i][j].length &lt;= 16</code></li>
	<li><code>people[i][j]</code> consists of lowercase English letters.</li>
	<li>All the strings of <code>people[i]</code> are <strong>unique</strong>.</li>
	<li>Every skill in <code>people[i]</code> is a skill in <code>req_skills</code>.</li>
	<li>It is guaranteed a sufficient team exists.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(n\*2<sup>m</sup>)</em>
- Space complexity: <em>O(2<sup>m</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
