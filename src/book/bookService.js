const bookRepository = require("./bookRepository");
const pagination = require("../lib/pagination");

exports.getBookList = async () => {
  try {
    const result = await bookRepository.findAllBook();

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookListAndCategoryCount = async (page, category) => {
  try {
    let start = 0;
    const pageSize = 5;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }

    const bookListResult = await bookRepository.findBookOrderByPage(
      start,
      pageSize,
      category,
    );
    const paginationObject = {};

    let allCount = 0;
    /** 모든 책 갯수: 페이지 네이션 계산용 */
    if (category === undefined) {
      allCount = await bookRepository.countAllBook();
    } else {
      /** 카테고리에 해당하는 책 갯수: 페이지 네이션 계산용 */
      allCount = await bookRepository.countAllBookByCategory(category);
    }

    paginationObject.currentPage = parseInt(page);
    paginationObject.paginationArray = pagination.calculatePagination(
      allCount,
      pageSize,
      page,
    );

    /** category_name, category_count */
    const categoryCountResult = await bookRepository.findCategoryCount();

    const result = [paginationObject, bookListResult, categoryCountResult];

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookView = async (bookId, tocId) => {
  try {
    const tocListResult = await bookRepository.findTocList(bookId);
    const tocContentResult = await bookRepository.findTocContent(tocId);

    const bookData = await bookRepository.findBookByUserId(bookId);

    const duplicationCheckResult = await bookRepository.findBookViewsList(
      bookId,
      userUid,
    );

    if (duplicationCheckResult === 0) {
      const bookViews = await bookRepository.updateBookViewsByBookId(
        bookId,
        userUid,
      );
    }

    const result = [tocListResult, tocContentResult, bookData];
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookDelete = async (bookId, bookWriter) => {
  try {
    const result = await bookRepository.deleteByIdAndWriter(bookId, bookWriter);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postBookTocWrite = async (
  userId,
  bookTitle,
  bookCategory,
  bookToc,
  bookSummary,
  bookImage,
) => {
  try {
    const createCategory = await bookRepository.insertCategory(bookCategory);

    const createdBookInsertId = await bookRepository.insertBook(
      userId,
      bookTitle,
      bookCategory,
      bookToc,
      bookSummary,
      bookImage,
    );

    // 책 생성 안됨.
    if (createdBookInsertId === 0) throw new Error(4000);

    const tocArr = bookToc.split("\r\n");
    const createdToc = await bookRepository.insertToc(
      createdBookInsertId,
      tocArr,
    );
    if (createdToc === 0) throw new Error(4003);

    return createdBookInsertId;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookTocView = async (bookId) => {
  try {
    const resultArr = await bookRepository.findBookAndToc(bookId);

    if (resultArr.length === 0) throw new Error(4004);

    const result = resultArr.reduce((acc, row) => {
      acc.book_uid = row.book_uid;
      acc.book_writer = row.book_writer;
      acc.book_category = row.book_category;
      acc.book_title = row.book_title;

      const tocTempArr = {
        toc_uid: row.toc_uid,
        toc_title: row.book_toc,
      };

      if (acc.book_toc) {
        acc.book_toc.push(tocTempArr);
      } else {
        acc.book_toc = [tocTempArr];
      }
      acc.book_summary = row.book_summary;

      return acc;
    }, {});

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookTocModify = async (bookId) => {
  try {
    const result = await bookRepository.findBookById(bookId);

    if (!result) throw new Error(4004);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postBookTocModify = async (bookId, bookToc, bookSummary) => {
  try {
    if (!bookId?.trim() || !bookToc?.trim() || !bookSummary?.trim())
      throw new Error(4005);

    const updatedBook = await bookRepository.updateBookAndToc(
      bookId,
      bookToc,
      bookSummary,
    );

    const deleteResult = await bookRepository.deleteTocById(bookId);
    if (deleteResult === 0) throw new Error(4004);

    const tocArr = bookToc.split("\r\n");

    const updatedToc = await bookRepository.insertToc(bookId, tocArr);
    if (updatedToc === 0) throw new Error(4004);
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookPageView = async (bookId, tocId) => {
  try {
    const result = await bookRepository.findPageByBookId(bookId, tocId);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postBookPageModify = async (bookId, tocId, tocContent) => {
  try {
    const result = await bookRepository.updatePage(bookId, tocId, tocContent);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookSearch = async (bookSearch, page) => {
  try {
    let start = 0;
    const pageSize = 5;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }

    const result = await bookRepository.findBookByBookTitleOrderByPage(
      bookSearch,
      start,
      pageSize,
    );

    const paginationObject = {};

    /** 해당 검색 결과에 맞는 책 갯수: 페이지 네이션 계산용 */
    const allCount = await bookRepository.countAllSearchBook(bookSearch);

    paginationObject.currentPage = parseInt(page);
    paginationObject.paginationArray = pagination.calculatePagination(
      allCount,
      pageSize,
      page,
    );

    return [paginationObject, result];
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookLikes = async (bookId, userUid) => {
  try {
    const duplicationCheckResult = await bookRepository.findBookLikesList(
      bookId,
      userUid,
    );
    if (duplicationCheckResult !== 0) throw new Error(4040);

    const result = await bookRepository.updateBookLikesByBookId(
      bookId,
      userUid,
    );

    if (!result) throw new Error(4041);
  } catch (e) {
    throw new Error(e.message);
  }
};
