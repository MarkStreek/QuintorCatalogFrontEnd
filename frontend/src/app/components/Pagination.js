import React, { useState } from 'react';


const Pagination = ({ total, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / itemsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    onPageChange(newPage); // Invoked to inform parent component of the page change
  };

  return (
    <div>
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {currentPage} / {totalPages}
      <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
