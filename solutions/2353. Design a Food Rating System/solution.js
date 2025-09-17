/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
const FoodRatings = function (foods, cuisines, ratings) {
  const n = foods.length;

  this.foodMap = new Map();
  this.cuisineMap = new Map();

  for (let index = 0; index < n; index++) {
    const food = foods[index];
    const cuisine = cuisines[index];
    const rating = ratings[index];

    this.foodMap.set(food, { cuisine, rating });

    if (!this.cuisineMap.has(cuisine)) {
      const heap = new PriorityQueue((a, b) => {
        return b.rating - a.rating || a.food.localeCompare(b.food);
      });

      this.cuisineMap.set(cuisine, heap);
    }

    this.cuisineMap.get(cuisine).enqueue({ food, rating });
  }
};

/**
 * @param {string} food
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function (food, newRating) {
  const { cuisine } = this.foodMap.get(food);

  this.foodMap.set(food, { cuisine, rating: newRating });
  this.cuisineMap.get(cuisine).enqueue({ food, rating: newRating });
};

/**
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function (cuisine) {
  const heap = this.cuisineMap.get(cuisine);

  while (heap.front().rating !== this.foodMap.get(heap.front().food).rating) {
    heap.dequeue();
  }

  return heap.front().food;
};

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
