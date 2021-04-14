import React from 'react';

const Progress = (props) => {
  
  return (
    <div className="game-progress"> Очки: {props.points} / 20</div>
  )
}

export default Progress;