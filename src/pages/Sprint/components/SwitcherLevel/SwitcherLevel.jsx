import React, {useState, useCallback, useEffect} from 'react';
import classes from './SwitcherLevel.module.scss';

const countLevel = 6;
let levels = new Array(countLevel);
levels = levels.fill(' ').map((el, index) => index + 1);

const SwitcherLevel = ({changeLevel, currentLevel}) => {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (currentLevel && currentLevel !== level) {
      setLevel(currentLevel);
    }
  }, [level, currentLevel]);

  const handlerOnClick = useCallback(
    (level, index) => {
      setLevel(level);
      changeLevel(index);
    },
    [changeLevel]
  );

  return (
    <section className={classes['container-level-switcher']}>
      <div className={classes.content}>
        <p className={classes['count-level']}>Уровень</p>
        <ul className={classes['list-levels']}>
          {levels.map((level, index) => (
            <li
              key={level}
              onClick={() => handlerOnClick(level, index)}
              className={`${classes.level} ${level === level ? 'active' : ''}`}
              role="menuitem"
            >
              <p>{level}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SwitcherLevel;
