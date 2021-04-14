import React from 'react';

const DifficultyMarker = () => {
  return (
    <div className="m-0 p-0 d-flex flex-row justify-content-center align-items-center">
      <i className="fas fa-brain mr-2 fa-sm text-danger">{` Вы отметили это слово, как сложное`}</i>
    </div>
  );
};

export default DifficultyMarker;
