import React from 'react';
import classes from './SwitcherLevel.module.scss';

const countLevel = 6;
let levels = new Array(countLevel);
levels = levels.fill(' ').map((el, index) => index + 1);

const SwitcherLevel = ({setLevel, level}) => {
  return (
    <section className={classes['container-level-switcher']}>
      <div className={classes.content}>
        <div className={`${classes.content} form-group`}>
          <label htmlFor="level-select" className={classes['title']}>
            Уровень
          </label>
          <select
            className="form-control"
            id="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {levels.map((elem, index) => (
              <option
                key={elem}
                value={elem}
                className={`${classes.item} ${+level === index + 1 ? classes.active : ''}`}
              >
                {elem}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default SwitcherLevel;
