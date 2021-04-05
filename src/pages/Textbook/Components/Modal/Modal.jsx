import React from "react";
import classes from './Modal.module.scss';

const Modal = ({ message, setShowModal }) => {
    console.log('modal message', message);
    return (
        <div className={`${classes.modal}`}>
            <div className="modal-content">
                <h4>{message}</h4>
                <button onClick={() => setShowModal(false)}>Закрыть</button>
            </div>
        </div>

    );
};

export default Modal;
