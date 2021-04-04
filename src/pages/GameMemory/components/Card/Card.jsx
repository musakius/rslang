import React from 'react';

import classes from './Card.module.scss';

function Card({onCardClick, isActive, isRight, children, isCorrect, disabledBtn}) {
  return (
    <div className={classes['container-card']}>
      <button
        type="button"
        disabled={disabledBtn}
        onClick={onCardClick}
        className={`${classes.card}  
        ${isActive ? classes.active : ''} 
        ${isActive && isRight ? classes.right : ''} 
        ${isActive && isRight === false ? classes.error : ''} 
        ${!isActive && isCorrect ? classes.correct : ''}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Card;
