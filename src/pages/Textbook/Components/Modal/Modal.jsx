import React from "react";
import classes from './Modal.module.scss';

const Modal = ({ message, setMessage }) => {

    const close = () => {
        document.getElementById("modalBox").style.display = "none";
        document.getElementById("modalBox").classList.remove('show');
        setMessage(null);
    }
    console.log('modal message', message);
    return (
        <div id="modalBox" className={`${classes.modal} modal`}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Запрос обработан</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => close()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => close()}>×</button> */}
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => close()}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Modal;
