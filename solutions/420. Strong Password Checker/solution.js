/**
 * @param {string} password
 * @return {number}
 */
const strongPasswordChecker = function (password) {
  const n = password.length;
  let lowercase = 1;
  let uppercase = 1;
  let digit = 1;
  let replaces = 0;
  let remainZero = 0;
  let remainOne = 0;
  let index = 0;

  while (index < n) {
    const char = password[index];
    let repeat = 1;

    if (/\d/.test(char)) digit = 0;
    else if (/[a-z]/.test(char)) lowercase = 0;
    else if (/[A-Z]/.test(char)) uppercase = 0;

    while (index + repeat < n && password[index] === password[index + repeat]) {
      repeat += 1;
    }
    index += repeat;
    if (repeat < 3) continue;
    const remain = repeat % 3;

    replaces += Math.floor(repeat / 3);
    if (remain === 0) remainZero += 1;
    if (remain === 1) remainOne += 1;
  }
  const missing = lowercase + uppercase + digit;

  if (n < 6) return Math.max(6 - n, missing);
  if (n <= 20) return Math.max(replaces, missing);
  const deletes = n - 20;

  // aaa => aa, 1 delete step replace 1 replace step
  replaces -= Math.min(deletes, remainZero);
  // aaaa => aa, 2 delete step replace 1 replace step
  replaces -= Math.floor(Math.min(Math.max(deletes - remainZero, 0), remainOne * 2) / 2);
  // aaaaa => aa, 3 delete step replace 1 replace step
  replaces -= Math.floor(Math.max(deletes - remainZero - remainOne * 2, 0) / 3);
  return deletes + Math.max(replaces, missing);
};
