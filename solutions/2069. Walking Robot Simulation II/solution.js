/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function(width, height) {
    this.bound = { x: width - 1, y: height - 1 };
    this.roundStep = (width - 1) * 2 + (height - 1) * 2;
    this.pos = { x: 0, y: 0 };
    this.dir = 'East';
    this.turnMap = {
        North: 'West', 
        East: 'North', 
        South: 'East', 
        West: 'South',
    };
    this.overtakeMap = {
        North: ({ boundY }) => this.pos.y = boundY, 
        East: ({ boundX }) => this.pos.x = boundX, 
        South: () => this.pos.y = 0, 
        West: () => this.pos.x = 0, 
    };
};

Robot.prototype.walk = function(step) {
    const moveMap = {
        North: { x: 0, y: 1 }, 
        East: { x: 1, y: 0 }, 
        South: { x: 0, y: -1 }, 
        West: { x: -1, y: 0 }, 
    }
    const move = moveMap[this.dir];
    let { x, y } = this.pos;

    x += move.x * step;
    y += move.y * step;
    this.pos = { x, y };
};

/** 
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function(num) {
    const { x: boundX, y: boundY } = this.bound;
    let step = num % this.roundStep;

    this.walk(step);
    if (this.pos.x === 0 && this.pos.y === 0) {
      this.dir = 'South';  
    }
    while (this.pos.x > boundX || this.pos.x < 0 || this.pos.y > boundY || this.pos.y < 0) {
        const calculateRemainMap = {
            North: ({ y }) => y - boundY, 
            East: ({ x }) => x - boundX, 
            South: ({ y }) => Math.abs(y), 
            West: ({ x }) =>  Math.abs(x), 
        };

        step = calculateRemainMap[this.dir](this.pos);
        this.overtakeMap[this.dir]({ boundX, boundY });
        this.dir = this.turnMap[this.dir];
        this.walk(step);
    }
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function() {
    return [this.pos.x, this.pos.y];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function() {
    return this.dir;
};

/** 
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */