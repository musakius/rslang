import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../../services";
import Error from "../../Error/";
import Spinner from "../Spinner/";
import Page from "./Page";

const SectionContent = () => {
  const { group } = useParams();
  if (group) {
    localStorage.setItem("textbookGroup", group);
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let currentPage = localStorage.getItem("textbookPage") || 0;
  const [page, setPage] = useState(currentPage);

  let partUrl = `words?group=${group}`;
  if (page) {
    partUrl += `&page=${+page - 1}`;
  }

  const api = useMemo(() => new Service(), [group, page]);

  useEffect(() => {
    api
      ._getResource(partUrl)
      .then((result) => {
        setWordsSet(result);
        setIsLoaded(true);
      })
      .catch((error) => setError(error.message));
    return () => {
      setError(null);
      setIsLoaded(false);
      setWordsSet([]);
    };
  }, [api]);

  const handlePageChange = (pageNum) => {
    localStorage.setItem("textbookPage", pageNum);
    setPage(pageNum);
  };

  if (error) {
    return <Error error={error} />;
  }
  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div>
      {wordsSet ? (
        <Page
          wordsSet={wordsSet}
          handlePageChange={handlePageChange}
          page={page}
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
