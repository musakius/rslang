import React from 'react';
import style from './Features.module.scss'

import Cards from './Cards'

const Features = () => {

    return (
        <div className={style.features}>
            <h2 className={style.title}>Выучите английский вместе с Rs Lang </h2>
            <p className={style.subtitle}>Увлекательное изучение английского языка с помощью мини-игр в любое удобное
                для вас время</p>

            <h4 className={style.features}>Почему нужно выбрать наше приложение</h4>

            <div className="container-fluid d-flex justify-content-center mb-5">
                <div className="row">
                    <div className="col-md-4"><Cards 
                        title={"Игры"} 
                        text={"Изучай слова в игровой форме и забудь о скучном изучении!"}/></div>
                    <div className="col-md-4"><Cards 
                        title={"Настрой под себя"}
                        text={"Beginner или Proficiency? Выбери свой уровень владения языком!"}
                        /></div>
                    <div className="col-md-4"><Cards 
                        title={"Статистика"}
                        text={"Следи за своим прогрессом и улучшай его!"}
                        /></div>                        
                </div>
            </div>
        
        </div>
    );
}

export default Features;
