import React from 'react';

import classes from './Spinner.module.scss';

function Spinner({size = '16px', color = '#ffffff'}) {
  return (
    <i
      className={`${classes.spinner} fas fa-circle-notch`}
      style={{fontSize: size, color: color}}
    ></i>
  );
}

export default Spinner;
