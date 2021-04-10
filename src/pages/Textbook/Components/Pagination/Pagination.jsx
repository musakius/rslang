import React from "react";
import Pagination from "react-js-pagination";

const PaginationComponent = ({ page, handlePageChange, totalPages }) => {
  return (
    <div>
      <Pagination
        className='text-white'
        itemClass='page-item'
        linkClass='page-link'
        activePage={+page}
        itemsCountPerPage={1}
        totalItemsCount={totalPages}
        pageRangeDisplayed={5}
        onChange={(e) => handlePageChange(e)}
      />
    </div>
  );
};

export default PaginationComponent;
