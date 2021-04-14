import React, {useState, useEffect, useMemo} from 'react';
import Service from '../../services';
import Game from './components/Game';
import StartScreen from '../../components/gameComponents/StartScreen';
import Statistics from '../../components/gameComponents/Statistics';
import {connect} from 'react-redux';
import {deleteGameInfo} from '../../redux/actions';
import {updateWord} from '../../pages/Textbook/utils/queries';

import classes from './GameMemory.module.scss';

function GameMemory({deleteGameInfo, gameInfo}) {
  const [initGame, setInitGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState([]);
  const [results, setResults] = useState([]);
  const [level, setLevel] = useState(1);
  const [load, setLoad] = useState(false);
  const [soundStatus, setSoundStatus] = useState(true);
  const [totalWorlds, setTotalWorlds] = useState(0);
  const [learnWorlds, setLearnWorlds] = useState(0);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setLoad(true);

    if (Object.keys(gameInfo).length) {
      setInitGame(true);

      if (gameInfo.filter) {
        fetchWordsForDictionary(api, gameInfo.pageNum, gameInfo.groupNum, gameInfo.filter);
      } else {
        fetchWordsForTextBook(api, gameInfo.pageNum, gameInfo.groupNum);
      }
    } else {
      fetchWordsAll(api, level);
    }

    return () => deleteGameInfo();
  }, [api, level]);

  const fetchWordsAll = (api, level) => {
    const pages = getPages(level - 1);
    let result = [];

    Promise.all(pages.map((el) => api.getWordsAll(el.level, el.page)))
      .then((data) => (result = [...result, ...data]))
      .then((data) => data.flat())
      .then((data) => {
        setWords(data);
        setTotalWorlds(data.length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };

  const fetchWordsForTextBook = async (api, page, level) => {
    await api
      .getWordsAll(level, page)
      .then((data) => {
        setLearnWorlds(data.length);
        data.forEach((el) => updateWord(api, el.id));
      })
      .catch((err) => console.error(err));

    await api
      .getAggregatedWordsAll()
      .then((data) => {
        return data[0].paginatedResults
          .filter((el) => el.page <= page && el.group === level)
          .map((el) => ({...el, id: el._id}))
          .reverse();
      })
      .then((data) => {
        setWords(data);
        setTotalWorlds(data.length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };

  const fetchWordsForDictionary = (api, page, level, filter) => {
    api
      .getAggregatedWordsByGroup(level, page, filter)
      .then((data) => {
        return data[0].paginatedResults.map((el) => ({...el, id: el._id}));
      })
      .then((data) => {
        setWords(data);
        setTotalWorlds(data.length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };

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
          learnWorlds={learnWorlds}
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

const mapDispatchToProps = {
  deleteGameInfo
};

const mapStateToProps = (state) => {
  return {
    gameInfo: state.gameInfo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameMemory);
