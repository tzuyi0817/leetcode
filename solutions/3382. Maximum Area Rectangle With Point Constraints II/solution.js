/**
 * @param {number[]} xCoord
 * @param {number[]} yCoord
 * @return {number}
 */
const maxRectangleArea = function (xCoord, yCoord) {
  const n = xCoord.length;
  const points = xCoord.map((x, index) => ({ x, y: yCoord[index] }));

  points.sort((a, b) => a.x - b.x || a.y - b.y);

  const yToXMap = new Map();
  const yToIndexMap = new Map();
  const ys = [...new Set(yCoord)].toSorted((a, b) => a - b);
  const m = ys.length;
  const tree = new SegmentTree(m);
  let { x: prevX, y: prevY } = points[0];
  let result = -1;

  for (let index = 0; index < m; index++) {
    yToIndexMap.set(ys[index], index);
  }

  for (let index = 1; index < n; index++) {
    const { x, y } = points[index];
    const indexPrevY = yToIndexMap.get(prevY);

    if (yToXMap.has(y) && yToXMap.has(prevY)) {
      const leftX = yToXMap.get(y);
      const leftPrevX = yToXMap.get(prevY);
      const isRect = x === prevX && leftX === leftPrevX;
      const indexY = yToIndexMap.get(y);

      if (isRect && leftX > tree.query(indexPrevY + 1, indexY - 1)) {
        const area = (x - leftX) * (y - prevY);

        result = Math.max(area, result);
      }
    }

    yToXMap.set(prevY, prevX);
    tree.update(indexPrevY, prevX);
    prevX = x;
    prevY = y;
  }

  return result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.tree = Array.from({ length: n * 4 }, () => -1);
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  #update(index, l, r, target, val) {
    if (l === r) {
      this.tree[index] = val;

      return;
    }

    const mid = Math.floor((l + r) / 2);

    if (target <= mid) {
      this.#update(index * 2 + 1, l, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, r, target, val);
    }

    const left = this.tree[index * 2 + 1];
    const right = this.tree[index * 2 + 2];

    this.tree[index] = Math.max(left, right);
  }

  query(l, r) {
    return this.#query(0, 0, this.n - 1, l, r);
  }

  #query(index, low, high, l, r) {
    if (l <= low && r >= high) {
      return this.tree[index];
    }

    if (l > high || r < low) return -1;

    const mid = Math.floor((low + high) / 2);
    const left = this.#query(index * 2 + 1, low, mid, l, r);
    const right = this.#query(index * 2 + 2, mid + 1, high, l, r);

    return Math.max(left, right);
  }
}
