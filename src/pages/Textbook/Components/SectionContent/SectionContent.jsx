import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../../services";
import Error from "../../Error/Error";
import Page from "./Page";

const SectionContent = () => {
  const { group } = useParams();
  const [wordsSet, setWordsSet] = useState([]);
  const [error, setError] = useState(null);

  const partUrl = `words?group=${group}`;

  const api = useMemo(() => new Service(), [group]);

  useEffect(() => {
    api
      ._getResource(partUrl)
      .then((result) => setWordsSet(result))
      .catch((error) => setError(error.message));
    return () => {
      setError(null);
      setWordsSet([]);
    };
  }, [api]);

  console.log("wordsSet", wordsSet);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      <Page wordsSet={wordsSet} />
    </div>
  );
};

export default SectionContent;
