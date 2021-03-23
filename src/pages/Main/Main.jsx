import React from 'react';
import Features from './components/Features/Features';
import Video from './components/Video/Video';
import Team from './components/Team/Team';

import classes from './Main.module.scss';

const Main = () => {
  return <main className={classes['container-main']}>
    <Features/>
    <Video/>
    <Team/>
  </main>;
};

export default Main;
