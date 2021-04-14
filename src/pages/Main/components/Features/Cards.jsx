import React from 'react'
import './card-style.css'

const Cards = (props) => {
    return (
        <div className="text-center ">

            <div className="cardFeatures card-body text-dark">
                <h4 className="card-title text-white">{props.title}</h4>
                <p className="card-text text-white">
                    {props.text}
                </p>
            </div>

        </div>
    )
}

export default Cards