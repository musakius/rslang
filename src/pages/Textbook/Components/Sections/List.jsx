import React from 'react';
import { Link } from 'react-router-dom';

const List = ({item, style, path}) => {
    return (        
        <li className={style}>
            <Link to={path}>{item}</Link>
        </li>       
    );
}

export default List;
