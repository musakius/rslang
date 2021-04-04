import React, { useEffect, useMemo, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Audio from '../Audio/';
import classes from './SectionContent.module.scss';
import Service from '../../../../services';

const WordCard = ({ wordObj, currentTheme }) => {
  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showHeader, setShowHeader] = useState(settingBtn);
  const [showTranslate, setShowTranslate] = useState(settingTranslate);
  const [button, setButton] = useState('Удалить');
  const [icon, setIcon] = useState('fa-trash-alt');
  const [btnColor, setBtnColor] = useState("btn-outline-danger");
  const mode = localStorage.getItem('userPage') || "";
  const dictionarySection = localStorage.getItem('dictionarySection') || "";

  const baseUrl = "https://apprslang.herokuapp.com/";

  const imgURL = `${baseUrl}${wordObj.image}`;
  const audioURL = `${baseUrl}${wordObj.audio}`;
  const audioMeaningURL = `${baseUrl}${wordObj.audioMeaning}`;
  const audioExampleURL = `${baseUrl}${wordObj.audioExample}`;

  const post = useMemo(() => new Service(), []);

  useEffect(() => {
    setShowHeader(settingBtn);
    return () => {};
  }, [settingBtn]);

  useEffect(() => {
    setShowTranslate(settingTranslate);
    return () => {};
  }, [settingTranslate]);

  useEffect(() => {
    if(mode === "dictionary") {
      if(dictionarySection === '2') {
        setShowHeader(true);
        setButton("Восстановить");
        setIcon('fa-trash-restore-alt');
        setBtnColor("btn-success");
      } else {
        setShowHeader(false);
      }
    }
    return () => {
      setShowHeader(settingBtn);
    }
  }, [mode, dictionarySection])

  const setDifficultWord = (id) => {};

  const deleteWord = (id) => {};

  return (
    <div className={classes.wordCard}>
      <div className="card text-white bg-light mr-5 ml-5 mb-5">
        {showHeader ? (
          <div className="card-header d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setDifficultWord(wordObj.id)}
            >
              <i className="fas fa-brain mr-2"></i>
              Сложное слово
            </button>
            <button
              type="button"
              className={`btn ${btnColor}`}
              onClick={() => deleteWord(wordObj.id)}
            >
              <i className={`fas ${icon} mr-2`}></i>
              {button}
            </button>
          </div>
        ) : null}

        <div className="card-body">
          <div className={classes.card}>
            <div
              className={`${classes.image} card-body p-0 `}
              style={{
                backgroundImage: `url(${imgURL})`,
              }}
            />
            <div className="card-body align-self-start p-0 ml-2">
              <div className=' d-flex flex-column m-0'>
              <h4 className="card-title">{`${wordObj.word} ${wordObj.transcription}`}</h4>
              {showTranslate && (
                <h5 className="card-text text-dark">
                  {' '}
                  {wordObj.wordTranslate}
                </h5>
              )}
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-text">
              <div
                dangerouslySetInnerHTML={{ __html: wordObj.textExample }}
              ></div>
            </h5>
            {showTranslate && (
              <p className="card-text text-dark">
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
  };
};

export default connect(mapStateToProps, null)(WordCard);
