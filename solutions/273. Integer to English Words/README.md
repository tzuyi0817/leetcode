# [273. Integer to English Words](https://leetcode.com/problems/integer-to-english-words)

## Description

<div class="elfjS" data-track-load="description_content"><p>Convert a non-negative integer <code>num</code> to its English words representation.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> num = 123
<strong>Output:</strong> "One Hundred Twenty Three"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num = 12345
<strong>Output:</strong> "Twelve Thousand Three Hundred Forty Five"
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> num = 1234567
<strong>Output:</strong> "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} num
 * @return {string}
 */
const numberToWords = function (num) {
  const carryThousand = ['Thousand', 'Million', 'Billion'];
  const carryTen = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const convertMap = {
    0: '',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen',
  };
  const convertHundred = num => {
    const hundreds = Math.floor(num / 100);
    const tens = num % 100;
    const digits = num % 10;
    const enHundreds = hundreds ? `${convertMap[hundreds]} Hundred` : '';
    const enTens = tens < 20 ? convertMap[tens] : carryTen[Math.floor(tens / 10)];
    const enDigits = tens > 20 ? convertMap[digits] : '';

    return `${enHundreds} ${enTens} ${enDigits}`.trim();
  };
  let result = convertHundred(num % 1000);

  for (const carry of carryThousand) {
    num = Math.floor(num / 1000);
    if (!num) return result || 'Zero';
    const remainder = num % 1000;

    if (!remainder) continue;
    result = `${convertHundred(remainder)} ${carry} ${result}`.trim();
  }
  return result;
};
```
