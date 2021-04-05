import React, { useEffect } from 'react';
import Button from '../Textbook/Components/Button';
import Tabs from './Components/Tabs';
import Sections from '../Textbook/Components/Sections';
import TabContent from './Components/TabContent';
import Links from '../Textbook/Components/Links';
import { connect } from 'react-redux';
import { setGameInfo } from '../../redux/actions';

const Dictionary = ({ setGameInfo }) => {
  const currentGroup = localStorage.getItem('textbookGroup') || 0;
  useEffect(() => {
    localStorage.setItem('userPage', 'dictionary');
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);
  const setInfo = (event) => {
    const tag = event.target.tagName.toUpperCase();
    if (tag !== 'A' && tag !== 'I') {
      return;
    }
    setGameInfo(0, 0, 'dictionary');
  };
  return (
    <div className="container mt-5">
      <div className="jumborton">
        <div className="row">
          <Tabs />
          <div className="col-md-3">
            <Sections mode="dictionary" />
          </div>
          <div className="col-md-6">
            <TabContent />
          </div>
          <div className="col-md-3">
            <div className="container-fluid">
              <div className="card-body pt-0">
                <Button
                  path={`/textbook/group/${currentGroup}`}
                  text="Учебник"
                  style={'fab fa-leanpub'}
                />
              </div>
              <div className="card-body">
                <Links setInfo={setInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setGameInfo,
};

export default connect(null, mapDispatchToProps)(Dictionary);
