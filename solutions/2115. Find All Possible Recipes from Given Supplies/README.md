# [2115. Find All Possible Recipes from Given Supplies](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have information about <code>n</code> different recipes. You are given a string array <code>recipes</code> and a 2D string array <code>ingredients</code>. The <code>i<sup>th</sup></code> recipe has the name <code>recipes[i]</code>, and you can <strong>create</strong> it if you have <strong>all</strong> the needed ingredients from <code>ingredients[i]</code>. A recipe can also be an ingredient for <strong>other </strong>recipes, i.e., <code>ingredients[i]</code> may contain a string that is in <code>recipes</code>.</p>

<p>You are also given a string array <code>supplies</code> containing all the ingredients that you initially have, and you have an infinite supply of all of them.</p>

<p>Return <em>a list of all the recipes that you can create. </em>You may return the answer in <strong>any order</strong>.</p>

<p>Note that two recipes may contain each other in their ingredients.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
<strong>Output:</strong> ["bread"]
<strong>Explanation:</strong>
We can create "bread" since we have the ingredients "yeast" and "flour".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
<strong>Output:</strong> ["bread","sandwich"]
<strong>Explanation:</strong>
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
<strong>Output:</strong> ["bread","sandwich","burger"]
<strong>Explanation:</strong>
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == recipes.length == ingredients.length</code></li>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= ingredients[i].length, supplies.length &lt;= 100</code></li>
	<li><code>1 &lt;= recipes[i].length, ingredients[i][j].length, supplies[k].length &lt;= 10</code></li>
	<li><code>recipes[i], ingredients[i][j]</code>, and <code>supplies[k]</code> consist only of lowercase English letters.</li>
	<li>All the values of <code>recipes</code> and <code>supplies</code>&nbsp;combined are unique.</li>
	<li>Each <code>ingredients[i]</code> does not contain any duplicate values.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Topological Sort`**

- Time complexity: <em>O(n\*ingredients[i].length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
const findAllRecipes = function (recipes, ingredients, supplies) {
  const n = recipes.length;
  const suppliesSet = new Set(supplies);
  const indegreeMap = new Map();
  const graph = new Map();
  const result = [];
  let queue = [];

  for (let index = 0; index < n; index++) {
    const recipe = recipes[index];

    for (const ingredient of ingredients[index]) {
      if (suppliesSet.has(ingredient)) continue;
      if (!graph.has(ingredient)) graph.set(ingredient, []);
      const indegree = indegreeMap.get(recipe) ?? 0;

      graph.get(ingredient).push(recipe);
      indegreeMap.set(recipe, indegree + 1);
    }
  }

  for (const recipe of recipes) {
    if (indegreeMap.has(recipe)) continue;

    queue.push(recipe);
  }

  while (queue.length) {
    const nextQueue = [];

    for (const recipe of queue) {
      result.push(recipe);

      if (!graph.has(recipe)) continue;

      for (const nextRecipe of graph.get(recipe)) {
        const indegree = indegreeMap.get(nextRecipe);

        if (indegree - 1 === 0) {
          nextQueue.push(nextRecipe);
        }

        indegreeMap.set(nextRecipe, indegree - 1);
      }
    }

    queue = nextQueue;
  }

  return result;
};
```
