# [913. Cat and Mouse](https://leetcode.com/problems/cat-and-mouse)

## Description

<div class="elfjS" data-track-load="description_content"><p>A game on an <strong>undirected</strong> graph is played by two players, Mouse and Cat, who alternate turns.</p>

<p>The graph is given as follows: <code>graph[a]</code> is a list of all nodes <code>b</code> such that <code>ab</code> is an edge of the graph.</p>

<p>The mouse starts at node <code>1</code> and goes first, the cat starts at node <code>2</code> and goes second, and there is a hole at node <code>0</code>.</p>

<p>During each player's turn, they <strong>must</strong> travel along one&nbsp;edge of the graph that meets where they are.&nbsp; For example, if the Mouse is at node 1, it <strong>must</strong> travel to any node in <code>graph[1]</code>.</p>

<p>Additionally, it is not allowed for the Cat to travel to the Hole (node <code>0</code>).</p>

<p>Then, the game can end in three&nbsp;ways:</p>

<ul>
	<li>If ever the Cat occupies the same node as the Mouse, the Cat wins.</li>
	<li>If ever the Mouse reaches the Hole, the Mouse wins.</li>
	<li>If ever a position is repeated (i.e., the players are in the same position as a previous turn, and&nbsp;it is the same player's turn to move), the game is a draw.</li>
</ul>

<p>Given a <code>graph</code>, and assuming both players play optimally, return</p>

<ul>
	<li><code>1</code>&nbsp;if the mouse wins the game,</li>
	<li><code>2</code>&nbsp;if the cat wins the game, or</li>
	<li><code>0</code>&nbsp;if the game is a draw.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/17/cat1.jpg" style="width: 300px; height: 300px;">
<pre><strong>Input:</strong> graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
<strong>Output:</strong> 0
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/17/cat2.jpg" style="width: 200px; height: 200px;">
<pre><strong>Input:</strong> graph = [[1,3],[0],[3],[0,2]]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= graph.length &lt;= 50</code></li>
	<li><code>1&nbsp;&lt;= graph[i].length &lt; graph.length</code></li>
	<li><code>0 &lt;= graph[i][j] &lt; graph.length</code></li>
	<li><code>graph[i][j] != i</code></li>
	<li><code>graph[i]</code> is unique.</li>
	<li>The mouse and the cat can always move.&nbsp;</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**
- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} graph
 * @return {number}
 */
var catMouseGame = function(graph) {
    const DRAW = 0;
    const MOUSE_WIN = 1;
    const CAT_WIN = 2;

    const MOUSE_START = 1;
    const CAT_START = 2;

    const MOUSE_ROUND = 0;
    const CAT_ROUND = 1;

    const n = graph.length;
    const defaultState = { [MOUSE_ROUND]: DRAW, [CAT_ROUND]: DRAW };
    const defaultDegree = { [MOUSE_ROUND]: 0, [CAT_ROUND]: 0 };
    const states = Array(n).fill('').map(_ => Array(n).fill('').map(_ => ({ ...defaultState  })));
    const outDegree = Array(n).fill('').map(_ => Array(n).fill('').map(_ => ({ ...defaultDegree })));
    let queue = [];

    for (let mouse = 0; mouse < n; mouse++) {
        for (let cat = 0; cat < n; cat++) {
            outDegree[mouse][cat][MOUSE_ROUND] = graph[mouse].length;
            outDegree[mouse][cat][CAT_ROUND] = graph[cat].filter(node => node).length;
        }
    }

    for (let cat = 1; cat < n; cat++) {
        states[0][cat][MOUSE_ROUND] = MOUSE_WIN;
        states[0][cat][CAT_ROUND] = MOUSE_WIN;
        states[cat][cat][MOUSE_ROUND] = CAT_WIN;
        states[cat][cat][CAT_ROUND] = CAT_WIN;

        queue.push({ mouse: 0, cat, round: MOUSE_ROUND, state: MOUSE_WIN });
        queue.push({ mouse: 0, cat, round: CAT_ROUND, state: MOUSE_WIN });
        queue.push({ mouse: cat, cat, round: MOUSE_ROUND, state: CAT_WIN });
        queue.push({ mouse: cat, cat, round: CAT_ROUND, state: CAT_WIN });
    }

    while (queue.length) {
        const nextQueue = [];

        for (const { mouse, cat, round, state } of queue) {
            if (mouse === MOUSE_START && cat === CAT_START && round === MOUSE_ROUND) {
                return state;
            }
            const prevRound = round === MOUSE_ROUND ? CAT_ROUND : MOUSE_ROUND;
            const isPrevMouseRound = prevRound === MOUSE_ROUND;
            const prevNodes = graph[isPrevMouseRound ? mouse : cat];

            for (const prevNode of prevNodes) {
                const prevCat = isPrevMouseRound ? cat : prevNode;

                if (prevCat === 0) continue;
                const prevMouse = isPrevMouseRound ? prevNode : mouse;

                if (states[prevMouse][prevCat][prevRound] !== DRAW) continue;
                const isMouseWin = isPrevMouseRound && state === MOUSE_WIN;
                const isCatWin = !isPrevMouseRound && state === CAT_WIN;

                if (isMouseWin || isCatWin || --outDegree[prevMouse][prevCat][prevRound] === 0) {
                    states[prevMouse][prevCat][prevRound] = state;
                    nextQueue.push({ mouse: prevMouse, cat: prevCat, round: prevRound, state })
                }
            }
        }
        queue = nextQueue;
    }
    return states[MOUSE_START][CAT_START][MOUSE_ROUND];
};
```
