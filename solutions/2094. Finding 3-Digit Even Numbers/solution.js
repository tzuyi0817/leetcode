/**
 * @param {number[]} digits
 * @return {number[]}
 */
const findEvenNumbers = function (digits) {
  const counts = Array.from({ length: 10 }, () => 0);
  const result = [];

  for (const digit of digits) {
    counts[digit] += 1;
  }

  const findEvenNumber = (index, current) => {
    if (index > 2) {
      result.push(Number(current));
      return;
    }
    const start = index ? 0 : 1;
    const interval = index === 2 ? 2 : 1;

    for (let digit = start; digit < 10; digit += interval) {
      if (!counts[digit]) continue;

      counts[digit] -= 1;
      findEvenNumber(index + 1, current + digit);
      counts[digit] += 1;
    }
  };

  findEvenNumber(0, '');

  return result;
};
