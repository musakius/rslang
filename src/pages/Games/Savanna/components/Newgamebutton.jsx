import React from 'react';

const Newgamebutton = (props) => {
  let isGameStart = props.gameStart;
  console.log(isGameStart);
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