import {React, useState, useEffect} from 'react';
import Question from './Question';
import Answers from './Answers';
import EndGame from './EndGame';
import ToggleSound from './ToggleSound';

import winSound from '../audio/true.mp3';
import falseSound from '../audio/false.mp3';

const Gamefield = (props) => {

  const [variants, setVariants] = useState();
  const [round, setRound] = useState(0);
  const [finishRound, setFinishRound] = useState(false);
  const [errors, setErrors] = useState([]);
  const [winMusic] = useState(new Audio(winSound));
  const [falseMusic] = useState(new Audio(falseSound));
  const [goodAnswers, setGoodAnswers] = useState([]);
  
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
      console.log('Игра закончена');
    }    
  }

  function colorizeGoodAnswer() {
    
    let answers = document.querySelectorAll('.answer');
    let question = document.querySelector('.question');
    let questionId = variants[round].id;

    for(let item of answers) {
      if(item.id === questionId) {
        item.classList.add('right');
        setTimeout(() => {
          item.classList.remove('right');
        }, 2000);
      }
    }
  }

  function overlayChange() {
    let overlay = document.querySelector('.overlay');
    overlay.classList.remove('none');
    setTimeout(() => {
      overlay.classList.add('none');
    }, 2000);
  }
  
  function playerChoice(event) {
    let answerId = event.target.id
    let questionId = variants[round].id;
    let question = document.querySelector('.voice-question');
    let soundButton = document.querySelector("#sound-button");

    question.classList.remove('question--active');
    overlayChange();

    if(answerId === questionId) {
      console.log('Правильно');
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
      console.log('Неправильно');
      event.target.classList.add('error');
      colorizeGoodAnswer();
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
        console.log('Игра закончена');  
      }, 2000);      
    }

    setTimeout(() => {
      changeRound(); 
    }, 2000);
  }
  
  function changeVolume(event) {
    if(event.target.className === "sound-on") {
      event.target.className = "non-sound";
    } else {
      event.target.className = "sound-on";
    }
    console.log(event.target);
  }

  return (
    <>
      {finishRound
        ? <EndGame goodAnswers={goodAnswers} errors={errors} points={props.points}/>
        : <>
            <Question round={round} variants={variants} />
            <Answers playerChoice={playerChoice} round={round} variants={variants} changeRound={changeRound} />
            <ToggleSound changeVolume={changeVolume} />
            <div className="overlay none"></div>
          </>
      }     
    </>
  )
}

export default Gamefield;