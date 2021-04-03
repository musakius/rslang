import React, {useEffect, useMemo} from 'react';
import Service from '../../../services';
import Pronounce from '../Pronounce';
import {Link} from 'react-router-dom';

import classes from './Statistics.module.scss';

const Statistics = ({results, setSoundStatus, soundStatus, keyName}) => {
  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setSoundStatus(true);
  }, []);

  const countWords = (bool) => {
    return results.reduce(
      (count, {correctAnswer}) => (correctAnswer === bool ? count + 1 : count),
      0
    );
  };

  const getBaseData = () => {
    const baseStatistics = {
      learnedWords: 0,
      optional: {}
    };

    baseStatistics.optional[keyName] = {
      countGames: 1,
      result: countWords(true)
    };

    api.putStatisticsUser(baseStatistics);
  };

  const addNewData = (data) => {
    let statistics = {...data.optional[keyName]};
    if (data.optional[keyName]) {
      statistics = {
        countGames: statistics.countGames + 1,
        result: statistics.result + countWords(true)
      };
    } else {
      statistics = {
        countGames: 1,
        result: countWords(true)
      };
    }

    const currentData = {
      ...data,
      optional: {
        ...data.optional
      }
    };
    currentData.optional[keyName] = {...statistics};

    return currentData;
  };

  const sendData = (data) => {
    api.putStatisticsUser(data);
  };

  (function sendStatistics() {
    api
      .getStatisticsUser()
      .then(({id, ...data}) => addNewData(data))
      .then((data) => sendData(data))
      .catch(() => getBaseData());
  })();

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
