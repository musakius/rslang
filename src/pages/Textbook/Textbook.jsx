import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Button from "./Components/Button/Button";
import SectionContent from "./Components/SectionContent";
import Sections from "./Components/Sections/Sections";

const Textbook = () => {
  const { url } = useRouteMatch();
  return (
    <div className='container mt-5'>
      <div className='jumborton'>
        <div className='row'>
          <div className='col-md-3'>
            <Sections />
          </div>
          <div className='col-md-7'>
            <Switch>
              <Route path={`${url}/group/:group`}>
                <SectionContent />
              </Route>
            </Switch>
          </div>
          <div className='col-md-2'>
            <Button
              path={`/dictionary`}
              text='Словарь'
              style='fas fa-book'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textbook;
