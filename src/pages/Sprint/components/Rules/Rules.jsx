import React, {useState, useCallback} from 'react';
import classes from './Rules.module.scss';

const ModalRules = ({setModalRules, rulesText}) => (
  <section classes={classes['container-rules']}>
    <div className={classes['pop-up']}>
      <div className={`${classes.top} ${classes.warning}`}>
        <div className={classes.icon}>
          <img src="/assets/images/common/quest.svg" alt="question in round" />
        </div>
        <section className={classes.content}>
          <p>{rulesText}</p>
        </section>
      </div>
      <div className={classes.bottom}>
        <section className={classes['btn-wrapper']}>
          <button className={classes.exit} type="button" onClick={setModalRules}>
            Понятно
          </button>
        </section>
      </div>
    </div>
  </section>
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
        className={classes.question}
        src="/assets/images/common/rules-icon.svg"
        alt="question with info about game"
      />
    </div>
  );
};

export default Rules;
