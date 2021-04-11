import React, { useEffect, useState } from 'react';
import classes from '../SectionContent/SectionContent.module.scss';

const Audio = ({ flow }) => {
  const [play, setPlay] = useState(false);
  let context = null;
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  } catch (e) {
    console.log('Ваш браузер не поддерживает audio API');
  }
  let buffer = null;
  let destination = null;
  let source1 = null;
  let source2 = null;
  let source3 = null;

  const loadSoundFile = (url) => {
    var response = new XMLHttpRequest();
    response.open('GET', url, true);
    response.responseType = 'arraybuffer';
    response.onload = function (e) {
      context.decodeAudioData(
        this.response,
        function (decodedArrayBuffer) {
          buffer = decodedArrayBuffer;
        },
        function (e) {
          console.log('Error decoding file', e);
        }
      );
    };
    response.send();
  };
  const createSource = () => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    destination = context.destination;
    source.connect(destination);
    return source;
  };

  const playSource = () => {
    console.log('play');
    console.log('play',play);
    if (!play) {
      stopSource();
      return;
    }
    source1 = createSource();
    source1.start(0);
    loadSoundFile(flow[1]);
    source1.onended = (event) => {
      source1 = null;
      source2 = createSource();
      source2.start(0);
      loadSoundFile(flow[2]);
      source2.onended = (event) => {
        source2 = null;
        source3 = createSource();
        source3.start(0);
        source3.onended = (event) => {
          source3 = null;
        };
      };
    };
  };
  const stopSource = () => {
    console.log('stop');
    if (source1) source1.stop();
    if (source2) source2.stop();
    if (source3) source3.stop();
  };

  useEffect(() => {
    playSource();
  }, [play]);

  loadSoundFile(flow[0]);

  return (
    <div
      type="button"
      className={`${classes.audioBtn} fas fa-music`}
      onClick={() => setPlay(!play)}
    ></div>
  );
};

export default Audio;
