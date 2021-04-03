import React, { useEffect, useState } from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import Button from './Components/Button/Button';
import Description from './Components/Dictionary/Components/Description';
import SectionContent from './Components/SectionContent';
import Sections from './Components/Sections/Sections';

const Textbook = () => {
  const { url } = useRouteMatch();
  const savedGroup = localStorage.getItem('textbookGroup') || 0;
  const [group, setGroup] = useState(savedGroup);

  useEffect(() => {
    localStorage.setItem('userPage', 'textbook');
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);

  return (
    <div className="container mt-5">
      <div className="jumborton">
        <div className="nav nav-tabs d-flex justify-content-center mb-5">
          <Description group={group} />
        </div>
        <div className="row">
          <div className="col-md-3">
            <Sections mode="textbook" setGroup={setGroup} />
          </div>
          <div className="col-md-7">
            <Switch>
              <Route path={`${url}/group/:group`}>
                <SectionContent />
              </Route>
              <Redirect to="/textbook/group/0" />
            </Switch>
          </div>
          <div className="col-md-2">
            <Button path={`/dictionary`} text="Словарь" style="fas fa-book" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textbook;
