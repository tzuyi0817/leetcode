# [592. Fraction Addition and Subtraction](https://leetcode.com/problems/fraction-addition-and-subtraction)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>expression</code> representing an expression of fraction addition and subtraction, return the calculation result in string format.</p>

<p>The final result should be an <a href="https://en.wikipedia.org/wiki/Irreducible_fraction" target="_blank">irreducible fraction</a>. If your final result is an integer, change it to the format of a fraction that has a denominator <code>1</code>. So in this case, <code>2</code> should be converted to <code>2/1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> expression = "-1/2+1/2"
<strong>Output:</strong> "0/1"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> expression = "-1/2+1/2+1/3"
<strong>Output:</strong> "1/3"
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> expression = "1/3-1/2"
<strong>Output:</strong> "-1/6"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The input string only contains <code>'0'</code> to <code>'9'</code>, <code>'/'</code>, <code>'+'</code> and <code>'-'</code>. So does the output.</li>
	<li>Each fraction (input and output) has the format <code>±numerator/denominator</code>. If the first input fraction or the output is positive, then <code>'+'</code> will be omitted.</li>
	<li>The input only contains valid <strong>irreducible fractions</strong>, where the <strong>numerator</strong> and <strong>denominator</strong> of each fraction will always be in the range <code>[1, 10]</code>. If the denominator is <code>1</code>, it means this fraction is actually an integer in a fraction format defined above.</li>
	<li>The number of given fractions will be in the range <code>[1, 10]</code>.</li>
	<li>The numerator and denominator of the <strong>final result</strong> are guaranteed to be valid and in the range of <strong>32-bit</strong> int.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
    const nums = expression.match(/[+-]?[0-9]+/g);
    let numerator = 0;
    let denominator = 1;

    const gcd = (a, b) => b ? gcd(b, a % b) : a;

    for (let index = 0; index < nums.length; index += 2) {
        const currentNumerator = nums[index];
        const currentDenominator = nums[index + 1];

        numerator = numerator * currentDenominator + currentNumerator * denominator;
        denominator *= currentDenominator;

        const currentGcd = gcd(Math.abs(numerator), Math.abs(denominator));

        numerator /= currentGcd;
        denominator /= currentGcd;
    }
    return `${numerator}/${denominator}`;
};
```
