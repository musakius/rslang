import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import classes from './StartScreen.module.scss';

import SwitcherLevel from '../SwitcherLevel';

const StartScreen = ({setInitGame, setLevel, setLearnedWords, level, learnedWords}) => {
  const changeLevel = useCallback(
    (levelProps) => {
      if (level !== levelProps) {
        setLevel(levelProps);
      }
    },
    [level]
  );

  /* const onExit = useCallback(() => {
    dispatch(setDefault());
  }, [dispatch]); */

  return (
    <section className={classes['container-start-screen']}>
      <Link to="../games">
        <img className="cross" src="/assets/images/sprint/cross.svg" alt="close" />
      </Link>
      <div className="center_alignment">
        <div className="wrapper-switcher">
          <SwitcherLevel changeLevel={changeLevel} />
          <div className="mode_wrapper">
            <p className="mode_description">Только из словаря:</p>
            <label htmlFor="mode" className="CheckboxContainer">
              <input
                name="mode"
                id="mode"
                type="checkbox"
                onChange={() => {
                  setLearnedWords(!learnedWords);
                }}
              />
              <span className="Checkmark" />
            </label>
          </div>
        </div>
        <h1 className="title_h2">Спринт</h1>

        <div className="game_description">
          Учит быстро переводить с английского на русский. Для этой тренировки используются слова из
          вашего словаря и случайные слова.
        </div>
        <form>
          <button className="start_btn" onClick={() => setInitGame(true)}>
            Start
          </button>
        </form>
      </div>
      <img
        className="decoration"
        src="/assets/images/sprint/sprint_StartScreen.svg"
        alt="running man"
      />
    </section>
  );
};

export default StartScreen;
