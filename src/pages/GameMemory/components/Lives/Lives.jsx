import React, {useEffect} from 'react';
import classes from './Lives.module.scss';

function Lives({livesCount, setGameOver}) {
  useEffect(() => {
    if (livesCount <= 0) {
      setGameOver(true);
    }
  }, [setGameOver, livesCount]);

  const renderLives = () => {
    const lives = [];

    for (let i = 0; i < livesCount; i += 1) {
      lives.push(<i className={`${classes.heart} fas fa-heart text-danger`} key={i}></i>);
    }

    return lives;
  };

  return <div className={classes.Lives}>{renderLives()}</div>;
}

export default Lives;
