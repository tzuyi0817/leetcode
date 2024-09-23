/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function(scores, ages) {
    if (scores.length === 1) return scores[0];
    const team = scores.reduce((result, score, index) => {
        result.push({ score, age: ages[index] });
        return result;
    }, []);

    team.sort((a, b) => a.age - b.age || a.score - b.score);
    const dp = team.map(({ score }) => score);
    let result = 0;

    for (let a = 1; a < team.length; a++) {
        for (let b = 0; b < a; b++) {
            if (team[b].score <= team[a].score) {
                dp[a] = Math.max(dp[a], team[a].score + dp[b]);
            }
            result = Math.max(result, dp[a]);
        }
    }
    return result;
};
