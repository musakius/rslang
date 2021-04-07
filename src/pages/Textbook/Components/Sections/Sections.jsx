import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import Settings from '../Settings/Settings';
import { items } from '../../config';
import List from './List';
import { changeTheme } from '../../../../redux/actions';

const Sections = ({ mode, changeTheme, setGroup = () => {} }) => {
  const { url } = useRouteMatch();
  const savedGroup =
    mode === 'textbook'
      ? localStorage.getItem('textbookGroup') || 0
      : localStorage.getItem('dictionaryGroup') || 0;
  const [active, setActive] = useState(+savedGroup);
  let token = null;
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      token = user.token;
    }
  }
  const handleChange = (e) => {
    let target = '';
    if (e.target.tagName.toUpperCase() !== 'A') {
      return;
    } else {
      target = e.target;
    }
    const id = target.id;
    const theme = items.filter((item) => item.group === +id)[0].style;
    changeTheme(theme);
    setGroup(+id);
    setActive(+id);
  };

  return (
    <div className="container-fluid">
      {mode === 'textbook' ? token ? <Settings /> : null : null}
      <div className="card border-info mb-3">
        <div className="card-header">
          <i className="fas fa-list-ul mr-2"></i>
          Меню
        </div>
        <div className="card-body">
          <ul className="list-group" onClick={(e) => handleChange(e)}>
            {items.map((item) => (
              <List
                item={item.item}
                value={item.group}
                style={{
                  li: `list-group-item list-group-item-action d-flex justify-content-start align-items-baseline ${
                    item.group === active ? 'active' : ''
                  }`,
                  i: `text-${item.style}`,
                }}
                path={`${url}/group/${item.group}`}
                key={item.group}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  changeTheme,
};

export default connect(null, mapDispatchToProps)(Sections);
