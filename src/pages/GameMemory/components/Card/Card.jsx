import React from 'react';

import classes from './Card.module.scss';

function Card({onCardClick, isActive, isRight, children, isCorrect}) {
  return (
    <div className={classes['container-card']}>
      <div
        onClick={onCardClick}
        className={`
        ${classes.card} 
        ${isActive ? classes.active : ''} 
        ${isActive && isRight ? classes.right : ''} 
        ${isActive && isRight === false ? classes.error : ''} 
        ${!isActive && isCorrect ? classes.correct : ''}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
