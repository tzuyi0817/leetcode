/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function(h, w, horizontalCuts, verticalCuts) {
    const MODULO = 10 ** 9 + 7;

    horizontalCuts.sort((a, b) => a - b);
    verticalCuts.sort((a, b) => a - b);

    let maxH = h - horizontalCuts.at(-1);
    let maxW = w - verticalCuts.at(-1);

    for (let index = 0; index < horizontalCuts.length; index++) {
        const cutH = horizontalCuts[index] - (horizontalCuts[index - 1] ?? 0);

        maxH =  Math.max(cutH, maxH);
    }
    for (let index = 0; index < verticalCuts.length; index++) {
        const cutW = verticalCuts[index] - (verticalCuts[index - 1] ?? 0);

        maxW =  Math.max(cutW, maxW);
    }
    return BigInt(maxH) * BigInt(maxW) % BigInt(MODULO);
};
