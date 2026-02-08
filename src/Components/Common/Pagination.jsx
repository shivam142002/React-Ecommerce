import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const { mode } = useTheme();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-pink-600 text-white hover:bg-pink-700'
        }`}
        style={{
          backgroundColor:
            currentPage === 1
              ? mode === 'dark'
                ? 'rgb(55 65 81)'
                : '#d1d5db'
              : mode === 'dark'
              ? 'rgb(219 39 119)'
              : '',
          color: currentPage === 1 ? (mode === 'dark' ? '#9ca3af' : '') : '',
        }}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              page === currentPage
                ? 'bg-pink-600 text-white'
                : page === '...'
                ? 'cursor-default'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{
              backgroundColor:
                page === currentPage
                  ? mode === 'dark'
                    ? 'rgb(219 39 119)'
                    : ''
                  : page === '...'
                  ? 'transparent'
                  : mode === 'dark'
                  ? 'rgb(55 65 81)'
                  : '',
              color:
                page === currentPage
                  ? 'white'
                  : mode === 'dark'
                  ? 'white'
                  : '',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-pink-600 text-white hover:bg-pink-700'
        }`}
        style={{
          backgroundColor:
            currentPage === totalPages
              ? mode === 'dark'
                ? 'rgb(55 65 81)'
                : '#d1d5db'
              : mode === 'dark'
              ? 'rgb(219 39 119)'
              : '',
          color:
            currentPage === totalPages
              ? mode === 'dark'
                ? '#9ca3af'
                : ''
              : '',
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;