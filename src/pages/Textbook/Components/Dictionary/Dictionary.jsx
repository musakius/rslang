import React, { useEffect } from 'react';
import Button from '../Button/Button';
import Tabs from './Components/Tabs';
import Sections from '../Sections/Sections';
import TabContent from './Components/TabContent';

const Dictionary = () => {
  const currentGroup = localStorage.getItem('textbookGroup') || 0;
  useEffect(() => {
    localStorage.setItem('userPage', 'dictionary');
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumborton">
        <div className="row">
          <Tabs />
          <div className="col-md-3">
            <Sections mode="dictionary" />
          </div>
          <div className="col-md-7">
            <TabContent />
          </div>
          <div className="col-md-2">
            <Button
              path={`/textbook/group/${currentGroup}`}
              text="Учебник"
              style={'fab fa-leanpub'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
