import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { items } from "../../pages/Textbook/config";
import { connect } from "react-redux";
import { setTextbookGroup } from "../../redux/actions";
import classes from "./Header.module.scss";

const Select = ({ textbookGroup, setTextbookGroup }) => {
  const [title, setTitle] = useState("Учебник");
  const [path, setPath] = useState('/textbook');

  useEffect(() => {
    setTitle((items.filter((item) => item.group === +textbookGroup))[0].item)
  }, [textbookGroup])

  const showMenu = () => {
    document.getElementById("btnSelect").classList.toggle("show");
  };

  const handleChange = (name, group) => {
    showMenu();
    setTitle(name);
    setPath(`/textbook/group/${group}`);
    setTextbookGroup(group);
  };
  return (
    <div
      className='btn-group'
      role='group'
      aria-label='Button group with nested dropdown'
    >
      <div type='button' className='btn btn-light nav-item'>
        <NavLink to={`${path}`} className='nav-link p-0'>
          <div className='text-secondary'>{title}</div>
        </NavLink>
      </div>
      <div className='btn-group' role='group'>
        <button
          id='btnMenu'
          type='button'
          className='btn btn-light dropdown-toggle'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
          onClick={() => showMenu()}
        ></button>
        <div id='btnSelect' className='dropdown-menu' aria-labelledby='btnMenu'>
          {items.map((item) => (
            <NavLink
              key={item.group}
              to={`/textbook/group/${item.group}`}
              className='dropdown-item'
              onClick={() => handleChange(item.item, item.group)}
            >
              {item.item}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setTextbookGroup,
};
const mapStateToProps = (state) => {
  return {
    textbookGroup: state.textbookGroup.value,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Select);
