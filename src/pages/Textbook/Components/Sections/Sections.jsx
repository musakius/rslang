import React from "react";
import { useRouteMatch } from "react-router-dom";
import Settings from "../Settings/Settings";
import { items } from "../../config";
import List from "./List";
import Dictionary from "../Dictionary/Dictionary";
import Links from "../Links/Links";

const Sections = () => {
  const { url } = useRouteMatch();
  console.log("url", url);

  return (
    <div className='container-fluid'>
      <Settings />
      <div className='card border-info mb-3'>
        <div className='card-header'>
          <i class='fas fa-bars'></i>
          &nbsp;Меню
        </div>
        <div className='card-body'>
          <ul className='list-group'>
            {items.map((item) => (
              <List
                item={`Группа ${item.item}`}
                style={
                  "list-group-item d-flex justify-content-between align-items-center"
                }
                path={`${url}/group/${item.group}`}
                key={item.group}
              />
            ))}
          </ul>
        </div>
      </div>
      <Dictionary />
      <Links />
    </div>
  );
};

export default Sections;
