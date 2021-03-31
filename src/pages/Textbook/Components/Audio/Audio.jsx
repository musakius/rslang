import React, { useMemo } from "react";
import classes from "../SectionContent/SectionContent.module.scss";

const Audio = ({ audioURL, audioMeaningURL, audioExampleURL }) => {
  return (
    <figure className={classes.figure}>
      <audio controls>
        <source src={audioMeaningURL} type='audio/mpeg' />
        <source src={audioURL} type='audio/mpeg' />
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
  );
};

export default Audio;
