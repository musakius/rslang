import React from "react";
import { useRouteMatch } from "react-router-dom";
import Settings from "../Settings/Settings";
import { items } from "../../config";
import List from "./List";

const Sections = () => {
  const { url } = useRouteMatch();
  console.log("url", url);

  return (
    <div>
      <Settings />
      <ul className='list-group'>
        {items.map((item) => (
          <List
            item={`Раздел ${item.item}`}
            style={
              "list-group-item d-flex justify-content-between align-items-center"
            }
            path={`${url}/group/${item.group}`}
            key={item.group}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sections;
