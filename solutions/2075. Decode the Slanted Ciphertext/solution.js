/**
 * @param {string} encodedText
 * @param {number} rows
 * @return {string}
 */
const decodeCiphertext = function (encodedText, rows) {
  const size = encodedText.length;
  const cols = size / rows;
  let result = '';

  for (let col = 0; col < cols; col++) {
    let slant = 0;

    for (let row = 0; row < rows; row++) {
      const encodeIndex = row * cols + slant + col;
      const char = encodedText[encodeIndex];

      if (!char) return result.trimEnd();
      result += char;
      slant += 1;
    }
  }
  return result.trimEnd();
};
