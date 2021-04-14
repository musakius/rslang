import React from "react";

const Error = ({ error }) => {
  return (
    <div className='alert alert-dismissible alert-danger'>
      <strong>Error!</strong>
      <div className='text-start word-wrap text-break'>
        {error}
      </div>
    </div>
  );
};

export default Error;
