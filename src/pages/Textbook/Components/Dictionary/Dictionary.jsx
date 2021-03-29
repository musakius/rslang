import React from "react";
import Button from "../Button/Button";

const Dictionary = () => {
  return (
    <div className='container mt-5'>
      <div className='jumborton'>
        <div className='row'>
          <div className='col-md-3'>
          <Button path={`/textbook`} text='Учебник' style={'fab fa-leanpub'} />
          </div>
          <div className='col-md-3'>2</div>
          <div className='col-md-3'>3</div>
          <div className='col-md-3'>4</div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
