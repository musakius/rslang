import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "../../../../services";
import Error from "../../../../components/Error";
import Spinner from "../Spinner/";
import Page from "./Page";

const SectionContent = ({ setCurrentPage = () => {}}) => {
  const { group } = useParams();
  if (group) {
    localStorage.setItem("textbookGroup", group);
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let currentPage = localStorage.getItem("textbookPage") || 1;
  const [page, setPage] = useState(+currentPage);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api
      .getWordsAll(group, +page - 1)
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
  }, [api, group, page]);

  const handlePageChange = (pageNum) => {
    localStorage.setItem("textbookPage", pageNum);
    setPage(pageNum);
    setCurrentPage(pageNum);
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
          setWordsSet={setWordsSet}
          handlePageChange={handlePageChange}
          page={page}
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
