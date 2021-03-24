import React from "react";

const WordCard = ({ wordObj }) => {
  return (
    <div>
      <div className='card mb-3'>
        <h3 className='card-header'>
            <button>Сложное</button>
            <button>Удалить</button>
        </h3>
        <div className='card-body'>
          <h5 className='card-title'>{`${wordObj.word} ${wordObj.transcription}`}</h5>
          <div style={{backgroundImage: `url(${wordObj.image})`}}/>
        </div>

        <div className='card-body'>
          <p className='card-text'>
            {wordObj.textExample}
          </p>
          <p className='card-text'>
            {wordObj.textExampleTranslate}
          </p>
        </div>
        <div className='card-footer text-muted'>2 days ago</div>
      </div>     
    </div>
  );
};

export default WordCard;
