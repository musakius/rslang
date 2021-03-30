import React, {useState} from 'react';
import Card from '../Card';
import Lives from '../Lives';
import Timer from '../../../GameSprint/components/Timer';
import Exit from '../../../GameSprint/components/Exit';

import classes from './Game.module.scss';

function Game({
  setGameOver,
  setResults,
  setStartGame,
  russianWords,
  englishWords,
  words,
  startGame,
  results
}) {
  const [idRussianWord, setIdRussianWord] = useState(null);
  const [idEnglishWord, setIdEnglishWord] = useState(null);
  const [isRight, setIsRight] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [livesCount, setLivesCount] = useState(3);

  const checkResult = () => {
    setTimeout(() => {
      setIsRight(null);
      setIdRussianWord(null);
      setIdEnglishWord(null);
    }, 500);
  };

  const checkAnswer = (firstWordId, lastWordId, answer) => {
    const currentId = answer ? firstWordId : lastWordId;
    setIsRight(answer);

    if (answer) {
      const newCorrectAnswers = correctAnswers;
      newCorrectAnswers.push(currentId);
      setCorrectAnswers(newCorrectAnswers);
    } else {
      setLivesCount(livesCount - 1);
    }

    if (results.every((item) => item.id !== currentId)) {
      const newWord = words.find((item) => item.id === currentId);
      newWord.correctAnswer = answer;
      setResults([...results, newWord]);
    }
    if (results.length === words.length - 1) {
      setTimeout(() => {
        setGameOver(true);
      }, 500);
    }
  };

  const cardHandler = (firstWordId, lastWordId, setWordId) => {
    if (correctAnswers.indexOf(firstWordId) === -1) {
      setWordId(firstWordId);

      if (lastWordId) {
        if (firstWordId === lastWordId) {
          checkAnswer(firstWordId, lastWordId, true);
        } else {
          checkAnswer(firstWordId, lastWordId, false);
        }
        checkResult();
      }
    }
  };

  if (startGame) {
    return (
      <div className={classes.GameWrapper}>
        <div className={classes.cross}>
          <Exit />
        </div>
        <div className={classes.Lives}>
          <Lives livesCount={livesCount} setGameOver={setGameOver} />
          <Timer initialTime={60} timeOutHandler={setGameOver} />
        </div>
        <div className={classes.CardBlock}>
          <div className={classes.cardEng}>
            {words.length
              ? englishWords.map(({word, id}) => (
                  <Card
                    key={id}
                    onCardClick={() => cardHandler(id, idRussianWord, setIdEnglishWord)}
                    isActive={idEnglishWord === id}
                    isRight={isRight}
                    isCorrect={correctAnswers.indexOf(id) !== -1}
                  >
                    {word}
                  </Card>
                ))
              : false}
          </div>

          <div className={classes.cardRus}>
            {words.length
              ? russianWords.map(({wordTranslate, id}, index) => (
                  <Card
                    key={index}
                    onCardClick={() => cardHandler(id, idEnglishWord, setIdRussianWord)}
                    isActive={idRussianWord === id}
                    isRight={isRight}
                    isCorrect={correctAnswers.indexOf(id) !== -1}
                    disabled="true"
                  >
                    {wordTranslate}
                  </Card>
                ))
              : false}
          </div>
        </div>
      </div>
    );
  }
  return <Timer initialTime={3} timeOutHandler={setStartGame} />;
}

export default Game;
