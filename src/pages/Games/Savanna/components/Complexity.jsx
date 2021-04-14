import { render } from '@testing-library/react';
import React from 'react';

const Complexity = (props) => {

  return (
    <div className="complexity-wrapper card text-white bg-secondary mb-3">
      <div className="card-header">Выберите уровень</div>
        <select className="form-control" onChange={props.changeComplexity}>
          <option value="0">Самый лёгкий</option>
          <option value="1">Простой</option>
          <option value="2">Средний</option>
          <option value="3">Выше среднего</option>
          <option value="4">Сложный</option>
          <option value="5">Очень сложный</option>
        </select>
    </div>
  )
}

export default Complexity;