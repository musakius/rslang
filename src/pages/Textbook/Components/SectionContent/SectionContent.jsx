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
} from './utils/filters';

const SectionContent = ({
  setCurrentPage = () => {},
  dictionarySection = '',
  mode,
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

  // 0 - studied words, 1 - difficult words, 2 - deleted words
  const queryFilters = {
    0: '"$and":[{"userWord.difficulty":"high", "userWord.optional.isStudied":true}]',
    1: '"$and":[{"userWord.difficulty":"high"}]',
    2: '"$and":[{"userWord.optional.isDeleted":true}]',
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
      setIsLoaded(true);
    })
    .catch((error) => setError(error.message));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, mode, dictionarySection]);

  console.log('userDifficultWords', userDifficultWords);

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
console.log("dictionary wordsSet", wordsSet)
  return (
    <div>
      {wordsSet ? (
        <Page
          wordsSet={wordsSet}
          setWordsSet={setWordsSet}
          handlePageChange={handlePageChange}
          page={page}
          userDifficultWords={userDifficultWords}
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
