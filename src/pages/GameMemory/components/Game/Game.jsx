import React, {useState, useEffect} from 'react';
import Card from '../Card';
import Lives from '../Lives';
import Timer from '../../../../components/gameComponents/Timer';
import Exit from '../../../../components/gameComponents/Exit';
import ToggleSound from '../../../../components/gameComponents/ToggleSound';
import Pronounce from '../../../../components/gameComponents/Pronounce';
import CountWorlds from '../../../../components/gameComponents/CountWorlds';
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
  setWords,
  words,
  newWords,
  startGame,
  results,
  load,
  soundStatus,
  totalWorlds,
  mixed
}) {
  const [count, setCount] = useState(0);
  const [idRussianWord, setIdRussianWord] = useState(null);
  const [idEnglishWord, setIdEnglishWord] = useState(null);
  const [currentWorlds, setCurrentWorlds] = useState([]);
  const [englishWords, setEnglishWords] = useState([]);
  const [russianWords, setRussianWords] = useState([]);
  const [isRight, setIsRight] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [livesCount, setLivesCount] = useState(3);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    action(words);
    return () => {
      setEnglishWords([]);
      setRussianWords([]);
    };
  }, [load]);

  const action = (data) => {
    if (newWords && data) {
      const currentData = mixed(data.filter((x, i) => i < 10));
      const restData = data.filter((x, i) => i >= 10);
      setCurrentWorlds(currentData);
      setWords(restData);
      setEnglishWords(mixed(currentData));
      setRussianWords(mixed(currentData));
    }
  };

  const checkResult = () => {
    setTimeout(() => {
      setIsRight(null);
      setIdRussianWord(null);
      setIdEnglishWord(null);
      setDisabledBtn(false);
    }, 500);
  };

  const checkAnswer = (firstWordId, lastWordId, answer) => {
    const currentId = answer ? firstWordId : lastWordId;
    setIsRight(answer);

    if (answer) {
      const newCorrectAnswers = correctAnswers;
      newCorrectAnswers.push(currentId);
      setCorrectAnswers(newCorrectAnswers);
      setDisabledBtn(true);
      setCount(count + 1);
      if (correctAnswers.length % 10 === 0) action(words);
    } else {
      setLivesCount(livesCount - 1);
      setDisabledBtn(true);
    }

    if (results.every((item) => item.id !== currentId)) {
      const newWord = currentWorlds.find((item) => item.id === currentId);
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
        <div className={classes.panel}>
          <CountWorlds count={count + 1} totalCount={totalWorlds} />
          <Lives livesCount={livesCount} setGameOver={setGameOver} />
          <ToggleSound setSoundStatus={setSoundStatus} soundStatus={soundStatus} />
        </div>
        <div className={classes['card-block']}>
          <div className={classes['card-eng']}>
            {words.length
              ? englishWords
                  .filter((x, i) => i < 10)
                  .map(({word, audio, id}) => (
                    <div key={id}>
                      <Card
                        onCardClick={() => cardHandler(id, idRussianWord, setIdEnglishWord)}
                        isActive={idEnglishWord === id}
                        isRight={isRight}
                        isCorrect={correctAnswers.indexOf(id) !== -1}
                        disabledBtn={disabledBtn}
                      >
                        {word}
                      </Card>
                      <Pronounce audio={audio} soundStatus={soundStatus} color="#2b3e50" />
                    </div>
                  ))
              : false}
          </div>

          <div className={classes['card-rus']}>
            {words.length
              ? russianWords
                  .filter((x, i) => i < 10)
                  .map(({wordTranslate, id}, index) => (
                    <Card
                      key={index}
                      onCardClick={() => cardHandler(id, idEnglishWord, setIdRussianWord)}
                      isActive={idRussianWord === id}
                      isRight={isRight}
                      isCorrect={correctAnswers.indexOf(id) !== -1}
                      disabledBtn={disabledBtn}
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
