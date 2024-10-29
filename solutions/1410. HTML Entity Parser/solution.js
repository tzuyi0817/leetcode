/**
 * @param {string} text
 * @return {string}
 */
const entityParser = function (text) {
  const parseMap = {
    '&quot;': '"',
    '&apos;': "'",
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&frasl;': '/',
  };

  return text.replaceAll(/&quot;|&apos;|&amp;|&gt;|&lt;|&frasl;/g, match => {
    return parseMap[match];
  });
};
