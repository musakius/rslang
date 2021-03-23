import React from 'react';
import Dictionary from './Components/Dictionary/Dictionary';
import Links from './Components/Links/Links';
import Pagination from './Components/Pagination/Pagination';
import Sections from './Components/Sections/Sections';

const Textbook = () => {
    return (
        <div className='container-fluid'>
            <div class="row">
                <div class="col-md-2">
                    <Sections/>
                </div>
                <div class="col-md-10">           
                    <Dictionary/>
                    <Links/>
                    <Pagination/>
                </div>
            </div>

        </div>
    );
}

export default Textbook;
