import React, { useState } from "react";
import WordCard from "./WordCard";
import PaginationComponent from "../Pagination/";
import { Carousel } from "react-responsive-carousel";
import Error from "../../Error/Error";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Page = ({ wordsSet, handlePageChange, page }) => {
  if(!wordsSet) {
    return <Error error="Данные не были получены" />
  }

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      <div className=' container carousel-wrapper '>
        <Carousel showThumbs={false} useKeyboardArrows infiniteLoop>
          {wordsSet.map((word) => (
            <WordCard key={word.id} wordObj={word} />
          ))}
        </Carousel>
      </div>
        <PaginationComponent page={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Page;
