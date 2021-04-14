import React, { useEffect, useState } from "react";
import {loadFlow, playSource, stopSource} from './audioHandler';
import "./Audio.scss";

const Audio = ({ flow }) => {
  //const [play, setPlay] = useState(false);

  const load = () => {
    loadFlow(flow);
    playSource();
  }

  return (
    <div
      id='btnPlay'
      type='button'
      className='audio-btn fas fa-music'
      onClick={() => load()}
    />
  );
};

export default Audio;
