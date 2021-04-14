import React, { useState, useEffect } from 'react';
import classes from './Player.module.scss';

const useAudio = (flow) => {
  const audio1 = new Audio(flow[0]);
  const audio2 = new Audio(flow[1]);
  const audio3 = new Audio(flow[2]);
  const [audio, setAudio] = useState(audio1);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing
      ? setTimeout(function () {
          audio.play();
        }, 150)
      : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio1.addEventListener('ended', () => {
      setAudio(audio2);
    });
    audio2.addEventListener('ended', () => {
      setAudio(audio3);
    });
    audio3.addEventListener('ended', () => {
      setPlaying(false);
    });
    return () => {
      audio1.removeEventListener('ended', () => setPlaying(false));
      audio2.removeEventListener('ended', () => setPlaying(false));
      audio3.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ flow }) => {
  const [playing, toggle] = useAudio(flow);
  const [style, setStyle] = useState('fas fa-music');

  useEffect(() => {
    playing ? setStyle('fas fa-pause') : setStyle('fas fa-music');
  }, [playing]);

  return (
    <div
      id="btnPlay"
      type="button"
      className={`${style} ${classes.audioBtn}`}
      onClick={toggle}
    />
  );
};

export default Player;
