/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
const maximumRequests = function (n, requests) {
  const indegree = Array.from({ length: n }, () => 0);
  let result = 0;

  const processRequest = (index, processed) => {
    if (index >= requests.length) {
      if (indegree.some(degree => degree !== 0)) return;

      result = Math.max(processed, result);
      return;
    }
    const [from, to] = requests[index];

    processRequest(index + 1, processed);
    indegree[from] -= 1;
    indegree[to] += 1;
    processRequest(index + 1, processed + 1);
    indegree[from] += 1;
    indegree[to] -= 1;
  };

  processRequest(0, 0);

  return result;
};
