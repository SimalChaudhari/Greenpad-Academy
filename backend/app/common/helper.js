/**
* Common pagination for data list
*
* @param  Object paginateData
* @return Pagination details object
*/
const dataPagination = (paginateData = {}) => {

    let currentPage = parseInt(paginateData?.page) || 1;
    let pageSize = parseInt(paginateData?.pageSize) || 10;
    const offset = ((currentPage - 1) * pageSize);

    return { currentPage, limit: pageSize, offset };
};

const Helper = {
    dataPagination,
};

module.exports = Helper;