import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gamesList } from '../../config';

const Links = ({ setInfo, countWords }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    countWords > 0 ? setActive(true) : setActive(false);
  }, [countWords])

  return (
    <div className="card border-info mb-3">
      <div className="card-header">
        <i className="fas fa-dice mr-2"></i>
        Мини-игры
      </div>
      <div className="card-body">
        {active
          ? <ul className="list-group" onClick={(event) => setInfo(event)}>
            {gamesList.map((game) => (
              <li
                key={game.id}
                className="list-group-item list-group-item-action d-flex justify-content-start align-items-baseline pl-2"
              >
                <Link key={game.id} className="text-white text-decoration-none" to={`${game.path}`}>
                  <i className={`${game.style}`}></i>{` ${game.item}`}
                </Link>
              </li>
            ))}
          </ul>
          : <i className="far fa-frown">{` Не достаточно слов для игры`}</i>}
      </div>
    </div>
  );
};

export default Links;
