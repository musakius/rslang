import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Dictionary from "./Components/Dictionary/Dictionary";
import Links from "./Components/Links/Links";
import Pagination from "./Components/Pagination/Pagination";
import SectionContent from "./Components/SectionContent";
import Sections from "./Components/Sections/Sections";

const Textbook = () => {
  const { url } = useRouteMatch();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <Sections />
        </div>
        <div className='col-md-10'>
          <Switch>
            <Route path={`${url}/:section`}>
              <SectionContent />
            </Route>
          </Switch>
          <Dictionary />
          <Links />
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Textbook;
