import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showButtons, showTranslate } from "../../../../redux/actions";

const Settings = () => {
  const settingBtn = useSelector((state) => state.settings.showButtons);
  const settingTranslate = useSelector((state) => state.settings.showTranslate);
  const [showBtn, setShowBtn] = useState(settingBtn);
  const [showTrnslt, setShowTrnslt] = useState(settingTranslate);
  const dispatch = useDispatch();


  const handleTranslateChange = (event) => {
    const target = event.target;
    const value = target.checked;
    setShowTrnslt(value);
    dispatch(showTranslate(value));
  }
  const handleBtnChange = (event) => {
    const target = event.target;
    const value = target.checked;
    setShowBtn(value);
    dispatch(showButtons(value));
  }
  return (
    <div className='card border-info mb-3'>
      <div className='card-header'>
        <i className='fas fa-tools mr-2'></i>
        Настройки
      </div>
      <div className='card-body'>
        <fieldset className='form-group'>
          <div className='form-check'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={showTrnslt}
                onChange={(event) => handleTranslateChange(event)}
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
                onChange={(event) => handleBtnChange(event)}
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
