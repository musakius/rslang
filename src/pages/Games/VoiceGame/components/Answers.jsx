import React from 'react';

const Answers = (props) => { 
  let round = props.round;
  let variants = props.variants;
  let isLoaded;

  if(variants === undefined || null) {
    isLoaded = false;
  } else {
    isLoaded = true;
  }

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function makeRandomArr(a, b) {
    return Math.random() - 0.5;
  }

  let answers = [];
  function createAnswers() {
    
    if(isLoaded) {
      answers.push(variants[round]);

      while(answers.length < 4) {
        let number = randomInteger(0, 19);
        if(number !== round) {
          answers.push(variants[number]);
        }
      }

      return answers.sort(makeRandomArr);
    }
  }
  createAnswers();

  return (
    <>
      {isLoaded
        ? <div className="answers-wrapper">
            <div className="answer" id={answers[0].id} onClick={props.playerChoice}>{answers[0].wordTranslate}</div>
            <div className="answer" id={answers[1].id} onClick={props.playerChoice}>{answers[1].wordTranslate}</div>
            <div className="answer" id={answers[2].id} onClick={props.playerChoice}>{answers[2].wordTranslate}</div>
            <div className="answer" id={answers[3].id} onClick={props.playerChoice}>{answers[3].wordTranslate}</div>
          </div>
        : <div className="answers-wrapper">
            <div className="answer">Загрузка</div>
            <div className="answer">Загрузка</div>
            <div className="answer">Загрузка</div>
            <div className="answer">Загрузка</div>
          </div>
      }
    </>
  )
}

export default Answers;