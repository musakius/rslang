import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from './components/StartScreen';

function Sprint() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [overGame, setOverGame] = useState(false);
  const [soundStatus, setSoundStatus] = useState(false);
  const [learnedWords, setLearnedWords] = useState(false);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(3);
  const [marksCombo, setMarksCombo] = useState(0);
  const [marks, setMarks] = useState(['empty', 'empty', 'empty']);
  const [targets, setTargets] = useState(['empty', 'empty', 'empty']);
  const [rate, setRate] = useState(1);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getWordsAll(level)
      .then((data) => setWords(data))
      .catch((error) => console.log(error));
  }, [api]);

  if (initGame) {
    return (
      <Game
        setOverGame={setOverGame}
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
        level={level}
        score={score}
        marks={marks}
        targets={targets}
        rate={rate}
        soundStatus={soundStatus}
        learnedWords={learnedWords}
        marksCombo={marksCombo}
      ></Game>
    );
  }

  return (
    <StartScreen
      setInitGame={setInitGame}
      setLevel={setLevel}
      setLearnedWords={setLearnedWords}
      level={level}
      learnedWords={learnedWords}
    ></StartScreen>
  );
}

export default Sprint;
