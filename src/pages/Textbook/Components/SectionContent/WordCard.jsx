import React, { useEffect, useMemo, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Audio from '../Audio/';
import classes from './SectionContent.module.scss';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import { updateWord } from '../../utils/queries';

const WordCard = ({ wordObj, currentTheme, setIsDeleted, setMessage, difficultyDisable }) => {
  console.log('difficultyDisable', difficultyDisable)
  let token = null;
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      token = user.token;
    }
  }
  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showHeader, setShowHeader] = useState(settingBtn);
  const [showTranslate, setShowTranslate] = useState(settingTranslate);
  const [button, setButton] = useState('Удалить');
  const [btnMode, setBtnMode] = useState('d');
  const [disable, setDisable] = useState(difficultyDisable);
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState('fa-trash-alt');
  const [btnColor, setBtnColor] = useState("btn-outline-danger");
  const mode = localStorage.getItem('userPage') || "";
  const dictionarySection = localStorage.getItem('dictionarySection') || "";

  const baseUrl = "https://apprslang.herokuapp.com/";

  const imgURL = `${baseUrl}${wordObj.image}`;
  const audioURL = `${baseUrl}${wordObj.audio}`;
  const audioMeaningURL = `${baseUrl}${wordObj.audioMeaning}`;
  const audioExampleURL = `${baseUrl}${wordObj.audioExample}`;

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    setBtnDisabled(wordObj.id, disable);
  }, [wordObj]);

  useEffect(() => {
    setShowHeader(settingBtn);
    return () => { };
  }, [settingBtn]);

  useEffect(() => {
    setShowTranslate(settingTranslate);
    return () => { };
  }, [settingTranslate]);

  useEffect(() => {
    if (mode === "dictionary") {
      if (dictionarySection === '2') {
        setShowHeader(true);
        setButton("Восстановить");
        setIcon('fa-trash-restore-alt');
        setBtnColor("btn-success");
        setBtnMode('r');
      } else {
        setShowHeader(false);
      }
    }
    return () => {
      setShowHeader(settingBtn);
    }
  }, [mode, dictionarySection])

  const setBtnDisabled = (id, disabled) => {
    const diffcltBtn = document.getElementById(`diffcltBtn${id}`);
    diffcltBtn.disabled = disabled;
  }

  const updateCurrentWord = (id, mode) => {
    const result = updateWord(api, id, mode);
    console.log("result", result);
    if (!result.error) {
      setMessage(result.message);
      if (mode === 'u') {
        setBtnDisabled(id, true);
      }
      if (mode === 'd') {
        setIsDeleted(id);
      }
    } else {
      setError(result.error);
    }
  }

  return (
    <div className={classes.wordCard}>
      <div className="card text-white bg-light mr-5 ml-5 mb-5">
        {showHeader ? (
          <div className="card-header d-flex justify-content-between">
            <button
              id={`diffcltBtn${wordObj.id}`}
              type="button"
              className={`btn btn-outline-secondary`}
              onClick={() => updateCurrentWord(wordObj.id, 'u')}
            >
              <i className="fas fa-brain mr-2"></i>
              Сложное слово
            </button>
            <button
              type="button"
              className={`btn ${btnColor}`}
              onClick={() => updateCurrentWord(wordObj.id, btnMode)}
            >
              <i className={`fas ${icon} mr-2`}></i>
              {button}
            </button>
          </div>
        ) : null}

        <div className="card-body">
          {difficultyDisable &&
            <div className='m-0 p-0 d-flex flex-row justify-content-center align-items-center'>
              <i className="fas fa-brain mr-2 fa-sm text-danger">{` Вы отметили это слово, как сложное`}</i>
            </div>
          }
          <div className={`${classes.card} card-body`}>
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
