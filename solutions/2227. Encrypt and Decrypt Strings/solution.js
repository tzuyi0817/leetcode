/**
 * @param {character[]} keys
 * @param {string[]} values
 * @param {string[]} dictionary
 */
const Encrypter = function (keys, values, dictionary) {
  const n = keys.length;

  this.encryptMap = new Map();
  this.dictionaryMap = new Map();

  for (let index = 0; index < n; index++) {
    const key = keys[index];

    this.encryptMap.set(key, values[index]);
  }

  for (const word of dictionary) {
    const encrypt = this.encrypt(word);
    const count = this.dictionaryMap.get(encrypt) ?? 0;

    this.dictionaryMap.set(encrypt, count + 1);
  }
};

/**
 * @param {string} word1
 * @return {string}
 */
Encrypter.prototype.encrypt = function (word1) {
  let result = '';

  for (const char of word1) {
    result += this.encryptMap.get(char);
  }

  return result;
};

/**
 * @param {string} word2
 * @return {number}
 */
Encrypter.prototype.decrypt = function (word2) {
  return this.dictionaryMap.get(word2) ?? 0;
};

/**
 * Your Encrypter object will be instantiated and called as such:
 * var obj = new Encrypter(keys, values, dictionary)
 * var param_1 = obj.encrypt(word1)
 * var param_2 = obj.decrypt(word2)
 */
