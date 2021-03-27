import React from "react";
import WordCard from "./WordCard";
import Pagination from "../Pagination/";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Page = ({wordsSet}) => {
  return (
  <div className=' container carousel-wrapper'>
    <Carousel>
      {
          wordsSet.map((word) => <WordCard key={word.id} wordObj={word} />)
      }
      </Carousel>
  </div>);
};

export default Page;
