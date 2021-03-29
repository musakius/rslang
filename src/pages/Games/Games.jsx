import React from 'react';
import {Link} from 'react-router-dom';

const Games = () => {
  return (
    <>
      <div>GAMES</div>
      <Link to="games/sprint">Sprint</Link>
      <Link to="games/memory">Memory</Link>
    </>
  );
};

export default Games;
