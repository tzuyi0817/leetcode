/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
const numberOfRounds = function (loginTime, logoutTime) {
  const calculateMinutes = time => {
    const [hours, minutes] = time.split(':');

    return hours * 60 + +minutes;
  };
  const ROUND_MINUTES = 15;
  const loginMinutes = calculateMinutes(loginTime);
  const logoutMinutes = calculateMinutes(logoutTime);

  if (loginMinutes < logoutMinutes && logoutMinutes - loginMinutes < ROUND_MINUTES) return 0;
  const MAX_ROUND = calculateMinutes('24:00') / ROUND_MINUTES;
  const startRound = Math.ceil(loginMinutes / ROUND_MINUTES);
  const endRound = Math.floor(logoutMinutes / ROUND_MINUTES);

  return endRound >= startRound ? endRound - startRound : endRound + MAX_ROUND - startRound;
};
