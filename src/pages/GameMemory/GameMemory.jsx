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
  const [totalWorlds, setTotalWorlds] = useState(0);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);

    const pages = getPages(level - 1);
    let result = [];

    Promise.all(pages.map((el) => api.getWordsAll(el.level, el.page)))
      .then((data) => (result = [...result, ...data]))
      .then((data) => {
        console.log(data.flat().length);
        setWords(data.flat());
        setTotalWorlds(data.flat().length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  }, [api, level]);

  const getPages = (level) => {
    let pages = [];

    for (let i = 0; i < 30; i++) {
      pages.push({page: i, level});
    }

    return mixed(pages);
  };

  function mixed(array) {
    array.sort(() => Math.random() - 0.5);

    const mixedArray = JSON.stringify(array);
    return JSON.parse(mixedArray);
  }

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
          totalWorlds={totalWorlds}
          mixed={mixed}
        ></Game>
      ) : null}
      {!gameOver && !initGame ? (
        <StartScreen
          name="Мемори"
          iconName="fas fa-th"
          description="Цель игры – найти как можно больше парных карточек."
          setInitGame={setInitGame}
          setLevel={setLevel}
          level={level}
        ></StartScreen>
      ) : null}
    </div>
  );
}

export default GameMemory;
