import {React, useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './css/savanna.css';
import Newgamebutton from './components/Newgamebutton';
import Statistics from './components/Statistics';
import Gamefield from './components/Gamefield';

const Savanna = () => {
  const [classFullScreen, setFullScreen] = useState("game-field");
  const [gameStart, setGameStart] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    
  })

  const handle = useFullScreenHandle();

  function changeFullScreen() {
    if (!document.fullscreenElement) {
      handle.enter();
      setFullScreen("game-field--full-screen");
    } else {
      handle.exit();
      setFullScreen("game-field");
    }
  }

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      setFullScreen("game-field");
    }
  })

  function changeGameStart() {
    setGameStart(true);
  }

  function plusPoint() {
    setPoints(points + 1);
  }

  function minusLife() {
    setLifes(lifes - 1);
  }


  return (
    <>
      <NavLink to="/games">Назад</NavLink>
      <h2 className="savanna-title">Игра Саванна</h2>
      <FullScreen handle={handle}>
        <div className={classFullScreen}> 
          <Newgamebutton changeGameStart={changeGameStart} gameStart={gameStart}/>
          <button className="full-screen-button" onClick={changeFullScreen}></button>
          <Statistics lifes={lifes} points={points}/>
          <Gamefield minusLife={minusLife} lifes={lifes} points={points} plusPoint={plusPoint} />
        </div>     
      </FullScreen>
    </>
  )
}

export default Savanna;