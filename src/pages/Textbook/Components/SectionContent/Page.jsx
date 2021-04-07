import React, { useEffect, useState } from 'react';
import WordCard from './WordCard';
import PaginationComponent from '../Pagination/';
import { Carousel } from 'react-responsive-carousel';
import Error from '../../../../components/Error/Error';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from '../Modal';

const Page = ({ wordsSet, setWordsSet, handlePageChange, page, userDifficultWords }) => {
  const [isDeleted, setIsDeleted] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setWordsSet(wordsSet.filter((word) => word.id !== isDeleted));
  }, [isDeleted]);

  useEffect(() => {
    if (message) {
      setShowModal(true);
    }
  }, [message])

  console.log("showModal", showModal);

  return (
    <>
      {
        showModal
          ? <Modal message={message} setShowModal={setShowModal} />
          : null
      }
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className=" container carousel-wrapper ">
          <Carousel showThumbs={false} useKeyboardArrows infiniteLoop width='100%'>
            {wordsSet.map((word) => (
              <WordCard
                key={word.id}
                wordObj={word}
                setIsDeleted={setIsDeleted}
                setMessage={setMessage}
                difficultyDisable={userDifficultWords.includes(word.id) ? true : false}
              />
            ))}
          </Carousel>
        </div>
        <PaginationComponent page={page} handlePageChange={handlePageChange} />
      </div>
    </>
  );
};

export default Page;
