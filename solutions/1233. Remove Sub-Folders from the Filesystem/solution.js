/**
 * @param {string[]} folder
 * @return {string[]}
 */
const removeSubfolders = function (folder) {
  const n = folder.length;
  const result = [];

  folder.sort();

  for (const path of folder) {
    const previousPath = result.at(-1);

    if (previousPath && path.startsWith(`${previousPath}/`)) continue;

    result.push(path);
  }
  return result;
};
