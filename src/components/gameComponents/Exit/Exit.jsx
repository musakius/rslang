import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './Exit.module.scss';

const ModalExit = ({setIsExit}) => (
  <section className={classes['container-exit']}>
    <div className="modal-dialog">
      <div className={`${classes.content} modal-content`}>
        <div className="modal-header">
          <button type="button" className="close" onClick={() => setIsExit(false)}>
            <span>&times;</span>
          </button>
        </div>
        <div className={`${classes.body} modal-body`}>
          <p>Если вы выйдете сейчас, то процесс не сохраниться!</p>
        </div>
        <div className="modal-footer">
          <Link to="../games" type="button" className="btn btn-primary">
            Выйти
          </Link>
          <button type="button" className="btn btn-secondary" onClick={() => setIsExit(false)}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Exit = () => {
  const [isExit, setIsExit] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{color: '#fff'}}
        onClick={() => setIsExit(true)}
      >
        <i className="fas fa-times"></i>
      </button>
      {isExit ? <ModalExit setIsExit={setIsExit} /> : false}
    </>
  );
};

export default Exit;
