/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
    this.linked = class {
        next = null;
        back = null;
        constructor(page) {
            this.name = page;
        }
    }
    this.history = new this.linked(homepage);
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
    const current = this.history;
    const next = new this.linked(url);

    current.next = next;
    next.back = current;
    this.history = next;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
    while (steps && this.history.back) {
        this.history = this.history.back;
        steps -= 1;
    }
    return this.history.name;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
    while (steps && this.history.next) {
        this.history = this.history.next;
        steps -= 1;
    }
    return this.history.name;
};
