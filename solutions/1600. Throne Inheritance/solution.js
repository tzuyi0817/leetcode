/**
 * @param {string} kingName
 */
var ThroneInheritance = function(kingName) {
    this.king = kingName;
    this.deathSet = new Set();
    this.throneMap = new Map([[kingName, []]]);
};

/** 
 * @param {string} parentName 
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function(parentName, childName) {
    const children =  this.throneMap.get(parentName) ?? [];

    children.push(childName);
    this.throneMap.set(parentName, children);
    this.throneMap.set(childName, []);
};

/** 
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function(name) {
    this.deathSet.add(name);
};

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function() {
    const result = [];
    const generateInheritanceOrder = (name) => {
        const children = this.throneMap.get(name);

        !this.deathSet.has(name) && result.push(name);
        children.forEach(generateInheritanceOrder);
    };

    generateInheritanceOrder(this.king);
    return result;
};
