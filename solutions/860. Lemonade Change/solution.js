/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = function (bills) {
  const COST = 5;
  let five = 0;
  let ten = 0;

  for (const bill of bills) {
    const needBack = bill - COST;

    if (needBack === 5) {
      if (!five) return false;
      five -= 1;
    }
    if (needBack === 10) {
      if (!ten && five < 2) return false;
      ten ? (ten -= 1) : (five -= 2);
    }
    if (needBack === 15) {
      if ((!ten || !five) && five < 3) return false;
      if (ten && five) {
        ten -= 1;
        five -= 1;
      } else five -= 3;
    }
    if (bill === 5) five += 1;
    if (bill === 10) ten += 1;
  }
  return true;
};
