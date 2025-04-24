/**
 * @param {number[][]} customers
 * @return {number}
 */
const averageWaitingTime = function (customers) {
  let wait = 0;
  let prepare = 0;

  for (const [arrival, time] of customers) {
    prepare = Math.max(arrival, prepare) + time;
    wait += prepare - arrival;
  }
  return wait / customers.length;
};
