import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { items } from '../../pages/Textbook/config';
import classes from './Header.module.scss';

const Select = () => {
  const [title, setTitle] = useState('Учебник');

  useEffect(() => {
    showMenu();
  }, [title]);
  const showMenu = () => {
    document.getElementById('btnSelect').classList.toggle('show')
    console.log('tt');
  }
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <div type="button" className="btn btn-light nav-item">
        <NavLink to="/textbook" className="nav-link p-0">
          <div  className='text-secondary'>{title}</div>
        </NavLink>
      </div>
      <div className="btn-group" role="group">
        <button
          id="btnMenu"
          type="button"
          className="btn btn-light dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => showMenu()}
        ></button>
        <div id='btnSelect' className="dropdown-menu" aria-labelledby="btnMenu">
          {items.map((item) => (
            <NavLink key={item.group} to={`/textbook/group/${item.group}`} className="dropdown-item" onClick={() => setTitle(item.item)}>
              {item.item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
