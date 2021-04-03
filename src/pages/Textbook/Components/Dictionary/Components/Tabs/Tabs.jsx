import React, { useState } from 'react';
import { dictionaryItems } from '../../../../config';

const Tabs = () => {
  const savedSection = localStorage.getItem('dictionarySection') || 0;
  const [active, setActive] = useState(+savedSection);

  const openTab = (id) => {
    setActive(id);
    localStorage.setItem('dictionarySection', active);
  };
  return (
    <div className="container mb-5">
      <ul className="nav nav-tabs d-flex justify-content-center">
        {dictionaryItems.map((item) => (
          <li className="nav-item" key={item.id}>
            <a
              className={`nav-link ${item.id === active ? 'active text-primary font-weight-bold' : ''}`}
              data-toggle="tab"
              href={`#${item.item.trim().replace(' ', '_')}`}
              key={item.id}
              onClick={() => openTab(item.id)}
            >
              <i className={item.style}></i>
              {item.item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
