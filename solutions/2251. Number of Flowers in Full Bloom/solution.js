/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
const fullBloomFlowers = function (flowers, people) {
  const starts = [];
  const ends = [];

  for (const [start, end] of flowers) {
    starts.push(start);
    ends.push(end);
  }

  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  return people.map(time => {
    const started = findFirstGreater(starts, time);
    const ended = findFirstGreaterEqual(ends, time);

    return started - ended;
  });
};

function findFirstGreater(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    arr[mid] > target ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
}

function findFirstGreaterEqual(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    arr[mid] >= target ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
}
