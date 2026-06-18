/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
const angleClock = function (hour, minutes) {
  const HOUR_ANGLE = 360 / 12;
  const hourAngle = (hour % 12) * HOUR_ANGLE + (minutes / 60) * HOUR_ANGLE;
  const minutesAngle = (minutes / 5) * HOUR_ANGLE;
  const diffAngle = Math.abs(hourAngle - minutesAngle);

  return Math.min(diffAngle, 360 - diffAngle);
};
