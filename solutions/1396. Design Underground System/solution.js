const UndergroundSystem = function () {
  this.checkMap = new Map();
  this.timeMap = new Map();
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.checkMap.set(id, { stationName, time: t });
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  const { stationName: startStation, time } = this.checkMap.get(id);
  const spendTime = t - time;
  const station = `${startStation}_${stationName}`;
  const { total, count } = this.timeMap.get(station) ?? { total: 0, count: 0 };

  this.checkMap.delete(id);
  this.timeMap.set(station, { total: total + spendTime, count: count + 1 });
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (startStation, endStation) {
  const { total = 0, count = 1 } = this.timeMap.get(`${startStation}_${endStation}`);

  return total / count;
};
