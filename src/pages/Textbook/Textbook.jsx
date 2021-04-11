import React, { useEffect, useState } from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import Button from './Components/Button/Button';
import Description from '../Dictionary/Components/Description';
import Links from './Components/Links/Links';
import SectionContent from './Components/SectionContent';
import Sections from './Components/Sections/Sections';
import { connect } from 'react-redux';
import { setGameInfo } from '../../redux/actions';
import { isAuth } from './utils/functions';
import classes from './Textbook.module.scss';

const Textbook = ({ setGameInfo }) => {
  const { url } = useRouteMatch();
  const savedGroup = localStorage.getItem('textbookGroup') || 0;
  const savedPage = localStorage.getItem('textbookPage') || 0;
  const [group, setGroup] = useState(savedGroup);
  const [page, setPage] = useState(savedPage);
  const dictionaryGroup = localStorage.getItem('dictionaryGroup') || 0;

  useEffect(() => {
    localStorage.setItem('userPage', 'textbook');
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);

  const setInfo = (event) => {
    const tag = event.target.tagName.toUpperCase();
    if (tag !== 'A' && tag !== 'I') {
      return;
    }
    setGameInfo(page, group, 'textbook');
  };

  return (
    <div className={`${classes.wrapper} container mt-5`}>
      <div className="jumborton">
        <div className="nav nav-tabs d-flex justify-content-center mb-5">
          <Description group={group} />
        </div>
        <div className="row">
          <div className="col-md-3">
            <Sections mode="textbook" setGroup={setGroup} />
          </div>
          <div className="col-md-6">
            <Switch>
              <Route path={`${url}/group/:group`}>
                <SectionContent setCurrentPage={setPage} mode='textbook' />
              </Route>
              <Redirect to={`/textbook/group/${savedGroup}`} />
            </Switch>
          </div>
          <div className="col-md-3">
            <div className="container">
              <div className="card-body pt-0">
                <Button
                  path={isAuth() ? `/dictionary/group/${dictionaryGroup}` : '/login'}
                  text="Словарь"
                  style="fas fa-book"
                />
              </div>
              <div className="card-body">
                <Links setInfo={setInfo} />
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

export default connect(null, mapDispatchToProps)(Textbook);
