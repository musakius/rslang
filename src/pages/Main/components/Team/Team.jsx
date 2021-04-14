import React from 'react';

import background from './images/undraw_game_day_ucx9.png'

import profile1 from './images/70822491.jpeg'
import profile2 from './images/57825512.jpeg'
import profile3 from './images/58461608.jpeg'
import profile4 from './images/photo_2021-04-04_19-52-33.jpg'

import './Team.css'

const Team = () => {

    return (
        <div>

            <h1 className='team'>Команда разработки</h1>

            <div className='containerTeam'>

                <div className='wrapperTeam'>

                    <div className='cardTeam'>
                        <img src={background} alt="background image" className='cardImg'/>
                        <img src={profile1} alt="background image" className='profile'/>
                        <h1>Irina</h1>
                        <p className='job'>Developer</p>
                        <p className='about'>My work on project</p>
                    </div>

                    <div className='cardTeam'>
                        <img src={background} alt="background image" className='cardImg'/>
                        <img src={profile2} alt="background image" className='profile'/>
                        <h1>Petr Mikhailau</h1>
                        <p className='job'>Developer</p>
                        <p className='about'>My work on project</p>

                    </div>

                    <div className='cardTeam'>
                        <img src={background} alt="background image" className='cardImg'/>
                        <img src={profile3} alt="background image" className='profile'/>
                        <h1>Aleksandr Zanko</h1>
                        <p className='job'>Developer</p>
                        <p className='about'>My work on project</p>

                    </div>

                    <div className='cardTeam'>
                        <img src={background} alt="background image" className='cardImg'/>
                        <img src={profile4} alt="background image" className='profile'/>
                        <h1>Danila</h1>
                        <p className='job'>Developer</p>
                        <p className='about'>My work on project</p>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Team;
