import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import SectionContent from '../../../Textbook/Components/SectionContent';

const TabContent = ({ dictionarySection, setPage, setQueryFilter }) => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/group/:group`}>
        <SectionContent
          setCurrentPage={setPage}
          dictionarySection={dictionarySection}
          setQueryFilter={setQueryFilter}
          mode="dictionary"
        />
      </Route>
      <Redirect to='/dictionary/group/0' />
    </Switch>
  );
};

export default TabContent;
