import React, {useState, useEffect} from 'react';
import classes from './Timer.module.scss';

function Timer({timeOutHandler, initialTime}) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearTimeout(timerID);
  }, [timer]);
  useEffect(() => {
    if (timer <= 0) timeOutHandler(true);
  }, [timeOutHandler, timer]);

  return (
    <div className={classes['container-timer']}>
      <p className={classes.timer}>{timer}</p>
    </div>
  );
}

export default Timer;
