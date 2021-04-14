import React from 'react';
import style from './Features.module.scss'

const Features = () => {

    console.log(style.title);

    return (
        <div>
            <h2 className={style.title}>Выучите английский вместе с Rs Lang </h2>
            <p className={style.subtitle}>Увлекательное изучение английского языка с помощью мини-игр в любое удобное
                для вас время</p>
        </div>
    );
}

export default Features;
