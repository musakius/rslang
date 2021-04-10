import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import Spinner from '../../../../components/Spinner';
import Page from './Page';
import { isAuth, setLS, getCurrentPage } from '../../utils/functions';
import { queryFilters, DICTIONARY_PAGES, TEXTBOOK_PAGES } from '../../config';
import {
  filterWords,
  filterUserDeletedWords,
  filterUserDifficultyWords,
  countPages,
} from './utils/filters';

const SectionContent = ({
  setCurrentPage = () => {},
  dictionarySection = '',
  mode,
  setQueryFilter = () => {},
}) => {
  const api = useMemo(() => new Service(), []);
  const { group } = useParams();
  const [wordsSet, setWordsSet] = useState([]);
  const [userDeletedWords, setUserDeletedWords] = useState([]);
  const [userDifficultWords, setUserDifficultWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(getCurrentPage(mode));

  if (group) {
    setLS(mode, group, '');
  }
  if (mode === 'dictionary') {
    setLS(mode, '', queryFilters[dictionarySection]);
    setQueryFilter(queryFilters[dictionarySection]);
  }

  useEffect(() => {
    if (!isAuth() || mode !== 'textbook') {
      setUserDeletedWords([]);
      setUserDifficultWords([]);
      return;
    }
    api
      .getUserWordsAll()
      .then((result) => {
        setUserDeletedWords(filterUserDeletedWords(result));
        setUserDifficultWords(filterUserDifficultyWords(result));
      })
      .catch((error) => setError(error.message));
  }, [api, mode]);

  useEffect(() => {
    if (mode !== 'textbook') return;
    const _page = +page - 1;
    api
      .getWordsAll(group, _page)
      .then((wordsResult) => {
        setWordsSet(filterWords(wordsResult, userDeletedWords));
      })
      .then(() => setTotalPages(TEXTBOOK_PAGES))
      .catch((error) => setError(error.message))
      .finally(setIsLoaded(true));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, userDeletedWords, mode]);

  useEffect(() => {
    if (mode !== 'dictionary') return;
    const _page = +page - 1;
    api
      .getAggregatedWordsByGroup(group, _page, queryFilters[dictionarySection])
      .then((result) => {
        setWordsSet(result[0].paginatedResults);
        setTotalPages(
          result[0].totalCount.length > 0
            ? countPages(Number.parseInt(result[0].totalCount[0].count))
            : 0
        );
      })
      .catch((error) => setError(error.message))
      .finally(setIsLoaded(true));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, mode, dictionarySection]);

  const handlePageChange = (pageNum) => {
    mode === 'textbook'
      ? localStorage.setItem('textbookPage', pageNum)
      : localStorage.setItem('dictionaryPage', pageNum);
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
          totalPages={totalPages}
          userDifficultWords={userDifficultWords}
          mode={mode}
          dictionarySection={dictionarySection}
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
