import React from 'react';

import classes from './Table.module.scss';

const games = {
  sprint: 'Спринт',
  memory: 'Мемори'
};

const Table = ({gamesStats}) => {
  const renderTHeader = (gamesStats) => {
    return Object.keys(gamesStats.optional).map((key) => (
      <th className="table-active" key={key}>
        {games[key]}
      </th>
    ));
  };

  const getRightPercent = (data) => {
    const totalAnswers = data.rightAnswers + data.wrongAnswers;
    const result = ((data.rightAnswers * 100) / totalAnswers).toFixed(1);
    return result;
  };

  const getSumArray = (arr) => {
    const newArr = arr.filter((x, i) => i >= 1).map((el) => parseInt(el));
    return newArr.reduce((acc, cur) => {
      if (isNaN(cur)) return acc + 0;
      return acc + cur;
    });
  };

  const renderTBody = (gamesStats) => {
    const rows = [];
    const values = Object.values(gamesStats.optional);
    const maxIndex = values.reduce((acc, cur) => {
      const {length} = Object.keys(cur);
      return length > acc ? length : acc;
    }, 0);

    const renderTD = (data) => {
      return data.map((el, i, arr) => (
        <td className={i === arr.length - 1 || i === 0 ? 'table-dark' : ''} key={el + i}>
          {el}
        </td>
      ));
    };

    for (let i = 0; i < maxIndex; i++) {
      const date = ['Дата'];
      const learnWorlds = ['Количество изученных слов'];
      const rightAnswers = ['Процент правильных ответов'];
      const maxRightAnswers = ['Серия правильных ответов'];
      const space = [''];
      for (let j = 0; j < values.length; j++) {
        const keys = Object.keys(values[j]);
        if (keys[i] && values[j][keys[i]]) {
          date.push(keys[i]);
          learnWorlds.push(values[j][keys[i]].learnedWords);
          rightAnswers.push(getRightPercent(values[j][keys[i]]) + '%');
          maxRightAnswers.push(values[j][keys[i]].maxRightAnswers);
          space.push('');
        } else {
          date.push('-');
          learnWorlds.push('-');
          rightAnswers.push('-');
          maxRightAnswers.push('-');
          space.push('');
        }
      }

      const countRightAnswers = rightAnswers.filter((x) => x !== '-').length - 1;

      date.push(date.find((el) => el !== '-' && el !== 'Дата'));
      learnWorlds.push(getSumArray(learnWorlds));
      rightAnswers.push((getSumArray(rightAnswers) / countRightAnswers).toFixed(1) + '%');
      maxRightAnswers.push(Math.max(...maxRightAnswers.filter((x, i) => i >= 1 && x !== '-')));
      space.push('');

      const jsxDate = renderTD(date);
      const jsxLearnWorlds = renderTD(learnWorlds);
      const jsxRightAnswers = renderTD(rightAnswers);
      const jsxMaxRightAnswers = renderTD(maxRightAnswers);
      const jsxSpace = space.map((el, i) => (
        <td className="table-active" key={el + i}>
          {el}
        </td>
      ));

      rows.push(jsxDate, jsxLearnWorlds, jsxRightAnswers, jsxMaxRightAnswers, jsxSpace);
    }
    const rowsJSX = rows.map((row, i) => <tr key={`row${i}`}>{row}</tr>);
    return rowsJSX;
  };

  return (
    <>
      {!!Object.keys(gamesStats).length && (
        <table className={`${classes.table} table`}>
          <thead>
            <tr>
              <th className="table-active">Показатели</th>
              {renderTHeader(gamesStats)}
              <th className="table-active">Итого</th>
            </tr>
          </thead>
          <tbody>{renderTBody(gamesStats)}</tbody>
        </table>
      )}
      {!Object.keys(gamesStats).length && <h3>Нет результатов</h3>}
    </>
  );
};

export default Table;
