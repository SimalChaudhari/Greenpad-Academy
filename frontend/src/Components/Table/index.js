import React, { useState } from "react";
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // Sorting icons

const Table = ({ columns, data, actions }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexColumn = { key: "index", label: "#" };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {/* Render the index column */}
              <th className="text-center" key={indexColumn.key}>
                {indexColumn.label}
              </th>
              {/* Render the remaining columns */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-center"
                  onClick={() => handleSort(column.key)}
                  style={{ cursor: "pointer" }}
                >
                  {column.label}{" "}
                  {sortColumn === column.key && (
                    sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
                  )}
                </th>
              ))}
              {actions && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentPageData.length > 0 ? (
              currentPageData.map((item, index) => (
                <tr key={index}>
                  {/* Render the index value */}
                  <td className="text-center">{startIndex + index + 1}</td>
                  {/* Render the remaining cells */}
                  {columns.map((column) => (
                    <td className="text-center" key={column.key}>
                      {item[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="text-center">
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm ${action.buttonClassName} me-1`}
                          onClick={() => action.onClick(item)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination and Items Per Page Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span>Show:</span>
            <select
              className="form-select d-inline-block ms-2"
              style={{ width: "auto" }}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <nav>
            <ul className="pagination m-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
