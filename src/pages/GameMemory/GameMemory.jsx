import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from '../../components/gameComponents/StartScreen';
import Statistics from '../../components/gameComponents/Statistics';

import classes from './GameMemory.module.scss';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

function GameMemory() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [learnedWords, setLearnedWords] = useState(false);
  const [words, setWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(1);
  const [newWords, setNewWords] = useState(true);
  const [load, setLoad] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);

    const randomPages = getRandomPages(level - 1);
    let result = [];

    Promise.all(randomPages.map((el) => api.getWordsAll(el.level, el.page)))
      .then((data) => (result = [...result, ...data]))
      .then((data) => setWords(data.flat()))
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
    return () => {
      /* setWords([]);
      setNewWords(false); */
    };
  }, [api, level]);

  const getRandomPages = (level) => {
    let pages = [];

    for (let i = 0; i < 10; i++) {
      const randomPage = getRandomInt(29);
      if (pages.some((el) => el.page === randomPage)) {
        i--;
      } else {
        pages.push({page: randomPage, level});
      }
    }

    return pages;
  };

  return (
    <div className={classes['container-memory']}>
      {gameOver ? (
        <Statistics
          results={results}
          setSoundStatus={setSoundStatus}
          soundStatus={soundStatus}
          keyName="memory"
        />
      ) : null}
      {initGame && !gameOver ? (
        <Game
          setGameOver={setGameOver}
          setResults={setResults}
          setStartGame={setStartGame}
          setSoundStatus={setSoundStatus}
          setWords={setWords}
          words={words}
          newWords={newWords}
          startGame={startGame}
          results={results}
          load={load}
          soundStatus={soundStatus}
        ></Game>
      ) : null}
      {!gameOver && !initGame ? (
        <StartScreen
          name="Мемори"
          iconName="fas fa-th"
          description="Цель игры – найти как можно больше парных карточек."
          setInitGame={setInitGame}
          setLevel={setLevel}
          setLearnedWords={setLearnedWords}
          level={level}
          learnedWords={learnedWords}
        ></StartScreen>
      ) : null}
    </div>
  );
}

export default GameMemory;
