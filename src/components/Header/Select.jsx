import React from "react";
import { Link } from "react-router-dom";
import { items } from "../../pages/Textbook/config";

const Select = () => {
    console.log('items', items);
  return (
    <label>
      Учебник
      <select className='nav-item dropdown' value={""} onChange={() => {}}>
        {items.map((item) => (
          <option key={item.group} value={item.group}>
            <Link key={item.group} to={`/textbook/group/${item.group}`}>
              {item.item}
            </Link>
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
