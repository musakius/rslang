import React, {useState, useCallback, useEffect} from 'react';
import Card from '../Card/Card';
import Timer from '../../../GameSprint/components/Timer';
/* import style from './Game.module.css'; */
import Exit from '../../../GameSprint/components/Exit';

/* import {setStatusGame} from '../../redux/index'; */

function Game({setGameOver, setResults, setStartGame, words, startGame, results}) {
  const dispatch = useDispatch();
  const activeLevel = useSelector(levelSelector);

  const [dictionary, setDictionary] = useState([]);
  const [russianWords, setRussianWords] = useState();
  const [englishWords, setEnglishWords] = useState();
  const [russianWord, setRussianWord] = useState();
  const [englishWord, setEnglishWord] = useState();
  const [isRight, setIsRight] = useState(null);
  const [livesCount, setLivesCount] = useState(5);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
  const [page, setPage] = useState(0);
  const [startTime, setStartTime] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [statistics, setStatistics] = useState({correct: [], incorrect: []});

  const changeActiveLevel = useCallback(
    (levelProps) => {
      if (activeLevel !== levelProps) {
        dispatch(setLevel(levelProps));
        setDictionary([]);
        setStartTime(60 - (activeLevel + 1) * 2);
        setPage(0);
      }
    },
    [dispatch, activeLevel]
  );

  useEffect(() => {
    if (countCorrectAnswers % 10 === 0) {
      setDictionary([]);

      if (page === 29) {
        changeActiveLevel(activeLevel + 1);
        if (activeLevel === 6) {
          changeActiveLevel(1);
        }
      } else {
        setPage(page + 1);
      }

      setIsShouldRestart(true);
      setInitialTime(startTime);
    }
  }, [countCorrectAnswers, startTime]);

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

  /*   const onExit = useCallback(() => {
    dispatch(setStatusGame(false));
    setIsExit(false);
  }, [dispatch]); */

  const cardHandler = useCallback(
    (cardId, word, setWord) => {
      if (correctAnswers.indexOf(cardId) === -1) {
        setWord(cardId);

        if (word) {
          cardId === word ? correct(cardId, englishWords) : incorrect(cardId, englishWords);
          checkResult();
        }
      }
    },
    [correct, incorrect, correctAnswers, checkResult, englishWords]
  );

  return (
    <div className={style.GameWrapper}>
      <div className={style.info}>
        <p>Поверните устройство горизонтально</p>
      </div>
      <div className={style.cross}>
        <Exit onClick={() => setIsExit(false)} />
      </div>
      <div className={style.Lives}>
        <Timer initialTime={60} timeOutHandler={setGameOver} />
      </div>
      <div className={style.CardBlock}>
        <div className={style.cardEng}>
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

        <div className={style.cardRus}>
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
