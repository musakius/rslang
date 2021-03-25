import React from "react";

const Settings = () => {
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
                value=''
                checked=''
              />
              Отображать перевод
            </label>
          </div>
          <div className='form-check'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='checkbox'
                value=''
                checked=''
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
