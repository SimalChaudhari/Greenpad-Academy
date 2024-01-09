import React, { useState } from "react";

const Table = ({ columns, data, actions }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Update the search query state
    setCurrentPage(1); // Reset current page when the search query changes
  };

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : data;

  const filteredData = searchQuery
    ? sortedData.filter((item) =>
        columns.some((column) =>
          item[column.key]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      )
    : sortedData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexColumn = { key: "index", label: "#" };

  return (
    <>
      <div className="table-responsive">
        <div className="search_course mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="box_shadow"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fas fa-search" style={{ top: "185px", right: "40px" }}></i>
        </div>
        <table className="full_width white_bg text-center" style={{ overflowY: "auto" }}>
          <thead>
            <tr className="black_bg">
              {/* Render the index column */}
              <th className="color_white text-center" key={indexColumn.key}>
                {indexColumn.label}
              </th>
              {/* Render the remaining columns */}
              {columns && columns.map((column) => (
                <th
                  className="color_white"
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                >
                  {column.label}
                </th>
              ))}
              {actions && <th className="color_white">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr className="white_bg" key={index}>
                {/* Render the index value */}
                <td className="p-0 text-center">{startIndex + index + 1}</td>
                {/* Render the remaining cells */}
                {columns.map((column) => (
                  <td className="p-0" key={column.key}>
                    {item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-0">
                    {actions.map((action, index) => (
                      <button
                        // href="#"
                        // data-toggle="modal"
                        // data-target="#myModal"
                        key={index}
                        className={`btn btn-sm ${action.buttonClassName}`}
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="mt-3" />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <span>Show:</span>
            <select
              className="form-control"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {/* <option value={1}>1</option> */}
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Table;
