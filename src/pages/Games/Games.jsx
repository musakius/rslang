import React, {useMemo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Service from '../../services';

const Games = () => {
  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getAggregatedWordsAll()
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, [api]);
  return (
    <>
    <h1 className="games-title">Игры</h1>
    <div className="games-wrapper">
      <div className="games-item card text-white bg-secondary mb-3">
        <div className="card-header">Спринт</div>
        <div className="card-body">
          <div className="games-image games-image--sprint"></div>
          <Link to="games/sprint" className="btn btn-success">Начать игру</Link>
        </div>
      </div>    
      <div className="games-item card text-white bg-secondary mb-3">
      <div className="card-header">Мемори</div>
        <div className="card-body">
          <div className="games-image games-image--memory"></div>
          <Link to="games/memory" className="btn btn-success">Начать игру</Link>  
        </div>
      </div>
      <div className="games-item card text-white bg-secondary mb-3">
      <div className="card-header">Саванна</div>
        <div className="card-body">
          <div className="games-image games-image--savanna"></div>
          <Link to="games/savanna" className="btn btn-success">Начать игру</Link>
        </div>
      </div>
      <div className="games-item card text-white bg-secondary mb-3">
        <div className="card-header">Голос</div>
          <div className="card-body">
            <div className="games-image games-image--voice"></div>
            <Link to="games/voice" className="btn btn-success">Начать игру</Link>
          </div>
      </div>
    </div>
    </>
  );
};

export default Games;
