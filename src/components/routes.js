import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Games from '../pages/Games';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Page404 from '../pages/Page404';
import Register from '../pages/Register';
import GameSprint from '../pages/GameSprint';
import GameMemory from '../pages/GameMemory';
import Stat from '../pages/Statistics';
import Textbook from '../pages/Textbook';
import Dictionary from '../pages/Dictionary';
import Savanna from '../pages/Games/Savanna/Savanna';
import VoiceGame from '../pages/Games/VoiceGame/VoiceGame';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact render={() => <Main />} />
        <Route path="/textbook" render={() => <Textbook />} />
        <Route path="/dictionary" render={() => <Dictionary />} />
        <Route path="/games" exact render={() => <Games />} />
        <Route path="/games/sprint" render={() => <GameSprint />} />
        <Route path="/games/memory" render={() => <GameMemory />} />
        <Route path="/stat" render={() => <Stat />} />
        <Route path="/games/savanna" render={() => <Savanna />} />
        <Route path="/games/voice" render={() => <VoiceGame />} />
        <Redirect to="/" />
        <Route render={() => <Page404 />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/login" exact render={() => <Login />} />
      <Route path="/register" exact render={() => <Register />} />
      <Redirect to="/login" />
    </Switch>
  );
};
