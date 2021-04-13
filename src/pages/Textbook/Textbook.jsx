import React, { useEffect, useState } from "react";
import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";
import Button from "./Components/Button/Button";
import Description from "../Dictionary/Components/Description";
import Links from "./Components/Links/Links";
import SectionContent from "./Components/SectionContent";
import Sections from "./Components/Sections/Sections";
import { connect } from "react-redux";
import { setGameInfo } from "../../redux/actions";
import { isAuth } from "./utils/functions";
import classes from "./Textbook.module.scss";

const Textbook = ({ setGameInfo, textbookGroup }) => {
  const { url } = useRouteMatch();
  const savedGroup = textbookGroup || 0;
  const savedPage = localStorage.getItem("textbookPage") || 0;
  const [group, setGroup] = useState(savedGroup);
  const [page, setPage] = useState(savedPage);
  const [countWords, setCountWords] = useState(0);
  const dictionaryGroup = localStorage.getItem("dictionaryGroup") || 0;

  useEffect(() => {
    localStorage.setItem("userPage", "textbook");
    return () => {
      localStorage.removeItem("userPage");
    };
  }, []);

  useEffect(() => {
    if (!textbookGroup || textbookGroup === "") return;
    setGroup(textbookGroup);
  }, [textbookGroup]);

  const setInfo = (event) => {
    const tag = event.target.tagName.toUpperCase();
    if (tag !== "A" && tag !== "I") {
      return;
    }
    setGameInfo(page, group, "textbook");
  };

  return (
    <div className={`${classes.wrapper} container mt-5`}>
      <div className='jumborton'>
        <div className='nav nav-tabs d-flex justify-content-center mb-5'>
          <Description group={group} />
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <Sections mode='textbook' group={group} setGroup={setGroup} />
          </div>
          <div className='col-md-6'>
            <Switch>
              <Route path={`${url}/group/:group`}>
                <SectionContent
                  setCurrentPage={setPage}
                  mode='textbook'
                  setCountWords={setCountWords}
                  textbookGroup={textbookGroup}
                />
              </Route>
              <Redirect to={`/textbook/group/${savedGroup}`} />
            </Switch>
          </div>
          <div className='col-md-3'>
            <div className='container'>
              <div className='card-body pt-0'>
                <Button
                  path={
                    isAuth() ? `/dictionary/group/${dictionaryGroup}` : "/login"
                  }
                  text='Словарь'
                  style='fas fa-book'
                />
              </div>
              <div className='card-body'>
                <Links setInfo={setInfo} countWords={countWords} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setGameInfo,
};

const mapStateToProps = (state) => {
  return {
    textbookGroup: state.textbookGroup.value,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Textbook);
