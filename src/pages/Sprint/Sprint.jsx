import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import Statistics from './components/Statistics';

import classes from './Sprint.module.scss';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

function Sprint() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);
  const [learnedWords, setLearnedWords] = useState(false);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(1);
  const [marksCombo, setMarksCombo] = useState(0);
  const [marks, setMarks] = useState(['empty', 'empty', 'empty']);
  const [targets, setTargets] = useState(['empty', 'empty', 'empty']);
  const [rate, setRate] = useState(1);

  console.log(level);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getWordsAll(level)
      .then((data) => action(data))
      .catch((error) => console.log(error));
  }, [api]);

  const action = (data) => {
    const path = learnedWords ? data[0].paginatedResults : data;
    path.forEach((el) => {
      el.falsyTranslate = el.wordTranslate;
    });
    path.forEach((el) => {
      el.falsyTranslate = getRandomInt(2)
        ? path[getRandomInt(path.length - 1)].falsyTranslate
        : el.falsyTranslate;
      el.correctFlag = el.falsyTranslate === el.wordTranslate;
    });
    setWords(path);
  };

  return (
    <div className={classes['container-sprint']}>
      {gameOver ? <Statistics results={results} /> : null}
      {initGame && !gameOver ? (
        <Game
          setGameOver={setGameOver}
          setResults={setResults}
          setMarks={setMarks}
          setWords={setWords}
          setStartGame={setStartGame}
          setTargets={setTargets}
          setRate={setRate}
          setScore={setScore}
          setSoundStatus={setSoundStatus}
          setMarksCombo={setMarksCombo}
          words={words}
          startGame={startGame}
          results={results}
          level={level}
          score={score}
          marks={marks}
          targets={targets}
          rate={rate}
          soundStatus={soundStatus}
          learnedWords={learnedWords}
          marksCombo={marksCombo}
        ></Game>
      ) : null}
      {!gameOver && !initGame ? (
        <StartScreen
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

export default Sprint;
