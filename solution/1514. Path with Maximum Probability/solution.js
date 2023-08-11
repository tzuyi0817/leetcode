/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start_node, end_node) {
   const pathMap = edges.reduce((map, [a, b], index) => {
       const edgeA = map.get(a) ?? [];
       const edgeB = map.get(b) ?? [];

       edgeA.push({ to: b, probability: succProb[index] });
       edgeB.push({ to: a, probability: succProb[index] });
       map.set(a, edgeA);
       return map.set(b, edgeB);
   }, new Map());
   const queue = [{ from: start_node, probability: 1 }];
   const maxProbabilityMap = new Map([[start_node, 1]]);

   while (queue.length) {
       const size = queue.length;

       for (let index = 0; index < size; index++) {
           const { from, probability } = queue.shift();
           const toEdges = pathMap.get(from) ?? [];

           for (const toEdge of toEdges) {
               const nextProbability = probability * toEdge.probability;
               const maxProbability = maxProbabilityMap.get(toEdge.to) ?? 0;

               if (nextProbability <= maxProbability) continue;
               queue.push({ from: toEdge.to, probability: nextProbability });
               maxProbabilityMap.set(toEdge.to, nextProbability);
           }
       }
   }
   return maxProbabilityMap.get(end_node) ?? 0;
};
