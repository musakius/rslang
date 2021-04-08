import React from 'react';

const Newgamebutton = (props) => {
  let isGameStart = props.gameStart;

  return (
    <>
    {isGameStart 
      ? <button className="none"></button>         
      : <button className="new-game-button" onClick={props.changeGameStart}>Начать игру</button>
    }   
    </>    
  )
}

export default Newgamebutton;