exports.checkNullUndefinedSpace = (dataArray) => {
  if (!Array.isArray(dataArray)) throw new Error(9999);

  let isDataCheck = false;
  dataArray.every((item) => {
    if (typeof item === "number") return true;
    isDataCheck = !!item?.trim();
    return isDataCheck;
  });

  return isDataCheck;
};
