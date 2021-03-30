import React, {useState} from 'react';
import Exit from '../Exit';
import Timer from '../Timer';
import Spinner from '../../../../components/Spinner';
import Pronounce from '../Pronounce';
import classes from './Game.module.scss';

let targetsCombo = 0;
let activeMarks = ['empty', 'empty', 'empty'];
let activeTargets = ['empty', 'empty', 'empty'];

const audioPlay = (name) => {
  const audio = new Audio(`/assets/audio/${name}.mp3`);
  audio.play();
};

function Game({setGameOver, setResults, setStartGame, words, startGame, results, load}) {
  const [count, setCount] = useState(0);
  const [marksCombo, setMarksCombo] = useState(0);
  const [marks, setMarks] = useState(['empty', 'empty', 'empty']);
  const [targets, setTargets] = useState(['empty', 'empty', 'empty']);
  const [score, setScore] = useState(0);
  const [rate, setRate] = useState(1);
  /* const [soundStatus, setSoundStatus] = useState(true); */

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
    word.correctAnswer ? audioPlay('right') : audioPlay('wrong');

    setCount(count + 1);
    changeMark(word.correctAnswer);
    changeScore(word.correctAnswer);
    setResults([...results, word]);
    if (count === words.length - 1) setGameOver(true);
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
          <div className={classes['score-container']}>
            <p className={classes.score}>{score}</p>
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

              {words.length ? (
                <div className={classes.words}>
                  <p className={classes['en-word']}>{words[count].word}</p>
                  <p className={classes['ru-word']}>{words[count].falsyTranslate}</p>
                </div>
              ) : null}

              <div className={classes.buttons}>
                <button
                  className={`${classes.btn} btn btn-danger btn-lg`}
                  onClick={() => onAnswer(words[count], false)}
                >
                  Не верно
                </button>
                <button
                  className={`${classes.btn} btn btn-success btn-lg`}
                  onClick={() => onAnswer(words[count], true)}
                >
                  Верно
                </button>
              </div>

              <div className={classes.arrows}>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => onAnswer(words[count], false)}
                >
                  <i className="fas fa-arrow-circle-left"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => onAnswer(words[count], true)}
                >
                  <i className="fas fa-arrow-circle-right"></i>
                </button>
              </div>
              <div className={classes.pronounce}>
                <Pronounce audio={words[count].audio} />
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
