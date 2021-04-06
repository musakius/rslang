import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import Spinner from '../../../../components/Spinner';
import Page from './Page';

const SectionContent = ({ setCurrentPage = () => { } }) => {
  const { group } = useParams();
  if (group) {
    localStorage.setItem('textbookGroup', group);
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let currentPage = localStorage.getItem('textbookPage') || 1;
  const [page, setPage] = useState(+currentPage);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    api.getUserWordsAll()
      .then((result) => setUserWords(filterUserWords(result)))
      .catch((error) => setError(error.message));
  }, [api])

  useEffect(() => {
    const _page = +page - 1;
    api
      .getWordsAll(group, _page)
      .then((wordsResult) => {
        setWordsSet(filterWords(wordsResult, userWords))
        setIsLoaded(true);
      })
      .catch((error) => setError(error.message));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, userWords]);

  const filterWords = (result, userWordsResult) => {
    if (userWordsResult.length === 0) return result;
    return result.filter((word) => userWordsResult.filter((userWord) => userWord.wordId === word.id).length === 0)
  };

  const filterUserWords = (result) => {
    if (result.length === 0) return result;
    return result.filter((word) => word.optional.isDeleted === true)
  }

  const handlePageChange = (pageNum) => {
    localStorage.setItem('textbookPage', pageNum);
    setPage(pageNum);
    setCurrentPage(pageNum);
  };

  if (error) {
    return <Error error={error} />;
  }
  if (!isLoaded) {
    return <Spinner size="40px" />;
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
