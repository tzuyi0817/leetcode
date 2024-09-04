/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    const TURN_RIGHT = -1;
    const TURN_LEFT = -2;
    const directions = ['north', 'east', 'south', 'west'];
    const moveMap = {
        north: { x: 0, y: 1 },
        east: { x: 1, y: 0 },
        south: { x: 0, y: -1 },
        west: { x: -1, y: 0 },
    };

    const turnFacing = (command) => {
        const { facing } = current;

        current.facing = command === TURN_RIGHT ? (facing + 1) % 4 : (facing - 1 + 4) % 4;
    };

    const current = { facing: 0, x: 0, y: 0 };
    const obstaclesSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));
    let result = 0;

    for (const command of commands) {
        if (command === TURN_RIGHT || command === TURN_LEFT) {
            turnFacing(command);
            continue;
        }
        for (let step = 1; step <= command; step++) {
            const move = moveMap[directions[current.facing]];
            const nextX = current.x + move.x
            const nextY = current.y + move.y

            if (obstaclesSet.has(`${nextX},${nextY}`)) break;
            current.x = nextX;
            current.y = nextY;
            result = Math.max(nextX ** 2 + nextY ** 2, result);
        }
    }
    return result;
};