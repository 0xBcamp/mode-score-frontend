// components/ui/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="border bg-background rounded p-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(1)}
          className="mx-1 px-2 bg-background py-1 border rounded"
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 px-2 bg-background py-1 border rounded"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-gradient-to-tr from-yellow-400 via-yellow-400 to-white text-gray-800' : 'bg-background text-primary'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="mx-1 px-2 py-1 bg-background border rounded"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          className="mx-1 px-2 py-1 bg-background border rounded"
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
