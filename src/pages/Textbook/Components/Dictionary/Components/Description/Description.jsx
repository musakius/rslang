import React from 'react';
import { items } from '../../../../config';

const Description = ({ group }) => {
  const description = items.filter((item) => item.group === +group)[0]
    .description;
  return <div className="d-flex w-100 justify-content-center">
    <h5>
    {description}
    </h5>
    </div>;
};

export default Description;
