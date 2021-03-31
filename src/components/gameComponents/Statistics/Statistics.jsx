import React, {useEffect} from 'react';
import Pronounce from '../Pronounce';
import {Link} from 'react-router-dom';

import classes from './Statistics.module.scss';

const Statistics = ({results, setSoundStatus, soundStatus}) => {
  useEffect(() => {
    setSoundStatus(true);
  }, []);

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
            <th scope="col">Произношение</th>
            <th scope="col">Слово</th>
            <th scope="col">Транскрипция</th>
            <th scope="col">Перевод</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({word, transcription, wordTranslate, audio, correctAnswer}) => (
            <tr key={word} className={`${correctAnswer ? 'table-success' : 'table-danger'}`}>
              <td>
                <Pronounce audio={audio} soundStatus={soundStatus} />
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
