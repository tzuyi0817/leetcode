/**
 * @param {number} timeToLive
 */
var AuthenticationManager = function(timeToLive) {
    this.timeToLive = timeToLive;
    this.authMap = new Map();
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.generate = function(tokenId, currentTime) {
    this.authMap.set(tokenId, currentTime + this.timeToLive);
};

/** 
 * @param {string} tokenId 
 * @param {number} currentTime
 * @return {void}
 */
AuthenticationManager.prototype.renew = function(tokenId, currentTime) {
    if (!this.authMap.has(tokenId)) return;
    const expiredTime = this.authMap.get(tokenId);

    expiredTime <= currentTime
        ? this.authMap.delete(tokenId)
        : this.authMap.set(tokenId, currentTime + this.timeToLive);
};

/** 
 * @param {number} currentTime
 * @return {number}
 */
AuthenticationManager.prototype.countUnexpiredTokens = function(currentTime) {
    let count = 0;

    this.authMap.forEach(expiredTime => {
        if (expiredTime > currentTime) count += 1;
    });

    return count;
};

/** 
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */
