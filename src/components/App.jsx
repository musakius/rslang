import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Games from '../pages/Games';
import Main from '../pages/Main';
import Page404 from '../pages/Page404';
import Stat from '../pages/Statistics';
import Textbook from '../pages/Textbook';
import Header from './Header';
import Sprint from '../pages/Sprint';
import Dictionary from '../pages/Textbook/Components/Dictionary/Dictionary';
import Savanna from '../pages/Games/Savanna/Savanna';
import VoiceGame from '../pages/Games/VoiceGame/VoiceGame';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/textbook" render={() => <Textbook />} />
        <Route path="/dictionary" render={() => <Dictionary />} />
        <Route path="/games" exact render={() => <Games />} />
        <Route path="/games/sprint" render={() => <Sprint />} />
        <Route path="/games/savanna" render={() => <Savanna />} />
        <Route path="/games/voice" render={() => <VoiceGame />} />
        <Route path="/stat" render={() => <Stat />} />
        <Route render={() => <Page404 />} />
      </Switch>
    </>
  );
};

export default App;
