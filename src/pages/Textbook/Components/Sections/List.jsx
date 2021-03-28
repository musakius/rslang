import React from "react";
import { Link } from "react-router-dom";

const List = ({ item, style, path, value }) => {
  return (
    <li className={style}>
      <Link id={value} className='text-white' to={path}>
        {item}
      </Link>
    </li>
  );
};

export default List;
