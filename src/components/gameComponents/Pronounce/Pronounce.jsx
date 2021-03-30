import React, {useState} from 'react';
import Spinner from '../../Spinner';

/* import classes from './Pronounce.module.scss'; */

const audioWord = (url, setLoad) => {
  const audio = new Audio(`https://apprslang.herokuapp.com/${url}`);

  setLoad(true);

  audio.addEventListener('loadedmetadata', () => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
  });

  setTimeout(() => {
    audio.play();
  }, 600);
};

const Pronounce = ({audio}) => {
  const [load, setLoad] = useState(false);

  return load ? (
    <Spinner size="20px" />
  ) : (
    <i className="fas fa-volume-up" onClick={() => audioWord(audio, setLoad)} />
  );
};

export default Pronounce;
