/**
 * @param {number[]} nums
 * @return {number}
 */
const minJumps = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const sieve = Array.from({ length: maxNum + 1 }, (_, index) => index);
  const visited = Array.from({ length: n }, () => false);
  const primeSet = new Set();
  const primeMap = new Map();
  let queue = [0];
  let result = 0;

  const isPrime = x => x > 1 && sieve[x] === x;

  for (let a = 2; a ** 2 <= maxNum; a++) {
    if (sieve[a] !== a) continue;

    for (let b = a * a; b <= maxNum; b += a) {
      if (sieve[b] === b) {
        sieve[b] = a;
      }
    }
  }

  for (const num of nums) {
    if (isPrime(num)) {
      primeSet.add(num);
    }
  }

  for (let index = 0; index < n; index++) {
    let current = nums[index];

    while (current > 1) {
      const prime = sieve[current];

      if (primeSet.has(prime)) {
        if (!primeMap.has(prime)) {
          primeMap.set(prime, []);
        }

        primeMap.get(prime).push(index);
      }

      while (current % prime === 0) {
        current /= prime;
      }
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const index of queue) {
      if (index === n - 1) return result;

      const num = nums[index];
      const prev = index - 1;
      const next = index + 1;

      if (prev >= 0 && !visited[prev]) {
        visited[prev] = true;
        nextQueue.push(prev);
      }

      if (next < n && !visited[next]) {
        visited[next] = true;
        nextQueue.push(next);
      }

      if (!isPrime(num)) continue;

      for (const pos of primeMap.get(num)) {
        if (pos === index || visited[pos]) continue;

        visited[pos] = true;
        nextQueue.push(pos);
      }

      primeMap.set(num, []);
    }

    queue = nextQueue;
    result += 1;
  }

  return -1;
};
