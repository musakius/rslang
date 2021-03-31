import React from "react";
import { Link } from "react-router-dom";

const Button = ({ path, text, style }) => {
  return (
    <div className='btn btn-info'>
      <Link className='text-white' to={path}>
        {" "}
        <i className={style}></i>
        &nbsp;{text}
      </Link>
    </div>
  );
};

export default Button;
