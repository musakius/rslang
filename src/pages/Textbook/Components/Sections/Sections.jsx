import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import Settings from "../Settings/Settings";
import { items } from "../../config";
import List from "./List";
import { changeTheme, setTextbookGroup } from "../../../../redux/actions";
import { isAuth } from "../../utils/functions";

const Sections = ({
  mode,
  changeTheme,
  group,
  setTextbookGroup,
  setGroup,
}) => {
  const { url } = useRouteMatch();
  const savedGroup =
    mode === "textbook"
      ? group || 0
      : localStorage.getItem("dictionaryGroup") || 0;
  const [active, setActive] = useState(+savedGroup);

  const handleChange = (e) => {
    let target = "";
    if (e.target.tagName.toUpperCase() !== "A") {
      return;
    } else {
      target = e.target;
    }
    const id = target.id;
    const theme = items.filter((item) => item.group === +id)[0].style;
    changeTheme(theme);
    setGroup(+id);
    setActive(+id);
    if (mode === "textbook") setTextbookGroup(+id);
  };

  useEffect(() => {
    //if (mode !== "textbook") return;
    setActive(+group);
    changeTheme(items.filter((item) => item.group === +group)[0].style)
  }, [group]);

  return (
    <div className='container-fluid'>
      {mode === "textbook" ? isAuth() ? <Settings /> : null : null}
      <div className='card border-info mb-3'>
        <div className='card-header'>
          <i className='fas fa-folder-open mr-2'></i>
          {"Раздел"}
        </div>
        <div className='card-body'>
          <ul className='list-group' onClick={(e) => handleChange(e)}>
            {items.map((item) => (
              <List
                item={item.item}
                value={item.group}
                style={{
                  li: `list-group-item list-group-item-action d-flex justify-content-start align-items-baseline ${
                    item.group === active ? "active" : ""
                  }`,
                  i: `text-${item.style}`,
                }}
                path={`${url}/group/${item.group}`}
                key={item.group}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  changeTheme,
  setTextbookGroup,
};

export default connect(null, mapDispatchToProps)(Sections);
