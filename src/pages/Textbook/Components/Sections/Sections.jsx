import React from "react";
import { useRouteMatch } from "react-router-dom";
import Settings from "../Settings/Settings";
import { items } from "../../config";
import List from "./List";

const Sections = () => {
  const { url } = useRouteMatch();

  return (
    <div>
      <Settings />
      <ul className='list-group'>
        {items.map((item) => (
          <List
            item={`Раздел ${item.page}`}
            style={
              "list-group-item d-flex justify-content-between align-items-center"
            }
            path={`${url}/${item.page}`}
            key={item.page}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sections;
