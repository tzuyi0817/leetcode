# [1889. Minimum Space Wasted From Packaging](https://leetcode.com/problems/minimum-space-wasted-from-packaging)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>n</code> packages that you are trying to place in boxes, <strong>one package in each box</strong>. There are <code>m</code> suppliers that each produce boxes of <strong>different sizes</strong> (with infinite supply). A package can be placed in a box if the size of the package is <strong>less than or equal to</strong> the size of the box.</p>

<p>The package sizes are given as an integer array <code>packages</code>, where <code>packages[i]</code> is the <strong>size</strong> of the <code>i<sup>th</sup></code> package. The suppliers are given as a 2D integer array <code>boxes</code>, where <code>boxes[j]</code> is an array of <strong>box sizes</strong> that the <code>j<sup>th</sup></code> supplier produces.</p>

<p>You want to choose a <strong>single supplier</strong> and use boxes from them such that the <strong>total wasted space </strong>is <strong>minimized</strong>. For each package in a box, we define the space <strong>wasted</strong> to be <code>size of the box - size of the package</code>. The <strong>total wasted space</strong> is the sum of the space wasted in <strong>all</strong> the boxes.</p>

<ul>
	<li>For example, if you have to fit packages with sizes <code>[2,3,5]</code> and the supplier offers boxes of sizes <code>[4,8]</code>, you can fit the packages of size-<code>2</code> and size-<code>3</code> into two boxes of size-<code>4</code> and the package with size-<code>5</code> into a box of size-<code>8</code>. This would result in a waste of <code>(4-2) + (4-3) + (8-5) = 6</code>.</li>
</ul>

<p>Return <em>the <strong>minimum total wasted space</strong> by choosing the box supplier <strong>optimally</strong>, or </em><code>-1</code> <i>if it is <strong>impossible</strong> to fit all the packages inside boxes. </i>Since the answer may be <strong>large</strong>, return it <strong>modulo </strong><code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> packages = [2,3,5], boxes = [[4,8],[2,8]]
<strong>Output:</strong> 6
<strong>Explanation</strong>: It is optimal to choose the first supplier, using two size-4 boxes and one size-8 box.
The total waste is (4-2) + (4-3) + (8-5) = 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> packages = [2,3,5], boxes = [[1,4],[2,3],[3,4]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> There is no box that the package of size 5 can fit in.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> packages = [3,5,8,10,11,12], boxes = [[12],[11,9],[10,5,14]]
<strong>Output:</strong> 9
<strong>Explanation:</strong> It is optimal to choose the third supplier, using two size-5 boxes, two size-10 boxes, and two size-14 boxes.
The total waste is (5-3) + (5-5) + (10-8) + (10-10) + (14-11) + (14-12) = 9.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == packages.length</code></li>
	<li><code>m == boxes.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= m &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= packages[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= boxes[j].length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= boxes[j][k] &lt;= 10<sup>5</sup></code></li>
	<li><code>sum(boxes[j].length) &lt;= 10<sup>5</sup></code></li>
	<li>The elements in <code>boxes[j]</code> are <strong>distinct</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Binary Search`**

- Time complexity: <em>O(nlogn+mlogm+mlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} packages
 * @param {number[][]} boxes
 * @return {number}
 */
const minWastedSpace = function (packages, boxes) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = packages.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0n);
  let result = -1;

  const findPackage = (left, box) => {
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      packages[mid] > box ? (right = mid - 1) : (left = mid + 1);
    }

    return right;
  };

  packages.sort((a, b) => a - b);

  for (let index = 1; index <= n; index++) {
    prefixSum[index] = prefixSum[index - 1] + BigInt(packages[index - 1]);
  }

  for (const supplier of boxes) {
    supplier.sort((a, b) => a - b);

    if (supplier.at(-1) < packages[n - 1]) continue;

    let left = 0;
    let wasted = 0n;

    for (const box of supplier) {
      const index = findPackage(left, box);

      if (index < left) continue;
      const boxCount = BigInt(index - left + 1);
      const totalBoxSizes = BigInt(box) * boxCount;
      const totalPackages = prefixSum[index + 1] - prefixSum[left];

      wasted = wasted + totalBoxSizes - totalPackages;
      left = index + 1;
    }

    if (result === -1 || wasted < result) {
      result = wasted;
    }
  }

  return Number(BigInt(result) % MODULO);
};
```
