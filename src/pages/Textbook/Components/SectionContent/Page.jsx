import React, { useEffect, useState } from 'react';
import WordCard from './WordCard';
import PaginationComponent from '../Pagination/';
import { Carousel } from 'react-responsive-carousel';
import Error from '../../../../components/Error/Error';
import Modal from '../Modal';
import { show } from '../../utils/functions';
import classes from './SectionContent.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Page = ({
  wordsSet,
  setWordsSet,
  handlePageChange,
  page,
  userDifficultWords,
  totalPages,
  mode,
  dictionarySection,
}) => {
  const [isDeleted, setIsDeleted] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setWordsSet(wordsSet.filter((word) => word.id !== isDeleted));
  }, [isDeleted]);

  useEffect(() => {
    if (message) {
      show();
    }
  }, [message]);

  const checkDifficulty = (difficultyArr, wordId) => {
    return difficultyArr.includes(wordId) ? true : false;
  };

  return (
    <>
      <Modal message={message} setMessage={setMessage} />
      <div className={`${classes.page}`}>
        <div className={`${classes.carousel} container carousel-wrapper`}>
            <Carousel
              showThumbs={false}
              useKeyboardArrows
              infiniteLoop
              width="100%"
            >
              {wordsSet.map((word) => (
                <WordCard
                  key={word.word}
                  wordObj={word}
                  setIsDeleted={setIsDeleted}
                  setMessage={setMessage}
                  dictionarySection={dictionarySection}
                  difficultyDisable={
                    mode === 'textbook'
                      ? checkDifficulty(userDifficultWords, word.id)
                      : word.userWord.difficulty === 'high'
                      ? true
                      : false
                  }
                />
              ))}
            </Carousel>
        </div>
        <PaginationComponent
          page={page}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};

export default Page;
