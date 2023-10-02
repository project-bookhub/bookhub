exports.checkNullUndefinedSpace = (dataArray) => {
  if (!Array.isArray(dataArray)) throw new Error(9999);

  let isDataCheck = false;
  dataArray.every((item) => {
    isDataCheck = !!item?.trim();
    return isDataCheck;
  });

  return isDataCheck;
};
