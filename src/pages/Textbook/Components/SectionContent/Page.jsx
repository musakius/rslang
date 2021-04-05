import React, { useEffect, useState } from 'react';
import WordCard from './WordCard';
import PaginationComponent from '../Pagination/';
import { Carousel } from 'react-responsive-carousel';
import Error from '../../../../components/Error/Error';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from '../Modal';

const Page = ({ wordsSet, setWordsSet, handlePageChange, page }) => {
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
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className=" container carousel-wrapper ">
          <Carousel showThumbs={false} useKeyboardArrows infiniteLoop>
            {wordsSet.map((word) => (
              <WordCard
                key={word.id}
                wordObj={word}
                setIsDeleted={setIsDeleted}
                setMessage={setMessage}
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
