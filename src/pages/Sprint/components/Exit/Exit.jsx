import React, {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import classes from './Exit.module.scss';

const ModalExit = ({setModalExit, setReduxStatus}) => (
  <section className={classes['container-exit']}>
    <div className={classes['pop-up']}>
      <div className={`${classes.top} ${classes['exit-bg']}`}>
        <div className={classes.icon}>
          <img src="/assets/images/common/excl.svg" alt="question in round" />
        </div>
        <section className={classes.content}>
          <p>Если вы выйдете во время игры, то прогресс не сохранится</p>
        </section>
      </div>
      <div className={classes.bottom}>
        <section className={classes['btn-wrapper']}>
          <button type="button" onClick={setModalExit} className={classes.cancel}>
            Отменить
          </button>
          <Link to="../games">
            <button type="button" onClick={setReduxStatus} className={classes.exit}>
              Выйти
            </button>
          </Link>
        </section>
      </div>
    </div>
  </section>
);

const iconCross = (white) =>
  !white ? '/assets/images/common/x_white.svg' : '/assets/images/common/x.svg';

const Exit = ({onExit = () => {}, noWhite}) => {
  const [isExit, setIsExit] = useState(false);

  const onExitClickHandler = useCallback((exit) => {
    setIsExit(!exit);
  }, []);

  return (
    <div onClick={() => onExitClickHandler(isExit)}>
      {isExit ? <ModalExit setModalExit={() => setIsExit(false)} setReduxStatus={onExit} /> : false}
      <img
        className={classes.cross}
        style={{cursor: 'pointer'}}
        src={iconCross(noWhite)}
        alt="cross"
      />
    </div>
  );
};

export default Exit;
