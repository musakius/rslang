import React, {useState} from 'react';
import Game from './components/Game';

function Sprint() {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [overGame, setOverGame] = useState(false);
  const [soundStatus, setSoundStatus] = useState(false);
  const [learnedWords, setLearnedWords] = useState(false);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState({});
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(0);
  const [marksCombo, setMarksCombo] = useState(0);
  const [marks, setMarks] = useState(['empty', 'empty', 'empty']);
  const [targets, setTargets] = useState(['empty', 'empty', 'empty']);
  const [rate, setRate] = useState(1);

  return (
    <>
      <h1>Sprint</h1>
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
    </>
  );
}

export default Sprint;
