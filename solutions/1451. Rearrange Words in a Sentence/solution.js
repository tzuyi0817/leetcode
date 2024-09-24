/**
 * @param {string} text
 * @return {string}
 */
const arrangeWords = function (text) {
  const splitText = text.split(' ');
  const buckets = [];

  splitText[0] = splitText[0].toLowerCase();

  for (const text of splitText) {
    buckets[text.length] = buckets[text.length] ?? [];
    buckets[text.length].push(text);
  }

  return buckets.filter(Boolean).reduce((result, bucket, index) => {
    if (index === 0) {
      bucket[0] = `${bucket[0][0].toUpperCase()}${bucket[0].slice(1)}`;
      return bucket.join(' ');
    }
    return `${result} ${bucket.join(' ')}`;
  }, '');
};
