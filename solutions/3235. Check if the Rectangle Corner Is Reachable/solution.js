/**
 * @param {number} xCorner
 * @param {number} yCorner
 * @param {number[][]} circles
 * @return {boolean}
 */
const canReachCorner = function (xCorner, yCorner, circles) {
  const n = circles.length;
  const uf = new UnionFind(n + 2);
  const LEFT_TOP = n;
  const RIGHT_BOTTOM = n + 1;
  const X = BigInt(xCorner);
  const Y = BigInt(yCorner);

  for (let a = 0; a < n; a++) {
    const [x1, y1, r1] = circles[a].map(BigInt);

    const startInside = x1 * x1 + y1 * y1 <= r1 * r1;
    const dx = x1 - X;
    const dy = y1 - Y;
    const endInside = dx * dx + dy * dy <= r1 * r1;

    if (startInside || endInside) {
      return false;
    }

    const intersectsLeft = x1 <= r1 && y1 <= Y;
    const intersectsTop = (y1 - Y < 0n ? Y - y1 : y1 - Y) <= r1 && x1 <= X;
    const intersectsRight = (x1 - X < 0n ? X - x1 : x1 - X) <= r1 && y1 <= Y;
    const intersectsBottom = y1 <= r1 && x1 <= X;

    if (intersectsLeft || intersectsTop) {
      uf.union(a, LEFT_TOP);
    }

    if (intersectsRight || intersectsBottom) {
      uf.union(a, RIGHT_BOTTOM);
    }

    for (let b = 0; b < a; b++) {
      const [x2, y2, r2] = circles[b].map(BigInt);
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dist2 = dx * dx + dy * dy;
      const radius = r1 + r2;

      if (dist2 > radius * radius) {
        continue;
      }

      const pxNumerator = x1 * r2 + x2 * r1;
      const pyNumerator = y1 * r2 + y2 * r1;

      if (pxNumerator < radius * X && pyNumerator < radius * Y) {
        uf.union(a, b);
      }
    }
  }

  return uf.find(LEFT_TOP) !== uf.find(RIGHT_BOTTOM);
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = new Array(n).fill(0);
  }

  find(x) {
    if (this.groups[x] === x) {
      return x;
    }

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) {
      return false;
    }

    if (this.ranks[groupX] > this.ranks[groupY]) {
      this.groups[groupY] = groupX;
    } else if (this.ranks[groupX] < this.ranks[groupY]) {
      this.groups[groupX] = groupY;
    } else {
      this.groups[groupY] = groupX;
      this.ranks[groupX] += 1;
    }

    return true;
  }
}
