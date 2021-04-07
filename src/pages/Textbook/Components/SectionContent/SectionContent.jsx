import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../../../services';
import Error from '../../../../components/Error';
import Spinner from '../../../../components/Spinner';
import Page from './Page';

const SectionContent = ({ setCurrentPage = () => { } }) => {
  const { group } = useParams();
  let token = null;
  if (group) {
    localStorage.setItem('textbookGroup', group);
  }
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user.token) {
      token = user.token;
    }
  }
  const [wordsSet, setWordsSet] = useState([]);
  const [userDeletedWords, setUserDeletedWords] = useState([]);
  const [userDifficultWords, setUserDifficultWords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let currentPage = localStorage.getItem('textbookPage') || 1;
  const [page, setPage] = useState(+currentPage);

  const api = useMemo(() => new Service(), []);

  useEffect(() => {
    if(!token) {
      setUserDeletedWords([]);
      setUserDifficultWords([])
      return;
    }
    api.getUserWordsAll()
      .then((result) => {
        setUserDeletedWords(filterUserDeletedWords(result));
        setUserDifficultWords(filterUserDifficultyWords(result));
      })
      .catch((error) => setError(error.message));
  }, [api])

  useEffect(() => {
    const _page = +page - 1;
    api
      .getWordsAll(group, _page)
      .then((wordsResult) => {
        setWordsSet(filterWords(wordsResult, userDeletedWords))
        setIsLoaded(true);
      })
      .catch((error) => setError(error.message));
    return () => {
      setIsLoaded(false);
      setError(null);
      setWordsSet([]);
    };
  }, [api, group, page, userDeletedWords]);

  const filterWords = (result, userWordsResult) => {
    if (userWordsResult.length === 0) return result;
    return result.filter((word) => userWordsResult.filter((userWord) => userWord.wordId === word.id).length === 0)
  };

  const filterUserDeletedWords = (result) => {
    if (result.length === 0) return result;
    return result.filter((word) => word.optional.isDeleted === true)
  }
  const filterUserDifficultyWords = (result) => {
    if (result.length === 0) return result;
    return result.map((word) => {
      if(word.difficulty === 'high') {
        return word.wordId;
      }
      return null;
    }).filter((id) => id !== null);
  }
console.log('userDifficultWords', userDifficultWords)
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
          userDifficultWords={userDifficultWords}
        />
      ) : null}
    </div>
  );
};

export default SectionContent;
