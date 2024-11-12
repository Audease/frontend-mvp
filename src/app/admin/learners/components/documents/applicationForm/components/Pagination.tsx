import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-3 py-1 rounded-md ${
            pageNumber === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onPageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;