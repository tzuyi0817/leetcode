/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const canMakePalindromeQueries = function (s, queries) {
  const n = s.length;
  const m = n / 2;
  const leftStr = s.slice(0, Math.max(0, m));
  const rightRevStr = s.slice(Math.max(0, m)).split('').toReversed().join('');
  const pre1 = Array.from({ length: m + 1 }, () => new Array(26).fill(0));
  const pre2 = Array.from({ length: m + 1 }, () => new Array(26).fill(0));
  const diff = new Array(m + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 0; j < 26; j++) {
      pre1[i][j] = pre1[i - 1][j];
      pre2[i][j] = pre2[i - 1][j];
    }
    pre1[i][leftStr.charCodeAt(i - 1) - 97]++;
    pre2[i][rightRevStr.charCodeAt(i - 1) - 97]++;
    diff[i] = diff[i - 1] + (leftStr[i - 1] === rightRevStr[i - 1] ? 0 : 1);
  }

  function check(a, b, c, d) {
    if (diff[a] > 0 || diff[m] - diff[Math.max(b, d) + 1] > 0) {
      return false;
    }

    if (d <= b) {
      const cnt1 = count(pre1, a, b);
      const cnt2 = count(pre2, a, b);
      return cnt1.every((val, i) => val === cnt2[i]);
    }

    if (b < c) {
      if (diff[c] - diff[b + 1] > 0) return false;

      const cnt1_ab = count(pre1, a, b);
      const cnt2_ab = count(pre2, a, b);
      const cnt1_cd = count(pre1, c, d);
      const cnt2_cd = count(pre2, c, d);

      return cnt1_ab.every((val, i) => val === cnt2_ab[i]) && cnt1_cd.every((val, i) => val === cnt2_cd[i]);
    }

    if (c <= b && b < d) {
      const cnt1 = sub(count(pre1, a, b), count(pre2, a, c - 1));
      const cnt2 = sub(count(pre2, c, d), count(pre1, b + 1, d));

      return cnt1.every((val, i) => val >= 0 && cnt2[i] >= 0 && val === cnt2[i]);
    }

    return false;
  }

  return queries.map(([a, b, c, d]) => {
    const c2 = n - 1 - d;
    const d2 = n - 1 - c;

    if (a <= c2) {
      return check(a, b, c2, d2);
    } else {
      return check(c2, d2, a, b);
    }
  });
};

function count(pre, l, r) {
  const res = new Array(26).fill(0);

  if (l > r) return res;
  for (let i = 0; i < 26; i++) {
    res[i] = pre[r + 1][i] - pre[l][i];
  }
  return res;
}

function sub(a, b) {
  const res = new Array(26).fill(0);

  for (let i = 0; i < 26; i++) {
    res[i] = a[i] - b[i];
  }
  return res;
}
