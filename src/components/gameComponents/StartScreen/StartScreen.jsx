import React from 'react';
import {Link} from 'react-router-dom';
import classes from './StartScreen.module.scss';

import SwitcherLevel from '../SwitcherLevel';

const StartScreen = ({
  name,
  iconName,
  description,
  setInitGame,
  setLevel,
  level,
}) => {
  return (
    <section className={classes['container-start-screen']}>
      <Link to="../games">
        <i className={`${classes.cross} fas fa-arrow-left`}></i>
      </Link>
      <div className={classes['center-alignment']}>
        <h1 className={classes['title']}>
          <i className={iconName}></i>
          {name}
          <i className={iconName}></i>
        </h1>
        <p className={classes['game-description']}>{description}</p>
        <div className={classes['wrapper-switcher']}>
          <SwitcherLevel setLevel={setLevel} level={level} />
        </div>
        <form className="mt-3">
          <button type="button" className="btn btn-info btn-lg" onClick={() => setInitGame(true)}>
            Начать игру
          </button>
        </form>
      </div>
    </section>
  );
};

export default StartScreen;
