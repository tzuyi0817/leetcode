const Spreadsheet = function () {
  this.cellMap = new Map();
};

/**
 * @param {string} cell
 * @param {number} value
 * @return {void}
 */
Spreadsheet.prototype.setCell = function (cell, value) {
  this.cellMap.set(cell, value);
};

/**
 * @param {string} cell
 * @return {void}
 */
Spreadsheet.prototype.resetCell = function (cell) {
  this.cellMap.delete(cell);
};

/**
 * @param {string} formula
 * @return {number}
 */
Spreadsheet.prototype.getValue = function (formula) {
  const [a, b] = formula.slice(1).split('+');
  const numA = Number(a);
  const numB = Number(b);
  const x = Number.isNaN(numA) ? (this.cellMap.get(a) ?? 0) : numA;
  const y = Number.isNaN(numB) ? (this.cellMap.get(b) ?? 0) : numB;

  return x + y;
};

/**
 * Your Spreadsheet object will be instantiated and called as such:
 * var obj = new Spreadsheet(rows)
 * obj.setCell(cell,value)
 * obj.resetCell(cell)
 * var param_3 = obj.getValue(formula)
 */
