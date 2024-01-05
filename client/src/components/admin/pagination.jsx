import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
           <div className="flex justify-end items-center gap-1 xl:gap-2 ">
      <button
        className="flex items-center sm:gap-1 xl:gap-2 px-6 py-3 font-sans 2xl:text-[16px] xl:text-[16px] lg:text-[12px] md:text-[12px] sm:text-[10px] font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          aria-hidden="true" className="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
        Previous
      </button>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${
              page === currentPage
                ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10'
                : 'text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
            } text-center align-middle font-sans 2xl:text-xl xl:text-[16px] lg:text-[12px] md:text-[12px] sm:text-[10px] font-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            <span className="absolute text-[black] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{page}</span>
          </button>
        ))}
      </div>
      <button
        className="flex items-center gap-2 px-6 py-3 font-sans 2xl:text-[16px] xl:text-[16px] lg:text-[12px] md:text-[12px] sm:text-[10px] font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          aria-hidden="true" className="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </button>
    </div>
    </>
  )
}

export default Pagination