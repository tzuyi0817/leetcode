const sortableIntegers = function (nums) {
  const n = nums.length;
  const dropPos = [];
  let result = 0;

  for (let index = 0; index < n - 1; index++) {
    if (nums[index] > nums[index + 1]) {
      dropPos.push(index);
    }
  }

  if (!dropPos.length) {
    for (let k = 1; k <= n; k++) {
      if (n % k === 0) {
        result += k;
      }
    }

    return result;
  }

  const isSortable = k => {
    let prevMax = Number.MIN_SAFE_INTEGER;

    for (let index = 0; index < n; index += k) {
      const end = index + k - 1;
      let drop = -1;

      for (const pos of dropPos) {
        if (pos >= index && pos <= end) {
          if (drop !== -1) return false;

          drop = pos;
        }
      }

      let currentMin;
      let currentMax;

      if (drop === -1) {
        currentMin = nums[index];
        currentMax = nums[end];
      } else {
        if (nums[end] > nums[index]) return false;

        currentMin = nums[drop + 1];
        currentMax = nums[drop];
      }

      if (currentMin < prevMax) return false;

      prevMax = currentMax;
    }

    return true;
  };

  for (let k = 1; k <= n; k++) {
    if (n % k === 0 && isSortable(k)) {
      result += k;
    }
  }

  return result;
};
