import React from 'react';
import Pagination from "react-js-pagination";


const PaginationComponent = ({page, handlePageChange}) => {


    return (
        <div >
            <Pagination
            className="text-white"
              activePage={+page}
              itemsCountPerPage={1}
              totalItemsCount={30}
              pageRangeDisplayed={5}
              onChange={(e) => handlePageChange(e)}
            />
          </div>
    );
}

export default PaginationComponent;
