import React from "react";
import WordCard from "./WordCard";
import Pagination from "../Pagination/";

const Page = ({wordsSet}) => {
  return (
  <div className='container'>
      {
          wordsSet.map((word) => <WordCard key={word.id} wordObj={word} />)
      }
          <Pagination />
  </div>);
};

export default Page;
