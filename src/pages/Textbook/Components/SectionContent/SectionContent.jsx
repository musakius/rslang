import React from "react";
import { useParams } from "react-router-dom";

const SectionContent = () => {
  const { section } = useParams();
  return <div>SectionContent {section}</div>;
};

export default SectionContent;
