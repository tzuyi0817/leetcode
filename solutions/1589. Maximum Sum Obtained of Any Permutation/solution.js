/**
 * @param {number[]} nums
 * @param {number[][]} requests
 * @return {number}
 */
var maxSumRangeQuery = function(nums, requests) {
    const MODULO = 10 ** 9 + 7;
    const size = nums.length;
    const prefixRequest = Array(size).fill(0);

    requests.forEach(([start, end]) => {
        prefixRequest[start] += 1;
        end + 1 < size && (prefixRequest[end + 1] -= 1);
    });

    for (let index = 1; index < size; index++)
        prefixRequest[index] += prefixRequest[index - 1];
    
    nums.sort((a, b) => a - b);
    prefixRequest.sort((a, b) => a - b);

    return prefixRequest.reduce((result, count, index) => {
        return (result + count * nums[index]) % MODULO;
    }, 0);
};
