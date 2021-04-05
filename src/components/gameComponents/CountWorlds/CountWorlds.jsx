import React from 'react';

import classes from './CountWorlds.module.scss';

const CountWorlds = ({count, totalCount}) => {
  return (
    <div className={classes['count-container']}>
      <span>{count}</span> / <span>{totalCount}</span>
    </div>
  );
};

export default CountWorlds;
