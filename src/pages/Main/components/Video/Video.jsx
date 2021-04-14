import React from 'react';
import ReactPlayer from 'react-player'
import './Video.css'

const Video = () => {
    return (
        <div>

        <p className='videoText '>Посмотри видео и узнай как использовать приложение!!!</p>

        <div className='app'>

            <ReactPlayer
                controls
                url='https://www.youtube.com/watch?v=sRl1XG9IurA'
                height="360px"
                width="640px"
            />
        </div>
        </div>
    );
}

export default Video;
