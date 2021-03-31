import React from "react";

const Error = ({error}) => {
  return (
    <div className='alert alert-dismissible alert-success'>
      <strong>Error!</strong> {error}
    </div>
  );
};

export default Error;
