# [1467. Probability of a Two Boxes Having The Same Number of Distinct Balls](https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given <code>2n</code> balls of <code>k</code> distinct colors. You will be given an integer array <code>balls</code> of size <code>k</code> where <code>balls[i]</code> is the number of balls of color <code>i</code>.</p>

<p>All the balls will be <strong>shuffled uniformly at random</strong>, then we will distribute the first <code>n</code> balls to the first box and the remaining <code>n</code> balls to the other box (Please read the explanation of the second example carefully).</p>

<p>Please note that the two boxes are considered different. For example, if we have two balls of colors <code>a</code> and <code>b</code>, and two boxes <code>[]</code> and <code>()</code>, then the distribution <code>[a] (b)</code> is considered different than the distribution <code>[b] (a) </code>(Please read the explanation of the first example carefully).</p>

<p>Return<em> the probability</em> that the two boxes have the same number of distinct balls. Answers within <code>10<sup>-5</sup></code> of the actual value will be accepted as correct.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> balls = [1,1]
<strong>Output:</strong> 1.00000
<strong>Explanation:</strong> Only 2 ways to divide the balls equally:
- A ball of color 1 to box 1 and a ball of color 2 to box 2
- A ball of color 2 to box 1 and a ball of color 1 to box 2
In both ways, the number of distinct colors in each box is equal. The probability is 2/2 = 1
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> balls = [2,1,1]
<strong>Output:</strong> 0.66667
<strong>Explanation:</strong> We have the set of balls [1, 1, 2, 3]
This set of balls will be shuffled randomly and we may have one of the 12 distinct shuffles with equal probability (i.e. 1/12):
[1,1 / 2,3], [1,1 / 3,2], [1,2 / 1,3], [1,2 / 3,1], [1,3 / 1,2], [1,3 / 2,1], [2,1 / 1,3], [2,1 / 3,1], [2,3 / 1,1], [3,1 / 1,2], [3,1 / 2,1], [3,2 / 1,1]
After that, we add the first two balls to the first box and the second two balls to the second box.
We can see that 8 of these 12 possible random distributions have the same number of distinct colors of balls in each box.
Probability is 8/12 = 0.66667
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> balls = [1,2,1,2]
<strong>Output:</strong> 0.60000
<strong>Explanation:</strong> The set of balls is [1, 2, 2, 3, 4, 4]. It is hard to display all the 180 possible random shuffles of this set but it is easy to check that 108 of them will have the same number of distinct colors in each box.
Probability = 108 / 180 = 0.6
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= balls.length &lt;= 8</code></li>
	<li><code>1 &lt;= balls[i] &lt;= 6</code></li>
	<li><code>sum(balls)</code> is even.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O((n/k)<sup>k</sup>)</em>
- Space complexity: <em>O(k+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} balls
 * @return {number}
 */
const getProbability = function (balls) {
  const k = balls.length;
  const n = balls.reduce((result, ball) => result + ball) / 2;
  const factorialMemo = [1, 1];

  const factorial = n => {
    if (factorialMemo[n]) return factorialMemo[n];

    factorialMemo[n] = n * factorial(n - 1);

    return factorialMemo[n];
  };

  const distributeBall = (index, count1, count2, colors1, colors2, equal) => {
    if (count1 > n || count2 > n) return 0;
    if (index === k) {
      return equal ? colors1 === colors2 : 1;
    }
    let result = 0;

    for (let a = 0; a <= balls[index]; a++) {
      const b = balls[index] - a;
      const nextCount1 = count1 + a;
      const nextCount2 = count2 + b;
      const nextColors1 = colors1 + (a ? 1 : 0);
      const nextColors2 = colors2 + (b ? 1 : 0);
      const total = distributeBall(index + 1, nextCount1, nextCount2, nextColors1, nextColors2, equal);

      result += total / (factorial(a) * factorial(b));
    }

    return result;
  };

  return distributeBall(0, 0, 0, 0, 0, true) / distributeBall(0, 0, 0, 0, 0);
};
```
