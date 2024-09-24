/**
 * @param {string[]} names
 * @return {string[]}
 */
const getFolderNames = function (names) {
  const folderMap = new Map();

  return names.map(name => {
    if (folderMap.has(name)) {
      let count = folderMap.get(name);

      while (folderMap.has(`${name}(${count})`)) count += 1;
      const uniqueName = `${name}(${count})`;

      folderMap.set(name, count + 1);
      folderMap.set(uniqueName, 1);
      return uniqueName;
    } else {
      folderMap.set(name, 1);
      return name;
    }
  });
};
