import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import Spinner from '../Spinner/';
import Page from './Page';

const SectionContent = ({ setCurrentPage = () => {} }) => {
  const { group } = useParams();
  if (group) {
    localStorage.setItem('textbookGroup', group);
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let currentPage = localStorage.getItem('textbookPage') || 1;
  const [page, setPage] = useState(+currentPage);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    const _page = +page - 1;
    api
      .getWordsAll(group, _page)
      .then((result) => {
        setWordsSet(result);
        api
          .getAggregatedWordsAll(group, _page, 20, '"userWord.optional.isDeleted":true')
          .then((userWords) => {
            setIsLoaded(true);
            setWordsSet(filterWords(result, userWords[0].paginatedResults));
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));
    return () => {
      setError(null);
      setIsLoaded(false);
      setWordsSet([]);
    };
  }, [api, group, page]);

  const filterWords = (result, userWords) => {
    console.log('userWords', userWords);
    return result.filter((word) => userWords.filter((userWord) => userWord._id == word.id).length === 0)
  };

  const handlePageChange = (pageNum) => {
    localStorage.setItem('textbookPage', pageNum);
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
