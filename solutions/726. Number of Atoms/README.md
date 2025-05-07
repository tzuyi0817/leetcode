# [726. Number of Atoms](https://leetcode.com/problems/number-of-atoms)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>formula</code> representing a chemical formula, return <em>the count of each atom</em>.</p>

<p>The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.</p>

<p>One or more digits representing that element's count may follow if the count is greater than <code>1</code>. If the count is <code>1</code>, no digits will follow.</p>

<ul>
	<li>For example, <code>"H2O"</code> and <code>"H2O2"</code> are possible, but <code>"H1O2"</code> is impossible.</li>
</ul>

<p>Two formulas are concatenated together to produce another formula.</p>

<ul>
	<li>For example, <code>"H2O2He3Mg4"</code> is also a formula.</li>
</ul>

<p>A formula placed in parentheses, and a count (optionally added) is also a formula.</p>

<ul>
	<li>For example, <code>"(H2O2)"</code> and <code>"(H2O2)3"</code> are formulas.</li>
</ul>

<p>Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than <code>1</code>), followed by the second name (in sorted order), followed by its count (if that count is more than <code>1</code>), and so on.</p>

<p>The test cases are generated so that all the values in the output fit in a <strong>32-bit</strong> integer.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> formula = "H2O"
<strong>Output:</strong> "H2O"
<strong>Explanation:</strong> The count of elements are {'H': 2, 'O': 1}.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> formula = "Mg(OH)2"
<strong>Output:</strong> "H2MgO2"
<strong>Explanation:</strong> The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> formula = "K4(ON(SO3)2)2"
<strong>Output:</strong> "K4N2O14S4"
<strong>Explanation:</strong> The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= formula.length &lt;= 1000</code></li>
	<li><code>formula</code> consists of English letters, digits, <code>'('</code>, and <code>')'</code>.</li>
	<li><code>formula</code> is always valid.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} formula
 * @return {string}
 */
const countOfAtoms = function (formula) {
  const n = formula.length;
  const stack = [new Map()];
  let currentAtom = '';
  let currentCount = '';

  const combineAtom = (atom, count) => {
    if (!atom) return;
    const atomMap = stack.at(-1);
    const originCount = atomMap.get(atom) ?? 0;
    const atomCount = count ? +count : 1;

    atomMap.set(atom, originCount + atomCount);
  };

  const mergeAtomMap = atomMap => {
    for (const [atom, count] of atomMap) {
      combineAtom(atom, count);
    }
  };

  const getMultiple = index => {
    let multiple = '';

    while (index + 1 < n && /\d/.test(formula[index + 1])) {
      index += 1;
      multiple += formula[index];
    }
    return { multiple, index };
  };

  let index = 0;

  while (index < n) {
    const char = formula[index];

    if (char === '(') {
      combineAtom(currentAtom, currentCount);
      stack.push(new Map());
      currentAtom = currentCount = '';
    } else if (char === ')') {
      combineAtom(currentAtom, currentCount);
      currentAtom = currentCount = '';

      const atomMap = stack.pop();
      const { multiple, index: currentIndex } = getMultiple(index);

      if (multiple) {
        for (const [atom, count] of atomMap) {
          atomMap.set(atom, count * multiple);
        }
        index = currentIndex;
      }
      mergeAtomMap(atomMap);
    } else if (/[A-Z]/.test(char)) {
      combineAtom(currentAtom, currentCount);
      currentAtom = char;
      currentCount = '';
    } else if (/[a-z]/.test(char)) currentAtom += char;
    else if (/\d/.test(char)) currentCount += char;

    index += 1;
  }
  combineAtom(currentAtom, currentCount);

  const atomMap = stack[0];
  const atoms = [...atomMap.keys()].sort((a, b) => a.localeCompare(b));
  let result = '';

  for (const atom of atoms) {
    const count = atomMap.get(atom);

    result += count > 1 ? `${atom}${count}` : atom;
  }
  return result;
};
```
