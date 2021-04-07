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
      <div>GAMES</div>
      <Link to="games/sprint">Sprint</Link>
      <Link to="games/memory">Memory</Link>
    </>
  );
};

export default Games;
