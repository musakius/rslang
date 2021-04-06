import React from 'react';

const EndGame = (props) => {
  console.log(props.goodAnswers);

  return (
    <div className="end-game">
      <h2 className="end-game__title">Игра Закочилась</h2>
      <p className="end-game__text">Правильных ответов: {props.points}.</p>
      <ul className="end-game__list">
        <h4 className="end-game__list-title">Вы не выучили слова:</h4>
        {props.errors.map((item, index) => <li key={index.toString()} className="end-game__item" >{item.word}</li>)}
      </ul>
      <ul className="end-game__list">
        <h4 className="end-game__list-title">Вы выучили слова:</h4>
        {props.goodAnswers.map((item, index) => <li key={index.toString()} className="end-game__item" >{item.word}</li>)}
      </ul>
      <button className="end-game__new-game-button" onClick={() => {window.location.reload()}}>Новая игра</button>
    </div>
  )
}

export default EndGame;