import React, {useState} from 'react';
import Spinner from '../../Spinner';

/* import classes from './Pronounce.module.scss'; */

const audioWord = (url, setLoad, soundStatus) => {
  const audio = new Audio(`https://apprslang.herokuapp.com/${url}`);

  setLoad(true);

  audio.addEventListener('loadedmetadata', () => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
  });

  if (soundStatus) {
    setTimeout(() => {
      audio.play();
    }, 600);
  }
};

const Pronounce = ({audio, soundStatus, color}) => {
  const [load, setLoad] = useState(false);

  return load ? (
    <Spinner size="20px" color={color} />
  ) : (
    <i className="fas fa-volume-up" onClick={() => audioWord(audio, setLoad, soundStatus)} />
  );
};

export default Pronounce;
