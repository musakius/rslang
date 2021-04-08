import {React, useState, useEffect} from 'react';


const Question = (props) => {
  let round = props.round;
  let variants = props.variants;
  let isLoaded;
  let audioURL;

  const [audioFile] = useState(new Audio(audioURL));

  if(variants === undefined || null) {
    isLoaded = false;
  } else {
    isLoaded = true; 
    audioURL = variants[round].audio; 
    audioURL = `https://apprslang.herokuapp.com/${audioURL}`;
  }

  function playAudio(event) {
    audioFile.src = audioURL;
    audioFile.play();
  }

  return (
    
    <>
    {isLoaded  
      ? <div className="voice-question" onClick={playAudio}></div>
      : <div className="voice-question--loading">....</div>
    }
    </>
  )
}

export default Question;