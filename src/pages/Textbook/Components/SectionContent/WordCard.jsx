import React from "react";
import classes from "./SectionContent.module.scss";

const WordCard = ({ wordObj }) => {
  const imgURL = `https://apprslang.herokuapp.com/${wordObj.image}`;
  const audioURL = `https://apprslang.herokuapp.com/${wordObj.audio}`;
  const audioMeaningURL = `https://apprslang.herokuapp.com/${wordObj.audioMeaning}`;
  const audioExampleURL = `https://apprslang.herokuapp.com/${wordObj.audioExample}`;

  return (
    <div className={classes.wordCard}>
      <div className='card text-white bg-light mb-3'>
        <div className='card-header d-flex justify-content-between'>
          <button type='button' className='btn btn-outline-secondary'>
            <i className='fas fa-brain'></i>
            &nbsp;Сложное слово
          </button>
          <button type='button' className='btn btn-outline-danger'>
            <i className='fas fa-trash-alt'></i>
            &nbsp;Удалить
          </button>
        </div>
        <div className='card-body'>
          <div className={classes.card}>
            <div
              className={`${classes.image} card-body`}
              style={{
                backgroundImage: `url(${imgURL})`,
              }}
            />
            <div className='card-body'>
              <h4 className='card-title'>{`${wordObj.word} ${wordObj.transcription}`}</h4>
              <h5 className='card-text text-dark'> {wordObj.wordTranslate}</h5>
            </div>
          </div>
          <div className='card-body'>
            <h5 className='card-text'>{wordObj.textExample}</h5>
            <p className='card-text text-dark'>{wordObj.textExampleTranslate}</p>
          </div>
        </div>

        <div className='card-footer d-flex justify-content-between'>
          <figure className={classes.figure}>
            <audio controls>
              <source src={audioMeaningURL} type='audio/mpeg' />
              <source src={audioURL} type='audio/mpeg' />
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
