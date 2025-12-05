const TextEditor = function () {
  this.text = [];
  this.stack = [];
};

/**
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function (text) {
  for (const char of text) {
    this.text.push(char);
  }
};

/**
 * @param {number} k
 * @return {number}
 */
TextEditor.prototype.deleteText = function (k) {
  const n = this.text.length;
  const deleteCount = Math.min(n, k);

  for (let index = 0; index < deleteCount; index++) {
    this.text.pop();
  }

  return deleteCount;
};

/**
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorLeft = function (k) {
  while (this.text.length && k) {
    const char = this.text.pop();

    this.stack.push(char);
    k -= 1;
  }

  return this.text.slice(-10).join('');
};

/**
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorRight = function (k) {
  while (this.stack.length && k) {
    const char = this.stack.pop();

    this.text.push(char);
    k -= 1;
  }

  return this.text.slice(-10).join('');
};

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
