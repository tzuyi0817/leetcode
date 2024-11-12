/**
 * @param {number[][]} items
 * @param {number[]} queries
 * @return {number[]}
 */
const maximumBeauty = function (items, queries) {
  const itemsMap = new Map();

  for (const [price, beauty] of items) {
    const itemBeauty = itemsMap.get(price) ?? 0;

    itemsMap.set(price, Math.max(beauty, itemBeauty));
  }
  const n = itemsMap.size;
  const filteredItems = [];

  for (const [price, beauty] of itemsMap) {
    filteredItems.push({ price, beauty });
  }
  filteredItems.sort((a, b) => a.price - b.price);

  for (let index = 1; index < n; index++) {
    const { beauty } = filteredItems[index];
    const maxBeauty = filteredItems[index - 1].beauty;

    filteredItems[index].beauty = Math.max(beauty, maxBeauty);
  }

  const findMaximumBeauty = price => {
    let left = 0;
    let right = n - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const item = filteredItems[mid];

      item.price >= price ? (right = mid) : (left = mid + 1);
    }
    const index = filteredItems[left].price > price ? left - 1 : left;

    return filteredItems[index]?.beauty ?? 0;
  };

  return queries.map(price => findMaximumBeauty(price));
};
