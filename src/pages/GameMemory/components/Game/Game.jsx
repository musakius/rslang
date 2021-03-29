import React, {useState, useCallback, useEffect} from 'react';
import Card from '../Card';
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
  /* const activeLevel = useSelector(levelSelector); */

  const [dictionary, setDictionary] = useState([]);
  /* const [russianWords, setRussianWords] = useState();
    const [englishWords, setEnglishWords] = useState(); */
  const [russianWord, setRussianWord] = useState(null);
  const [englishWord, setEnglishWord] = useState(null);
  const [isRight, setIsRight] = useState(null);
  const [livesCount, setLivesCount] = useState(5);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
  const [page, setPage] = useState(0);
  const [startTime, setStartTime] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [statistics, setStatistics] = useState({correct: [], incorrect: []});
  const [isShouldRestart, setIsShouldRestart] = useState(false);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    console.log(englishWords);
  }, [englishWords]);

  const correct = (cardId, words) => {
    const cAnswers = correctAnswers;
    cAnswers.push(cardId);
    setCorrectAnswers(cAnswers);
    setIsRight(true);
    setCountCorrectAnswers(countCorrectAnswers + 1);
    setIsShouldRestart(false);

    const oldStatistics = statistics;
    const newWord = words.filter((item) => item.id === cardId);

    if (statistics.incorrect.indexOf(newWord[0].word) === -1) {
      oldStatistics.correct.push(newWord[0]);
      setStatistics(oldStatistics);
    }
  };

  const incorrect = (cardId, words) => {
    setIsRight(false);
    setLivesCount(livesCount - 1);

    const oldStatistics = statistics;
    const newWord = words.filter((item) => item.id === cardId);
    oldStatistics.incorrect.push(newWord[0]);
    setStatistics(oldStatistics);
  };

  const checkResult = (levelProps) => {
    setTimeout(() => {
      setIsRight(null);
      setRussianWord(null);
      setEnglishWord(null);
    }, 500);
  };

  const cardHandler = (cardId, word, setWord) => {
    console.log(word);
    console.log(`id - ${cardId}, en - ${englishWord}, ru - ${russianWord}`);
    if (correctAnswers.indexOf(cardId) === -1) {
      setWord(cardId);

      if (word) {
        cardId === word ? correct(cardId, englishWords) : incorrect(cardId, englishWords);
        checkResult();
      }
    }
  };

  return (
    <div className={classes.GameWrapper}>
      <div className={classes.info}>
        <p>Поверните устройство горизонтально</p>
      </div>
      <div className={classes.cross}>
        <Exit onClick={() => setIsExit(false)} />
      </div>
      <div className={classes.Lives}>
        <Timer initialTime={60} timeOutHandler={setGameOver} />
      </div>
      <div className={classes.CardBlock}>
        <div className={classes.cardEng}>
          {words.length
            ? englishWords.map(({word, id}, index) => (
                <Card
                  key={id}
                  onCardClick={() => cardHandler(id, russianWord, setEnglishWord)}
                  isActive={englishWord === id}
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
                  onCardClick={() => cardHandler(id, englishWord, setRussianWord)}
                  isActive={russianWord === id}
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

export default Game;
