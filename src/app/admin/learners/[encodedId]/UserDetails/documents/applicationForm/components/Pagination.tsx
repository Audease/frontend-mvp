import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageClick(currentPage + 1);
    }
  };

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 5; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 px-4 py-2 max-w-full">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>

      <div className="flex flex-wrap justify-center gap-1">
        {getVisiblePages().map((pageNumber, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md text-sm ${
              pageNumber === currentPage
                ? 'bg-tgrey3 text-white'
                : pageNumber === '...'
                ? 'bg-transparent cursor-default'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => typeof pageNumber === 'number' && onPageClick(pageNumber)}
            disabled={pageNumber === '...'}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;