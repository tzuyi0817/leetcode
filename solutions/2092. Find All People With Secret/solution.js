/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
const findAllPeople = function (n, meetings, firstPerson) {
  const uf = new UnionFind(n);
  const meetingMap = new Map();
  const result = [0];

  meetings.sort((a, b) => a[2] - b[2]);

  uf.union(0, firstPerson);

  for (const [x, y, time] of meetings) {
    if (!meetingMap.has(time)) {
      meetingMap.set(time, []);
    }

    meetingMap.get(time).push({ x, y });
  }

  for (const pairs of meetingMap.values()) {
    const peopleSet = new Set();

    for (const { x, y } of pairs) {
      uf.union(x, y);
      peopleSet.add(x);
      peopleSet.add(y);
    }

    for (const people of peopleSet) {
      if (uf.find(people) !== uf.find(0)) {
        uf.reset(people);
      }
    }
  }

  for (let index = 1; index < n; index++) {
    if (uf.find(index) === uf.find(0)) {
      result.push(index);
    }
  }

  return result;
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
  }

  find(x) {
    if (this.groups[x] === x) return x;

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

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

  reset(x) {
    this.groups[x] = x;
  }
}
