import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showButtons, showTranslate } from "../../../../redux/actions";

const Settings = () => {
  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showBtn, setShowBtn] = useState(settingBtn);
  const [showTrnslt, setShowTrnslt] = useState(settingTranslate);
  const dispatch = useDispatch();


  const handleTranslateChange = () => {
    setShowTrnslt(!showTrnslt);
    dispatch(showTranslate(!showTrnslt));
  }
  const handleBtnChange = () => {
    setShowBtn(!showBtn);
    dispatch(showButtons(!showBtn));
  }
  return (
    <div className='card border-info mb-3'>
      <div className='card-header'>
        <i className='fas fa-tools'></i>
        &nbsp;Настройки
      </div>
      <div className='card-body'>
        <fieldset className='form-group'>
          <div className='form-check'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={showTrnslt}
                onChange={() => handleTranslateChange()}
              />
              Отображать перевод
            </label>
          </div>
          <div className='form-check'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={showBtn}
                onChange={() => handleBtnChange()}
              />
              Отображать кнопки
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Settings;
