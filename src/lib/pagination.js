exports.calculatePagination = (totalCount, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  let startPage;

  if (currentPage <= 3) {
    startPage = 1;
  } else {
    startPage = currentPage - 3 + 1;
  }

  let pageList = [];
  for (let i = 0; i < itemsPerPage; i++) {
    if (startPage + i <= totalPages) {
      pageList.push(startPage + i);
    }
  }

  return pageList;
};
