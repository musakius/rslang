import React, {useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import Service from '../../services';

const Games = () => {
  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getWordsAll()
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [api]);
  return (
    <>
      <div>GAMES</div>
      <Link to="games/sprint">Sprint</Link>
    </>
  );
};

export default Games;
