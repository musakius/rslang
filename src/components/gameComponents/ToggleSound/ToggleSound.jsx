import React from 'react';

import classes from './ToggleSound.module.scss';

const ToggleSound = ({setSoundStatus, soundStatus}) => {
  return (
    <div className={`${classes['container-toggle-sound']} custom-control custom-switch`}>
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitch1"
        checked={soundStatus}
        onChange={() => setSoundStatus(!soundStatus)}
      />
      <label className={`${classes.label} custom-control-label`} htmlFor="customSwitch1">
        <i className="fas fa-music"></i>
      </label>
    </div>
  );
};

export default ToggleSound;
