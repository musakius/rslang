import {React, useState, useEffect} from 'react';
import Question from './Question';
import Answers from './Answers';
import EndGame from './EndGame';
import ToggleSound from './ToggleSound';
import { connect } from 'react-redux';

import winSound from '../audio/true.mp3';
import falseSound from '../audio/false.mp3';


const Gamefield = (props, {gameInfo}) => {

  const [variants, setVariants] = useState();
  const [round, setRound] = useState(0);
  const [finishRound, setFinishRound] = useState(false);
  const [errors, setErrors] = useState([]);
  const [winMusic] = useState(new Audio(winSound));
  const [falseMusic] = useState(new Audio(falseSound));
  const [goodAnswers, setGoodAnswers] = useState([]);

  
  console.log(gameInfo);

  let url = `https://apprslang.herokuapp.com/words?page=2&group=${props.complexity}`;

  async function getWords(url) {
    let responce = await fetch(url);
    let content = await responce.json(); 
    setVariants(content);
  }
  
  useEffect(() => {
    getWords(url);
  }, [url])

  function changeRound() {
    if(round < 19) {
      setRound(round + 1);
    } else {
      setFinishRound(true);
    }    
  }
  
  function playerChoice(event) {
    let answerId = event.target.id
    let questionId = variants[round].id;
    let question = document.querySelector('.question');
    let soundButton = document.querySelector("#sound-button");
    
    question.classList.remove('question--active');

    if(answerId === questionId) {
      event.target.classList.add('right');
      if(soundButton.classList.contains('sound-on')) {
        winMusic.play();
      }
      
      setTimeout(() => {
        setGoodAnswers([...goodAnswers, variants[round]]);
        props.plusPoint();
        event.target.classList.remove('right');     
      }, 2000);
    } else if(props.lifes > 1) {
      event.target.classList.add('error');
      if(soundButton.classList.contains('sound-on')) {
        falseMusic.play();
      }     
      
      setTimeout(() => {
        setErrors([...errors, variants[round]]);
        props.minusLife();
        event.target.classList.remove('error');  
      }, 2000);
    } else {
      event.target.classList.add('error');
      if(soundButton.classList.contains('sound-on')) {
        falseMusic.play();
      }      

      setTimeout(() => {
        setErrors([...errors, variants[round]]);
        props.minusLife();
        event.target.classList.remove('error');
        setFinishRound(true);  
      }, 2000);      
    }

    setTimeout(() => {
      question.classList.add('question--active');
      changeRound(); 
    }, 2000);
  }

  function timeIsOver() {
    let soundButton = document.querySelector("#sound-button");
    let question = document.querySelector('.question');

    if(props.lifes > 1 && round < 20) {
      changeRound();
      props.minusLife();
      question.classList.remove('question--active');
      setErrors([...errors, variants[round]]);
      if(soundButton.classList.contains('sound-on')) {
        falseMusic.play();
      }      

      setTimeout(() => {     
        question.classList.add('question--active'); 
      }, 1000);
    } else {
      setErrors([...errors, variants[round]]);
      setFinishRound(true);
    }  
  }
  
  function changeVolume(event) {
    if(event.target.className === "sound-on") {
      event.target.className = "non-sound";
    } else {
      event.target.className = "sound-on";
    }
  }

  return (
    <>
      {finishRound
        ? <EndGame goodAnswers={goodAnswers} errors={errors} points={props.points}/>
        : <>
            <Question timeIsOver={timeIsOver} round={round} variants={variants} />
            <Answers playerChoice={playerChoice} round={round} variants={variants} changeRound={changeRound} />
            <ToggleSound changeVolume={changeVolume} />
          </>
      }     
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    gameInfo: state.gameInfo.gameInfo,
  };
};

export default connect(mapStateToProps, null)(Gamefield);