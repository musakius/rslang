import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Games from '../pages/Games/Games';
import Main from '../pages/Main';
import Page404 from '../pages/Page404';
import Stat from '../pages/Statistics/Stat';
import Textbook from '../pages/Textbook/Textbook';
import Header from './Header/Header'

const App = () => {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/textbook" render={() => <Textbook/>} />
        <Route path="/games" render={() => <Games/>} />
        <Route path="/stat" render={() => <Stat/>} />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
