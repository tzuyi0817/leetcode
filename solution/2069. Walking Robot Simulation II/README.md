# [2069. Walking Robot Simulation II](https://leetcode.com/problems/walking-robot-simulation-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <code>width x height</code> grid is on an XY-plane with the <strong>bottom-left</strong> cell at <code>(0, 0)</code> and the <strong>top-right</strong> cell at <code>(width - 1, height - 1)</code>. The grid is aligned with the four cardinal directions (<code>"North"</code>, <code>"East"</code>, <code>"South"</code>, and <code>"West"</code>). A robot is <strong>initially</strong> at cell <code>(0, 0)</code> facing direction <code>"East"</code>.</p>

<p>The robot can be instructed to move for a specific number of <strong>steps</strong>. For each step, it does the following.</p>

<ol>
	<li>Attempts to move <strong>forward one</strong> cell in the direction it is facing.</li>
	<li>If the cell the robot is <strong>moving to</strong> is <strong>out of bounds</strong>, the robot instead <strong>turns</strong> 90 degrees <strong>counterclockwise</strong> and retries the step.</li>
</ol>

<p>After the robot finishes moving the number of steps required, it stops and awaits the next instruction.</p>

<p>Implement the <code>Robot</code> class:</p>

<ul>
	<li><code>Robot(int width, int height)</code> Initializes the <code>width x height</code> grid with the robot at <code>(0, 0)</code> facing <code>"East"</code>.</li>
	<li><code>void step(int num)</code> Instructs the robot to move forward <code>num</code> steps.</li>
	<li><code>int[] getPos()</code> Returns the current cell the robot is at, as an array of length 2, <code>[x, y]</code>.</li>
	<li><code>String getDir()</code> Returns the current direction of the robot, <code>"North"</code>, <code>"East"</code>, <code>"South"</code>, or <code>"West"</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="example-1" src="https://assets.leetcode.com/uploads/2021/10/09/example-1.png" style="width: 498px; height: 268px;">
<pre><strong>Input</strong>
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
<strong>Output</strong>
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

<strong>Explanation</strong>
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces <strong>North</strong> (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"

</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= width, height &lt;= 100</code></li>
	<li><code>1 &lt;= num &lt;= 10<sup>5</sup></code></li>
	<li>At most <code>10<sup>4</sup></code> calls <strong>in total</strong> will be made to <code>step</code>, <code>getPos</code>, and <code>getDir</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function(width, height) {
    this.bound = { x: width - 1, y: height - 1 };
    this.roundStep = (width - 1) * 2 + (height - 1) * 2;
    this.pos = { x: 0, y: 0 };
    this.dir = 'East';
    this.turnMap = {
        North: 'West', 
        East: 'North', 
        South: 'East', 
        West: 'South',
    };
    this.overtakeMap = {
        North: ({ boundY }) => this.pos.y = boundY, 
        East: ({ boundX }) => this.pos.x = boundX, 
        South: () => this.pos.y = 0, 
        West: () => this.pos.x = 0, 
    };
};

Robot.prototype.walk = function(step) {
    const moveMap = {
        North: { x: 0, y: 1 }, 
        East: { x: 1, y: 0 }, 
        South: { x: 0, y: -1 }, 
        West: { x: -1, y: 0 }, 
    }
    const move = moveMap[this.dir];
    let { x, y } = this.pos;

    x += move.x * step;
    y += move.y * step;
    this.pos = { x, y };
};

/** 
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function(num) {
    const { x: boundX, y: boundY } = this.bound;
    let step = num % this.roundStep;

    this.walk(step);
    if (this.pos.x === 0 && this.pos.y === 0) {
      this.dir = 'South';  
    }
    while (this.pos.x > boundX || this.pos.x < 0 || this.pos.y > boundY || this.pos.y < 0) {
        const calculateRemainMap = {
            North: ({ y }) => y - boundY, 
            East: ({ x }) => x - boundX, 
            South: ({ y }) => Math.abs(y), 
            West: ({ x }) =>  Math.abs(x), 
        };

        step = calculateRemainMap[this.dir](this.pos);
        this.overtakeMap[this.dir]({ boundX, boundY });
        this.dir = this.turnMap[this.dir];
        this.walk(step);
    }
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function() {
    return [this.pos.x, this.pos.y];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function() {
    return this.dir;
};

/** 
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */
```
