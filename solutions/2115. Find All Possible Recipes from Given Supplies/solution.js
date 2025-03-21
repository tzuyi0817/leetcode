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
