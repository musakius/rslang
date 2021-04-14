import React from 'react';
import ReactPlayer from 'react-player'
import './Video.css'

const Video = () => {
    return (
        <div className='app'>
            <ReactPlayer
                controls
                url='https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=177s'
                height="360px"
                width="640px"
            />
        </div>
    );
}

export default Video;
