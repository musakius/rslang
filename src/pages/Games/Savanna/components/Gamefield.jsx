import {React, useState, useEffect} from 'react';
import Question from './Question';
import Answers from './Answers';
import EndGame from './EndGame';

import winSound from '../audio/true.mp3';
import falseSound from '../audio/false.mp3';

const Gamefield = (props) => {

  const [variants, setVariants] = useState();
  const [round, setRound] = useState(0);
  const [finishRound, setFinishRound] = useState(false);
  const [errors, setErrors] = useState([]);
  const [winMusic] = useState(new Audio(winSound));
  const [falseMusic] = useState(new Audio(falseSound));

  let url = 'https://apprslang.herokuapp.com/words?page=2&group=0';

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
  
  function playerChoice(event) {
    let answerId = event.target.id
    let questionId = variants[round].id;
    let question = document.querySelector('.question');
    
    question.classList.remove('question--active');

    if(answerId === questionId) {
      console.log('Правильно');
      event.target.classList.add('right');
      winMusic.play();

      setTimeout(() => {
        props.plusPoint();
        event.target.classList.remove('right');     
      }, 2000);
    } else if(props.lifes > 1) {
      console.log('Неправильно');
      event.target.classList.add('error');
      falseMusic.play();
      
      setTimeout(() => {
        setErrors([...errors, variants[round]]);
        props.minusLife();
        event.target.classList.remove('error');  
      }, 2000);
    } else {
      event.target.classList.add('error');

      setTimeout(() => {
        setErrors([...errors, variants[round]]);
        props.minusLife();
        event.target.classList.remove('error');
        setFinishRound(true);
        console.log('Игра закончена');  
      }, 2000);
      
    }

    setTimeout(() => {
      question.classList.add('question--active');
      changeRound(); 
    }, 2000);
  }

  function timeIsOver() {
    let question = document.querySelector('.question');

    if(props.lifes > 1 && round < 20) {
      changeRound();
      props.minusLife();
      question.classList.remove('question--active');
      setErrors([...errors, variants[round]]);
      falseMusic.play();

      setTimeout(() => {     
        question.classList.add('question--active'); 
      }, 1000);
    } else {
      setErrors([...errors, variants[round]]);
      setFinishRound(true);
      console.log('Игра закончена');
    }  
  }

  

  return (
    <>
      {finishRound
        ? <EndGame errors={errors} points={props.points}/>
        : <>
            <Question timeIsOver={timeIsOver} round={round} variants={variants} />
            <Answers playerChoice={playerChoice} round={round} variants={variants} changeRound={changeRound} />
          </>
      }
      
      
    </>
  )
}

export default Gamefield;