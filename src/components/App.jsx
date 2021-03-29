import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Games from '../pages/Games';
import Main from '../pages/Main';
import Page404 from '../pages/Page404';
import Stat from '../pages/Statistics';
import Textbook from '../pages/Textbook';
import Header from './Header';
import GameSprint from '../pages/GameSprint';
import GameMemory from '../pages/GameMemory';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/textbook" render={() => <Textbook />} />
        <Route path="/games" exact render={() => <Games />} />
        <Route path="/games/sprint" render={() => <GameSprint />} />
        <Route path="/games/memory" render={() => <GameMemory />} />
        <Route path="/stat" render={() => <Stat />} />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
