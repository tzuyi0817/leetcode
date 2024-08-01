# [818. Race Car](https://leetcode.com/problems/race-car)

## Description

<div class="elfjS" data-track-load="description_content"><p>Your car starts at position <code>0</code> and speed <code>+1</code> on an infinite number line. Your car can go into negative positions. Your car drives automatically according to a sequence of instructions <code>'A'</code> (accelerate) and <code>'R'</code> (reverse):</p>

<ul>
	<li>When you get an instruction <code>'A'</code>, your car does the following:
	<ul>
		<li><code>position += speed</code></li>
		<li><code>speed *= 2</code></li>
	</ul>
	</li>
	<li>When you get an instruction <code>'R'</code>, your car does the following:
	<ul>
		<li>If your speed is positive then <code>speed = -1</code></li>
		<li>otherwise <code>speed = 1</code></li>
	</ul>
	Your position stays the same.</li>
</ul>

<p>For example, after commands <code>"AAR"</code>, your car goes to positions <code>0 --&gt; 1 --&gt; 3 --&gt; 3</code>, and your speed goes to <code>1 --&gt; 2 --&gt; 4 --&gt; -1</code>.</p>

<p>Given a target position <code>target</code>, return <em>the length of the shortest sequence of instructions to get there</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> target = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> 
The shortest instruction sequence is "AA".
Your position goes from 0 --&gt; 1 --&gt; 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> target = 6
<strong>Output:</strong> 5
<strong>Explanation:</strong> 
The shortest instruction sequence is "AAARA".
Your position goes from 0 --&gt; 1 --&gt; 3 --&gt; 7 --&gt; 7 --&gt; 6.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= target &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**
- Time complexity: <em>O(2<sup>steps</sup>)</em>
- Space complexity: <em>O(2<sup>steps</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} target
 * @return {number}
 */
var racecar = function(target) {
    let queue = [{ position: 0, speed: 1 }];
    let result = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const { position, speed } of queue) {
            const nextPosition = position + speed;

            if (nextPosition === target) return result + 1;
            nextQueue.push({ position: nextPosition, speed: speed * 2 });

            if (speed > 0 && nextPosition < target) continue;
            if (speed < 0 && nextPosition > target) continue;
            nextQueue.push({ position, speed: speed > 0 ? -1 : 1 });
        }
        result += 1;
        queue = nextQueue;
    }
    return 0;
};
```

<p>&nbsp;</p>

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(target*log(target))</em>
- Space complexity: <em>O(target)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} target
 * @return {number}
 */
var racecar = function(target) {
    const dp = Array(target + 1).fill(-1);

    const raceTo = (distance) => {
        if (dp[distance] > -1) return dp[distance];

        let steps = 1;
        let currentPosition = 1;
        let result = Number.MAX_SAFE_INTEGER;

        while (currentPosition < distance) {
            let reverseSteps = 0;
            let reversePosition = 0;

            while (reversePosition < currentPosition) {
                const remainDistance = distance - (currentPosition - reversePosition);

                result = Math.min(steps + reverseSteps + 2 + raceTo(remainDistance), result);
                reverseSteps += 1;
                reversePosition = (1 << reverseSteps) - 1;
            }
            steps += 1;
            currentPosition = (1 << steps) - 1;

        }
        const overflowDistance = currentPosition - distance;
        const needSteps = overflowDistance ? 1 + raceTo(overflowDistance) : 0;
  
        result = Math.min(steps + needSteps, result);
        return dp[distance] = result;
    };

    return raceTo(target);
};
```
