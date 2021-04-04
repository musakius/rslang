import React, { useEffect } from 'react';
import Button from '../Textbook/Components/Button';
import Tabs from './Components/Tabs';
import Sections from '../Textbook/Components/Sections';
import TabContent from './Components/TabContent';
import Links from '../Textbook/Components/Links';

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
          <div className="col-md-6">
            <TabContent />
          </div>
          <div className="col-md-3">
            <div className="container">
              <biv className="card-body">
                <Button
                  path={`/textbook/group/${currentGroup}`}
                  text="Учебник"
                  style={'fab fa-leanpub'}
                />
              </biv>
              <div className="card-body">
                <Links />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
