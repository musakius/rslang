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
      <div className={`${classes['block-icons']}`}>
        <div className={`${classes.left} text-success`}>
          <i className="fas fa-smile text-success"></i>
          <span className={`${classes.results} text-success`}>{`${countWords(true)}`}</span>
        </div>
        <div className={`${classes.right} text-danger`}>
          <i className="fas fa-frown text-danger"></i>
          <span className={classes.results}>{`${countWords(false)}`}</span>
        </div>
        <Link to="../games">
          <button type="button" className={`${classes.close} btn btn-outline-secondary`}>
            <i className="fas fa-times"></i>
          </button>
        </Link>
      </div>
      <table className={`${classes['results-words']} table`}>
        <thead>
          <tr className="table-dark">
            <th scope="col">Pronounce</th>
            <th scope="col">Word</th>
            <th scope="col">Transcription</th>
            <th scope="col">Translation</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({word, transcription, wordTranslate, audio, correctAnswer}) => (
            <tr key={word} className={`${correctAnswer ? 'table-success' : 'table-danger'}`}>
              <td>
                <i className="fas fa-volume-up" onClick={() => audioWord(audio)}></i>
              </td>
              <td>
                <p>{`${word}`}</p>
              </td>
              <td>
                <p>{`${transcription}`}</p>
              </td>
              <td>
                <p>{`${wordTranslate}`}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Statistics;
