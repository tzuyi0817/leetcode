/**
 * @param {number} width
 * @param {number} height
 */
const Robot = function (width, height) {
  this.n = (width - 1) * 2 + (height - 1) * 2;
  this.pos = [];
  this.index = 0;

  for (let x = 0; x < width; x++) {
    this.pos.push({ x, y: 0, dir: 'East' });
  }

  for (let y = 1; y < height; y++) {
    this.pos.push({ x: width - 1, y, dir: 'North' });
  }

  for (let x = width - 2; x >= 0; x--) {
    this.pos.push({ x, y: height - 1, dir: 'West' });
  }

  for (let y = height - 2; y > 0; y--) {
    this.pos.push({ x: 0, y, dir: 'South' });
  }
};

/**
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function (num) {
  this.index = (this.index + num) % this.n;
  this.pos[0].dir = 'South';
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function () {
  const current = this.pos[this.index];

  return [current.x, current.y];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function () {
  return this.pos[this.index].dir;
};

/**
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */
