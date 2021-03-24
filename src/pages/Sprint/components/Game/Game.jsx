import React, {useState, useCallback, useMemo} from 'react';
import Exit from '../Exit';
import Rules from '../Rules';
import Timer from '../Timer/Timer';

import useAPI from '../../../../common/utils';
import {userIdSelector} from '../../../../auth/redux/selectors';

import classes from './Game.module.scss';
import {incCombo} from '../../redux'; //TODO

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
  const userID = useSelector(userIdSelector);

  const [count, setCount] = useState(0);

  const userWordsURL = useMemo(
    () =>
      learnedWords
        ? `users/${userID}/aggregatedWords?wordsPerPage=150&filter={"userWord.optional.deleted":false}`
        : `words?page=0&group=${level}
      &wordsPerExampleSentenceLTE=1000&wordsPerPage=150`,
    [level, userID, learnedWords]
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

  useAPI(userWordsURL, fetchOptions, action);

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
        incCombo();
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
    [dispatch, changeMark, changeScore, soundStatus, audioRight, audioWrong]
  );

  /* const onExit = useCallback(() => {
    dispatch(setDefault());
  }, [dispatch]); */

  if (startGame) {
    return (
      <div className="Main">
        <Rules rules="Если указан верный перевод слова - нажимайте 'Верно'" />
        <Exit /* onExit={onExit} */ noWhite={false} />
        <div className="UpperContainer">
          <div className="TaimerContainer">
            <Timer initialTime={60} timeOutHandler={() => setOverGame(true)} />
          </div>

          <div className="ScoreContainer">
            <p className="Score">{score}</p>
          </div>
          <div className="Toolbar">
            <label className="Notification_label">
              <input
                onChange={() => {
                  setSoundStatus(!soundStatus);
                }}
                className="Notification_input"
                type="checkbox"
                value="1"
                name="k"
              />
              <span />
            </label>
          </div>
        </div>
        <div className="BlockWordContainer">
          <div className="BlockWord">
            <div className="Marks">
              {marks.map((type, index) => (
                <img key={index} src={`/assets/images/sprint/${type}_mark.svg`} alt="mark" />
              ))}
            </div>

            <div className="Targets">
              <img src="/assets/images/sprint/hit_target.svg" alt="hint" />
              {targets.map((type, index) => (
                <img key={index} src={`/assets/images/sprint/${type}_target.svg`} />
              ))}
            </div>

            <div className="Words">
              <p className="EnWord">{words[count].word}</p>
              <p className="RuWord">{words[count].falsyTranslate}</p>
            </div>

            <div className="Buttons">
              <button
                className="Btn False"
                onClick={() => {
                  setCount(count + 1);
                  onAnswer(words[count], false);
                  if (count === words.length - 1) setOverGame(true);
                }}
              >
                Не верно
              </button>
              <button
                className="Btn True"
                onClick={() => {
                  setCount(count + 1);
                  onAnswer(words[count], true);
                  if (count === words.length - 1) setOverGame(true);
                }}
              >
                Верно
              </button>
            </div>

            <div className="Arrows">
              <img className="Left" src="/assets/images/sprint/left_arrow.svg" alt="arrow left" />
              <img
                className="Right"
                src="/assets/images/sprint/right_arrow.svg"
                alt="arrow right"
              />
            </div>

            <button
              className="pronounce"
              onClick={() => {
                pronounce(count);
              }}
              type="button"
            >
              <img className="pronounce_img" src="/assets/images/sprint/sound.svg" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <Timer initialTime={5} timeOutHandler={() => setStartGame(true)} />;
}

export default Game;
