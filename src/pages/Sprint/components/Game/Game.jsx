import React, {useState, useCallback, useMemo} from 'react';
import Exit from '../Exit';
import Rules from '../Rules';
import Timer from '../Timer';
import classes from './Game.module.scss';

const audioPath = 'https://raw.githubusercontent.com/' + 'alekchaik/rslang-data/master/';

const fetchOptions = {
  method: 'GET'
};

let targetsCombo = 0;
let activeMarks = ['empty', 'empty', 'empty'];
let activeTargets = ['empty', 'empty', 'empty'];

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

function Game({
  setOverGame,
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

  const action = useCallback(
    (data) => {
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
    },
    [learnedWords]
  );

  /* useAPI(userWordsURL, fetchOptions, action); */

  const changeScore = useCallback(
    (bool) => {
      if (bool) setScore(score + rate * 10);
    },
    [rate, score]
  );

  const changeTargets = useCallback(
    (bool) => {
      activeTargets = targets;
      if (bool && targetsCombo < 3) {
        activeTargets[targetsCombo] = 'hit';
        targetsCombo += 1;
        setRate(rate + 1);
      }
      if (!bool) {
        targetsCombo = 0;
        activeTargets = ['empty', 'empty', 'empty'];
        setRate(1);
      }
      setTargets([...activeTargets]);
    },
    [targets, rate]
  );

  const changeMark = useCallback(
    (bool) => {
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
    },
    [marks, changeTargets, marksCombo]
  );

  const audioRight = useCallback(() => {
    const RightAudio = new Audio('/assets/audio/right.mp3');
    RightAudio.play();
  }, []);

  const audioWrong = useCallback(() => {
    const WrongAudio = new Audio('/assets/audio/wrong.mp3');
    WrongAudio.play();
  }, []);

  const pronounce = useCallback(
    (n) => {
      const pronounce = new Audio(`${audioPath}${words[n].audio}`);
      pronounce.play();
    },
    [words]
  );

  const onAnswer = useCallback(
    (word, answer) => {
      word.correctAnswer = word.correctFlag === answer;
      if (soundStatus) {
        word.correctAnswer ? audioRight() : audioWrong();
      }
      changeMark(word.correctAnswer);
      changeScore(word.correctAnswer);
      setResults([word]); //2
    },
    [changeMark, changeScore, soundStatus, audioRight, audioWrong]
  );

  /* const onExit = useCallback(() => {
    dispatch(setDefault());
  }, [dispatch]); */

  if (startGame) {
    return (
      <div className={classes['container-game']}>
        <div className={classes.main}>
          <Rules rules="Если указан верный перевод слова - нажимайте 'Верно'" />
          <Exit /* onExit={onExit} */ noWhite={false} />
          <div className={classes['upper-container']}>
            <div className={classes['timer-container']}>
              <Timer initialTime={60} timeOutHandler={() => setOverGame(true)} />
            </div>

            <div className={classes['score-container']}>
              <p className="score">{score}</p>
            </div>
            <div className="toolbar">
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
                  <img key={index} src={`/assets/images/sprint/${type}_mark.svg`} alt="mark" />
                ))}
              </div>

              <div className={classes.targets}>
                <img src="/assets/images/sprint/hit_target.svg" alt="hint" />
                {targets.map((type, index) => (
                  <img key={index} src={`/assets/images/sprint/${type}_target.svg`} />
                ))}
              </div>

              {words.length ? (
                <div className={classes.words}>
                  <p className={classes['en-word']}>{words[count].word}</p>
                  <p className={classes['ru-word']}>{words[count].wordTranslate}</p>
                </div>
              ) : null}

              <div className={classes.buttons}>
                <button
                  className={`${classes['btn']} ${classes['false']}`}
                  onClick={() => {
                    setCount(count + 1);
                    onAnswer(words[count], false);
                    if (count === words.length - 1) setOverGame(true);
                  }}
                >
                  Не верно
                </button>
                <button
                  className={`${classes['btn']} ${classes['true']}`}
                  onClick={() => {
                    setCount(count + 1);
                    onAnswer(words[count], true);
                    if (count === words.length - 1) setOverGame(true);
                  }}
                >
                  Верно
                </button>
              </div>

              <div className={classes.arrows}>
                <img
                  className={classes.left}
                  src="/assets/images/sprint/left_arrow.svg"
                  alt="arrow left"
                />
                <img
                  className={classes.right}
                  src="/assets/images/sprint/right_arrow.svg"
                  alt="arrow right"
                />
              </div>

              <button
                className={classes.pronounce}
                onClick={() => {
                  pronounce(count);
                }}
                type="button"
              >
                <img className={classes['pronounce-img']} src="/assets/images/sprint/sound.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Timer initialTime={5} timeOutHandler={() => setStartGame(true)} />;
}

export default Game;
