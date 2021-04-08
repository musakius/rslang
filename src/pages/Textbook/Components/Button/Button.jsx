import React from "react";
import { Link } from "react-router-dom";

const Button = ({ path, text, style }) => {
  return (
    <div className='btn btn-info'>
      <Link className='text-white' to={path}>
        {" "}
        <i className={`${style} mr-2`}></i>
        {text}
      </Link>
    </div>
  );
};

export default Button;
