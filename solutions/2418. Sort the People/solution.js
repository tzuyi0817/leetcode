/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
const sortPeople = function (names, heights) {
  const peoples = names.map((name, index) => ({ name, height: heights[index] }));

  peoples.sort((a, b) => b.height - a.height);

  return peoples.map(({ name }) => name);
};
