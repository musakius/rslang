import React from 'react';

const Question = (props) => {
  let round = props.round;
  let variants = props.variants;
  let isLoaded;
  if(variants === undefined || null) {
    isLoaded = false;
  } else {
    isLoaded = true;
  }

  return (
    <>
    {isLoaded  
      ? <div className="question question--active" onAnimationEnd={props.timeIsOver}>{variants[round].word}</div>
      : <div className="question">Загрузка</div>
    }
    </>
  )
}

export default Question;