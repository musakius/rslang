import React from 'react';
import Lifes from './Lifes';
import Progress from './Progress';

const Statistics = (props) => {
  
  return (
    <div className="statistics">
      <Lifes lifes={props.lifes}/>
      <Progress points={props.points}/>
    </div>
  )
}

export default Statistics;