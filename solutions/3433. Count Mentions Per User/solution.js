/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
const countMentions = function (numberOfUsers, events) {
  const offlines = Array.from({ length: numberOfUsers }, () => -1);
  const result = Array.from({ length: numberOfUsers }, () => 0);

  events.sort((a, b) => {
    if (a[1] === b[1] && a[0] === 'OFFLINE') return -1;

    return a[1] - b[1];
  });

  const mentionAllUsers = () => {
    for (let user = 0; user < numberOfUsers; user++) {
      result[user] += 1;
    }
  };

  const mentionOnlineUsers = timestamp => {
    for (let user = 0; user < numberOfUsers; user++) {
      const offline = offlines[user];

      if (offline > -1 && offline + 60 > timestamp) continue;

      offlines[user] = -1;
      result[user] += 1;
    }
  };

  const mentionUsers = mentions => {
    const ids = mentions.split(' ');

    for (const id of ids) {
      const user = id.replace('id', '');

      result[user] += 1;
    }
  };

  const mentionMap = { ALL: mentionAllUsers, HERE: mentionOnlineUsers };

  for (const event of events) {
    const [type, timestamp, mentions] = event;

    if (type === 'MESSAGE') {
      const mention = mentionMap[mentions];

      mention?.(timestamp) ?? mentionUsers(mentions);
    } else {
      offlines[mentions] = Number(timestamp);
    }
  }

  return result;
};
