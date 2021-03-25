import React, {useState, useMemo} from 'react';
import Exit from '../Exit';
import Timer from '../Timer';
import classes from './Game.module.scss';

let targetsCombo = 0;
let activeMarks = ['empty', 'empty', 'empty'];
let activeTargets = ['empty', 'empty', 'empty'];

function Game({
  setGameOver,
  setResults,
  setMarks,
  setWords,
  setStartGame,
  setTargets,
  setRate,
  setScore,
  setSoundStatus,
  setMarksCombo,
  words,
  startGame,
  results,
  level,
  score,
  marks,
  targets,
  rate,
  soundStatus,
  learnedWords,
  marksCombo
}) {
  /* const userID = useSelector(userIdSelector); */

  const [count, setCount] = useState(0);

  const userWordsURL = useMemo(
    () => `words?page=0&group=${level}&wordsPerExampleSentenceLTE=1000&wordsPerPage=150`,
    [level, learnedWords]
  );

  /* useAPI(userWordsURL, fetchOptions, action); */

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

  const audioRight = () => {
    const audio = new Audio('/assets/audio/right.mp3');
    audio.play();
  };

  const audioWrong = () => {
    const audio = new Audio('/assets/audio/wrong.mp3');
    audio.play();
  };

  const audioWord = (n) => {
    const audio = new Audio(`https://apprslang.herokuapp.com/${words[n].audio}`);
    audio.play();
  };

  const onAnswer = (word, answer) => {
    console.log(word);
    console.log(answer);
    word.correctAnswer = word.correctFlag === answer;
    if (soundStatus) {
      word.correctAnswer ? audioRight() : audioWrong();
    }
    changeMark(word.correctAnswer);
    changeScore(word.correctAnswer);
    setResults([...results, word]);
  };

  if (startGame) {
    return (
      <div className={classes['container-game']}>
        <div className={classes.main}>
          <Exit />
          <div className={classes['upper-container']}>
            <div className={classes['timer-container']}>
              <Timer initialTime={60} timeOutHandler={setGameOver} />
            </div>

            <div className={classes['score-container']}>
              <p className={classes.score}>{score}</p>
            </div>
            <div className={classes.toolbar}>
              <label className={classes['notification-label']}>
                <input
                  onChange={() => {
                    setSoundStatus(!soundStatus);
                  }}
                  className={classes['notification-input']}
                  type="checkbox"
                  value="1"
                  name="k"
                />
                <span />
              </label>
            </div>
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
                  className={`${classes['btn']} ${classes['false']}`}
                  onClick={() => {
                    setCount(count + 1);
                    onAnswer(words[count], false);
                    if (count === words.length - 1) setGameOver(true);
                  }}
                >
                  Не верно
                </button>
                <button
                  className={`${classes['btn']} ${classes['true']}`}
                  onClick={() => {
                    setCount(count + 1);
                    onAnswer(words[count], true);
                    if (count === words.length - 1) setGameOver(true);
                  }}
                >
                  Верно
                </button>
              </div>

              <div className={classes.arrows}>
                <i className="fas fa-arrow-circle-left"></i>
                {/* <img
                  className={classes.left}
                  src="/assets/images/sprint/left_arrow.svg"
                  alt="arrow left"
                /> */}
                <i className="fas fa-arrow-circle-right"></i>
                {/* <img
                  className={classes.right}
                  src="/assets/images/sprint/right_arrow.svg"
                  alt="arrow right"
                /> */}
              </div>

              <button
                className={classes.pronounce}
                onClick={() => {
                  audioWord(count);
                }}
                type="button"
              >
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Timer initialTime={3} timeOutHandler={setStartGame} />;
}

export default Game;
