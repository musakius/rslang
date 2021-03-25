import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Statistics.module.scss';

const audioWord = (url) => {
  const audio = new Audio(`https://apprslang.herokuapp.com/${url}`);
  audio.play();
};

const Statistics = ({results}) => {
  const countWords = (bool) => {
    return results.reduce(
      (count, {correctAnswer}) => (correctAnswer === bool ? count + 1 : count),
      0
    );
  };

  return (
    <section className={classes['container-statistics']}>
      <div className={classes['block-icons']}>
        <div className={`${classes.left} text-success`}>
          <i className="fas fa-smile text-success"></i>
          <span className={`${classes.results} text-success`}>{`${countWords(true)}`}</span>
        </div>
        <div className={`${classes.right} text-danger`}>
          <i className="fas fa-frown text-danger"></i>
          <span className={classes.results}>{`${countWords(false)}`}</span>
        </div>
      </div>
      <ul className={classes['results-words']}>
        {results.map(({word, transcription, wordTranslate, audio, correctAnswer}) => (
          <li key={word} className={`${correctAnswer ? 'bg-success' : 'bg-danger'}`}>
            <div className="align-items-center">
              <i className="fas fa-volume-up" onClick={() => audioWord(audio)}></i>
              <p>{`${word}`}</p>
              <p>{`${transcription}`}</p>
              <p>{`${wordTranslate}`}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes['block-close']}>
        <Link to="../games">
          <button type="button" class="btn btn-info py-2 px-3">
            К списку мини-игр
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Statistics;
