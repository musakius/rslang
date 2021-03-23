import React from 'react';
import Dictionary from './Components/Dictionary/Dictionary';
import Links from './Components/Links/Links';
import Pagination from './Components/Pagination/Pagination';
import Sections from './Components/Sections/Sections';
import Settings from './Components/Settings/Settings';

const Textbook = () => {
    return (
        <div>
            <Sections/>
            <Dictionary/>
            <Settings/>
            <Links/>
            <Pagination/>
        </div>
    );
}

export default Textbook;
