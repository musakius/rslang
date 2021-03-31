import React, {useState} from 'react';
import Card from '../Card';
import Lives from '../Lives';
import Timer from '../../../../components/gameComponents/Timer';
import Exit from '../../../../components/gameComponents/Exit';
import ToggleSound from '../../../../components/gameComponents/ToggleSound';
import Spinner from '../../../../components/Spinner';

import classes from './Game.module.scss';

const audioPlay = (name, soundStatus) => {
  const audio = new Audio(`/assets/audio/${name}.mp3`);
  if (soundStatus) audio.play();
};

function Game({
  setGameOver,
  setResults,
  setStartGame,
  setSoundStatus,
  russianWords,
  englishWords,
  words,
  startGame,
  results,
  load,
  soundStatus
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
          audioPlay('right', soundStatus);
        } else {
          checkAnswer(firstWordId, lastWordId, false);
          audioPlay('wrong', soundStatus);
        }
        checkResult();
      }
    }
  };

  if (startGame) {
    return (
      <div className={classes['container-game']}>
        <div className={classes['upper-container']}>
          <div className={classes['timer-container']}>
            <Timer initialTime={60} timeOutHandler={setGameOver} />
          </div>
          <Exit />
        </div>
        <div className={classes.lives}>
          <Lives livesCount={livesCount} setGameOver={setGameOver} />
          <ToggleSound setSoundStatus={setSoundStatus} soundStatus={soundStatus} />
        </div>
        <div className={classes['card-block']}>
          <div className={classes['card-eng']}>
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

          <div className={classes['card-rus']}>
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
  return load ? <Spinner size="90px" /> : <Timer initialTime={3} timeOutHandler={setStartGame} />;
}

export default Game;
