const Fancy = function () {
  this.mod = BigInt(10 ** 9 + 7);
  this.sequences = [];
  this.mult = 1n;
  this.add = 0n;
};

/**
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function (val) {
  this.sequences.push({ val: BigInt(val), mult: this.mult, add: this.add });
};

/**
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function (inc) {
  this.add = (this.add + BigInt(inc)) % this.mod;
};

/**
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function (m) {
  this.mult = (this.mult * BigInt(m)) % this.mod;
  this.add = (this.add * BigInt(m)) % this.mod;
};

/**
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function (idx) {
  const sequence = this.sequences[idx];

  if (!sequence) return -1;
  const { val, add, mult } = sequence;
  const modMult = modInverse(mult, this.mod);
  const totalMult = (this.mult * modMult) % this.mod;
  const totalAdd = (this.add - ((add * totalMult) % this.mod) + this.mod) % this.mod;

  return Number((val * totalMult + totalAdd) % this.mod);
};

function modInverse(value, mod) {
  return powMod(value, mod - 2n, mod);
}

function powMod(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp = exp / 2n;
  }

  return result;
}

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */
