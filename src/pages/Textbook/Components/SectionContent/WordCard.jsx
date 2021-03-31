import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Audio from "../Audio/";
import classes from "./SectionContent.module.scss";

const WordCard = ({ wordObj, currentTheme, userId }) => {
  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showHeader, setShowHeader] = useState(settingBtn);
  const [showTranslate, setShowTranslate] = useState(settingTranslate);

  const imgURL = `https://apprslang.herokuapp.com/${wordObj.image}`;
  const audioURL = `https://apprslang.herokuapp.com/${wordObj.audio}`;
  const audioMeaningURL = `https://apprslang.herokuapp.com/${wordObj.audioMeaning}`;
  const audioExampleURL = `https://apprslang.herokuapp.com/${wordObj.audioExample}`;

  useEffect(() => {
    setShowHeader(settingBtn);
    return () => {};
  }, [settingBtn]);

  useEffect(() => {
    setShowTranslate(settingTranslate);
    return () => {};
  }, [settingTranslate]);

  const setDifficultWord = (id) => {
console.log("id", id);
console.log("userId", userId)
  }

  const deleteWord = (id) => {
    
  }

  return (
    <div className={classes.wordCard}>
      <div className='card text-white bg-light mr-5 ml-5 mb-5'>
        {showHeader ? (
          <div className='card-header d-flex justify-content-between'>
            <button type='button' className='btn btn-outline-secondary' onClick={() => setDifficultWord(wordObj.id)}>
              <i className='fas fa-brain'></i>
              &nbsp;Сложное слово
            </button>
            <button type='button' className='btn btn-outline-danger' onClick={() => deleteWord(wordObj.id)}>
              <i className='fas fa-trash-alt'></i>
              &nbsp;Удалить
            </button>
          </div>
        ) : null}

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
              {showTranslate && (
                <h5 className='card-text text-dark'>
                  {" "}
                  {wordObj.wordTranslate}
                </h5>
              )}
            </div>
          </div>
          <div className='card-body'>
            <h5 className='card-text'>
              <div
                dangerouslySetInnerHTML={{ __html: wordObj.textExample }}
              ></div>
            </h5>
            {showTranslate && (
              <p className='card-text text-dark'>
                {wordObj.textExampleTranslate}
              </p>
            )}
          </div>
        </div>

        <div
          className={`card-footer d-flex justify-content-between bg-${currentTheme}`}
        >
          <Audio
            audioURL={audioURL}
            audioMeaningURL={audioMeaningURL}
            audioExampleURL={audioExampleURL}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTheme: state.theme.value,
    userId: state.user.user[0].userId
  };
};

export default connect(mapStateToProps, null)(WordCard);
