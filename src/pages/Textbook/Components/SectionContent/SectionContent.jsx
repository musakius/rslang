import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import Spinner from '../../../../components/Spinner';
import Page from './Page';
import {
  filterWords,
  filterUserDeletedWords,
  filterUserDifficultyWords,
  countPages,
} from './utils/filters';

const SectionContent = ({
  setCurrentPage = () => { },
  dictionarySection = '',
  mode,
  setQueryFilter = () => { },
}) => {
  const { group } = useParams();
  let token = null;
  if (group) {
    if (mode === 'textbook') {
      localStorage.setItem('textbookGroup', group);
    } else {
      localStorage.setItem('dictionaryGroup', group);
    }
  }
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      token = user.token;
    }
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [userDeletedWords, setUserDeletedWords] = useState([]);
  const [userDifficultWords, setUserDifficultWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(30);

  // 0 - studied words, 1 - difficult words, 2 - deleted words
  const queryFilters = {
    0: '"userWord.optional.isStudied":true',
    1: '"userWord.difficulty":"high"',
    2: '"userWord.optional.isDeleted":true',
  };

  let currentPage =
    mode === 'textbook'
      ? localStorage.getItem('textbookPage') || 1
      : localStorage.getItem('dictionaryPage') || 1;
  const [page, setPage] = useState(+currentPage);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    if (!token || mode === 'dictionary') {
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
    if (!token || mode !== 'textbook') return;
    const _page = +page - 1;
    api
      .getWordsAll(group, _page)
      .then((wordsResult) => {
        setWordsSet(filterWords(wordsResult, userDeletedWords));
        setIsLoaded(true);
      })
      .catch((error) => setError(error.message));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, userDeletedWords, mode]);

  useEffect(() => {
    if (mode !== 'dictionary') return;
    const _page = +page - 1;
    api.getAggregatedWordsAll(group, _page, queryFilters[dictionarySection])
      .then((result) => {
        setWordsSet(result[0].paginatedResults);
        localStorage.setItem('queryFilter', queryFilters[dictionarySection]);
        setQueryFilter(queryFilters[dictionarySection]);
        setIsLoaded(true);
      })
      .catch((error) => setError(error.message));
    //dictionarySection === 1 ? setTotalPages(countPages(userDifficultWords.length)) : setTotalPages(countPages(userDeletedWords.length));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, mode, dictionarySection]);

  console.log('userDifficultWords', userDifficultWords);
  console.log('userDeletedWords', userDeletedWords);

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

  console.log("dictionary wordsSet", wordsSet);
  console.log('totalPages', totalPages);
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
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
