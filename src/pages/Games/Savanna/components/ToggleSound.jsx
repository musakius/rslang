import React from 'react';

const ToggleSound = (props) => {
  return (
    <button className="sound-on" id="sound-button" onClick={props.changeVolume}>Звук</button>
  )
}
export default ToggleSound;