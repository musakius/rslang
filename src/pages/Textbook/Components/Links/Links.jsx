import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <div className='card border-info mb-3'>
      <div className='card-header'>
        <i className='fas fa-dice mr-2'></i>
        Мини-игры
      </div>
      <div className='card-body'>
        <Link className='text-white' to='/games'> Мини-игры </Link>
      </div>
    </div>
  );
};

export default Links;
