import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from '../../components/gameComponents/StartScreen';
import Statistics from '../../components/gameComponents/Statistics';

import classes from './GameMemory.module.scss';

function GameMemory() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [learnedWords, setLearnedWords] = useState(false);
  const [words, setWords] = useState([]);
  const [englishWords, setEnglishWords] = useState([]);
  const [russianWords, setRussianWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(1);
  const [newWords, setNewWords] = useState(true);
  const [load, setLoad] = useState(false);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);
    api
      .getWordsAll(level - 1)
      .then((data) => action(data))
      .catch((error) => console.error(error))
      .finally(() => setLoad(false));
    return () => {
      setWords([]);
      setNewWords(false);
    };
  }, [api, level]);

  const action = (data) => {
    if (newWords && data) {
      mixed(data);
      data.length = 10;
      setEnglishWords(mixed(data));
      setRussianWords(mixed(data));
    }
    setWords(data);
  };

  function mixed(array) {
    array.sort(() => Math.random() - 0.5);

    const mixedArray = JSON.stringify(array);
    return JSON.parse(mixedArray);
  }

  return (
    <div className={classes['container-memory']}>
      {gameOver ? <Statistics results={results} /> : null}
      {initGame && !gameOver ? (
        <Game
          setGameOver={setGameOver}
          setResults={setResults}
          setWords={setWords}
          setStartGame={setStartGame}
          englishWords={englishWords}
          russianWords={russianWords}
          words={words}
          startGame={startGame}
          results={results}
          load={load}
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
