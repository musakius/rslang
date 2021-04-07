import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import SectionContent from '../../../Textbook/Components/SectionContent';

const TabContent = ({ dictionarySection, setPage }) => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/group/:group`}>
        <SectionContent
          setCurrentPage={setPage}
          dictionarySection={dictionarySection}
          mode="dictionary"
        />
      </Route>
      {/* <Redirect to='/textbook/group/0' /> */}
    </Switch>
  );
};

export default TabContent;
