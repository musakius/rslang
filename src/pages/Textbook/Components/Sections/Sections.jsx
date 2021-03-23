import React from 'react';
import Settings from '../Settings/Settings';
import { Link } from 'react-router-dom';

const Sections = () => {
    return (
        <div>
            <Settings/>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 1
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 2
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 3
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 4
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 5
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Раздел 6
                </li>
            </ul>
        </div>
    );
}

export default Sections;
