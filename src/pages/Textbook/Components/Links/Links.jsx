import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
  return (
    <div className="card border-info mb-3">
      <div className="card-header">
        <i className="fas fa-dice mr-2"></i>
        Мини-игры
      </div>
      <div className="card-body">
        <ul className='list-group'>
          <li className='list-group-item list-group-item-action d-flex justify-content-start align-items-baseline'>
            <Link className="text-white" to="/games/sprint">
              <i className='fas fa-running mr-2'></i>
              {'Sprint'}
            </Link>
          </li>
          <li className='list-group-item list-group-item-action d-flex justify-content-start align-items-baseline'>
            <Link className="text-white" to="/games/memory">
              <i className='fas fa-th mr-2'></i>
              {'Memory'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Links;
