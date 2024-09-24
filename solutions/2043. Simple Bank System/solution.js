/**
 * @param {number[]} balance
 */
const Bank = function (balance) {
  this.balance = balance;
};

Bank.prototype.isValidAccount = function (account, money = 0) {
  if (this.balance[account - 1] === undefined) return false;
  if (this.balance[account - 1] < money) return false;
  return true;
};

/**
 * @param {number} account1
 * @param {number} account2
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.transfer = function (account1, account2, money) {
  if (!this.isValidAccount(account2)) return false;

  return this.withdraw(account1, money) && this.deposit(account2, money);
};

/**
 * @param {number} account
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.deposit = function (account, money) {
  if (!this.isValidAccount(account)) return false;

  this.balance[account - 1] += money;
  return true;
};

/**
 * @param {number} account
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.withdraw = function (account, money) {
  if (!this.isValidAccount(account, money)) return false;

  this.balance[account - 1] -= money;
  return true;
};

/**
 * Your Bank object will be instantiated and called as such:
 * var obj = new Bank(balance)
 * var param_1 = obj.transfer(account1,account2,money)
 * var param_2 = obj.deposit(account,money)
 * var param_3 = obj.withdraw(account,money)
 */
