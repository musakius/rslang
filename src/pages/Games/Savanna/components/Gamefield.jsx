import {React, useState, useEffect} from 'react';
import Question from './Question';
import Answers from './Answers';

const Gamefield = (props) => {

  const [variants, setVariants] = useState();
  const [round, setRound] = useState(0);

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
    setRound(round + 1);
  }
  
  function playerChoice(event) {
    let answerId = event.target.id
    let questionId = variants[round].id;
    let question = document.querySelector('.question');
    
    question.classList.remove('question--active');

    if(answerId === questionId) {
      console.log('Правильно');
      event.target.classList.add('right');

      setTimeout(() => {
        event.target.classList.remove('right');     
      }, 2000);
    } else {
      console.log('Неправильно');
      event.target.classList.add('error');
      
      setTimeout(() => {
        event.target.classList.remove('error');   
      }, 2000);
    }

    setTimeout(() => {
      question.classList.add('question--active');
      changeRound(); 
    }, 2000);
  }

  function timeIsOver() {
    changeRound();
    props.minusLife();
  }
  
  console.log(props);
  
  

  


  return (
    <>
      <Question timeIsOver={timeIsOver} round={round} variants={variants} />
      <Answers playerChoice={playerChoice} round={round} variants={variants} changeRound={changeRound} />
    </>
  )
}

export default Gamefield;