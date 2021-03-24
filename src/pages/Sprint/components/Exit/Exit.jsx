import React, {useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import StyleExit from './style.ModalExit';

const ModalExit = ({setModalExit, setReduxStatus}) => (
  <StyleExit>
    <div className="pop-up">
      <div className="top exit-bg">
        <div className="icon">
          <img src="/assets/images/common/excl.svg" alt="question in round" />
        </div>
        <section className="content">
          <p>Если вы выйдете во время игры, то прогресс не сохранится</p>
        </section>
      </div>
      <div className="bottom">
        <section className="btn-wrapper">
          <button type="button" onClick={setModalExit} className="cancel">
            Отменить
          </button>
          <Link to="../games">
            <button type="button" onClick={setReduxStatus} className="exit">
              Выйти
            </button>
          </Link>
        </section>
      </div>
    </div>
  </StyleExit>
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
      <img className="cross" style={{cursor: 'pointer'}} src={iconCross(noWhite)} alt="cross" />
    </div>
  );
};

export default Exit;
