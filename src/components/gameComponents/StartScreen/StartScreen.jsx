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
  setLearnedWords,
  level,
  learnedWords
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
          <div className={classes['mode-wrapper']}>
            <p className={classes['mode-description']}>Только из словаря:</p>
            <label htmlFor="mode" className={classes['checkbox-container']}>
              <input
                name="mode"
                id="mode"
                type="checkbox"
                className={classes.checkbox}
                onChange={() => {
                  setLearnedWords(!learnedWords);
                }}
              />
              <span className={classes['check-mark']} />
            </label>
          </div>
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
