import React, {useState, useEffect} from 'react';
import Exit from '../../../../components/gameComponents/Exit';
import Timer from '../../../../components/gameComponents/Timer';
import Spinner from '../../../../components/Spinner';
import Pronounce from '../../../../components/gameComponents/Pronounce';
import ToggleSound from '../../../../components/gameComponents/ToggleSound';
import CountWorlds from '../../../../components/gameComponents/CountWorlds';
import classes from './Game.module.scss';

let targetsCombo = 0;
let activeMarks = ['empty', 'empty', 'empty'];
let activeTargets = ['empty', 'empty', 'empty'];

const audioPlay = (name, soundStatus) => {
  const audio = new Audio(`/assets/audio/${name}.mp3`);
  if (soundStatus) audio.play();
};

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

function Game({
  setGameOver,
  setResults,
  setStartGame,
  setSoundStatus,
  setWords,
  words,
  startGame,
  results,
  load,
  soundStatus,
  totalWorlds,
  mixed
}) {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [marksCombo, setMarksCombo] = useState(0);
  const [marks, setMarks] = useState(['empty', 'empty', 'empty']);
  const [targets, setTargets] = useState(['empty', 'empty', 'empty']);
  const [currentWorlds, setCurrentWorlds] = useState([]);
  const [score, setScore] = useState(0);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    action(words);
  }, [load]);

  useEffect(() => {
    document.onkeydown = keyControl;
    document.addEventListener('keypress', keyControl);
    return () => {
      document.removeEventListener('keypress', keyControl);
    };
  }, [count, load]);

  const keyControl = (e) => {
    e.preventDefault();
    e = e || window.event;
    if (count === totalWorlds - 1) setGameOver(true);
    if (e.keyCode === 37) {
      onAnswer(currentWorlds[count], false);
    } else if (e.keyCode === 39) {
      onAnswer(currentWorlds[count], true);
    }
  };

  const action = (data) => {
    const currentData = mixed(data.filter((x, i) => i < 20));
    const restData = data.filter((x, i) => i >= 20);

    currentData.forEach((el) => {
      el.falsyTranslate = el.wordTranslate;
    });
    currentData.forEach((el) => {
      el.falsyTranslate = getRandomInt(2)
        ? currentData[getRandomInt(currentData.length - 1)].falsyTranslate
        : el.falsyTranslate;
      el.correctFlag = el.falsyTranslate === el.wordTranslate;
    });

    setCurrentWorlds(currentData);
    setWords(restData);
    setCount(0);
  };

  const changeScore = (bool) => {
    if (bool) setScore(score + rate * 10);
  };

  const changeTargets = (bool) => {
    activeTargets = targets;
    if (bool && targetsCombo < 3) {
      activeTargets[targetsCombo] = 'hit';
      targetsCombo += 1;
      setRate(rate * 2);
    }
    if (!bool) {
      targetsCombo = 0;
      activeTargets = ['empty', 'empty', 'empty'];
      setRate(1);
    }
    setTargets([...activeTargets]);
  };

  const changeMark = (bool) => {
    activeMarks = [...marks];
    if (bool && marksCombo < 3) {
      activeMarks[marksCombo] = 'hit';
      setMarksCombo(marksCombo + 1);
    } else if (bool && marksCombo >= 3) {
      activeMarks = ['empty', 'empty', 'empty'];
      setMarksCombo(0);
      changeTargets(true);
    } else {
      setMarksCombo(0);
      activeMarks = ['empty', 'empty', 'empty'];
      changeTargets(false);
    }
    setMarks([...activeMarks]);
  };

  const onAnswer = (word, answer) => {
    word.correctAnswer = word.correctFlag === answer;
    word.correctAnswer ? audioPlay('right', soundStatus) : audioPlay('wrong', soundStatus);

    results.push(word);
    setResults(results);
    setCount(count + 1);
    setTotalCount(totalCount + 1);
    changeMark(word.correctAnswer);
    changeScore(word.correctAnswer);

    if (count === totalWorlds - 1) setGameOver(true);
    if (results.length % 20 === 0) action(words);
  };

  if (startGame) {
    return (
      <div className={classes['container-game']}>
        <div className={classes.main}>
          <div className={classes['upper-container']}>
            <div className={classes['timer-container']}>
              <Timer initialTime={60} timeOutHandler={setGameOver} />
            </div>

            <Exit />
          </div>
          <div className={classes['panel']}>
            <CountWorlds count={totalCount + 1} totalCount={totalWorlds} />
            <p className={classes.score}>{score}</p>
            <ToggleSound setSoundStatus={setSoundStatus} soundStatus={soundStatus} />
          </div>
          <div className={classes['block-word-container']}>
            <div className={classes['block-word']}>
              <div className={classes.marks}>
                {marks.map((type, index) => (
                  <i
                    key={index}
                    className={`fa${type === 'empty' ? 'r fa' : 's fa-check'}-circle text-success`}
                  />
                ))}
              </div>
              <p className={classes['count-target']}>+{rate * 10} очков за слово</p>
              <div className={classes.targets}>
                <i className="fas fa-star text-warning"></i>
                {targets.map((type, index) => (
                  <i
                    key={index}
                    className={`f${type === 'empty' ? 'ar text-muted' : 'as text-warning'} fa-star`}
                  />
                ))}
              </div>

              {currentWorlds.length ? (
                <div className={classes.words}>
                  <p className={classes['en-word']}>{currentWorlds[count].word}</p>
                  <p className={classes['ru-word']}>{currentWorlds[count].falsyTranslate}</p>
                </div>
              ) : null}

              <div className={classes.buttons}>
                <button
                  className={`${classes.btn} btn btn-danger btn-lg`}
                  onClick={() => onAnswer(currentWorlds[count], false)}
                >
                  Не верно
                </button>
                <button
                  className={`${classes.btn} btn btn-success btn-lg`}
                  onClick={() => onAnswer(currentWorlds[count], true)}
                >
                  Верно
                </button>
              </div>

              <div className={classes.arrows}>
                <button type="button" className="btn btn-outline-danger">
                  <i className="fas fa-arrow-circle-left"></i>
                </button>
                <button type="button" className="btn btn-outline-success">
                  <i className="fas fa-arrow-circle-right"></i>
                </button>
              </div>
              <div className={classes.pronounce}>
                <Pronounce audio={currentWorlds[count].audio} soundStatus={soundStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return load ? <Spinner size="90px" /> : <Timer initialTime={3} timeOutHandler={setStartGame} />;
}

export default Game;
