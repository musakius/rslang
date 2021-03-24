import React, {useState, useCallback} from 'react';
import StyleRules from './style.ModalRules';

const ModalRules = ({setModalRules, rulesText}) => (
  <StyleRules>
    <div className="pop-up">
      <div className="top warning">
        <div className="icon">
          <img src="/assets/images/common/quest.svg" alt="question in round" />
        </div>
        <section className="content">
          <p>{rulesText}</p>
        </section>
      </div>
      <div className="bottom">
        <section className="btn-wrapper">
          <button className="exit" type="button" onClick={setModalRules}>
            Понятно
          </button>
        </section>
      </div>
    </div>
  </StyleRules>
);

const Rules = ({rules}) => {
  const [isRules, setIsRules] = useState(false);

  const onRulesClickHandler = useCallback((isRule) => {
    setIsRules(!isRule);
  }, []);

  return (
    <div onClick={() => onRulesClickHandler(isRules)}>
      {isRules ? <ModalRules setModalRules={() => setIsRules(true)} rulesText={rules} /> : false}
      <img
        style={{cursor: 'pointer'}}
        className="question"
        src="/assets/images/common/rules-icon.svg"
        alt="question with info about game"
      />
    </div>
  );
};

export default Rules;
