import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import { dictionaryItems } from '../../config';
import Error from '../../Error';
import Spinner from '../Spinner';
import Page from '../SectionContent/Page';
import Service from '../../../../services';
import Tabs from './Components/Tabs';
import Sections from '../Sections/Sections';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import SectionContent from '../SectionContent';
import TabContent from './Components/TabContent';

const Dictionary = ({ userId, token }) => {
  const { url } = useRouteMatch();
  const currentGroup = localStorage.getItem('textbookGroup') || 0;
  useEffect(() => {
    localStorage.setItem('userPage', "dictionary");
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);
  // console.log('userId', userId);
  // console.log('token', token);

  // const [userWords, setUserWords] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);

  // let partUrl = `users/${userId}/aggregatedWords`;

  // const api = useMemo(() => new Service(), [token]);

  // useEffect(() => {
  //   if (!token) {
  //     setError('Необходима авторизация');
  //   }
  //   return () => {
  //     setError(null);
  //   };
  // }, [token])

  // useEffect(() => {
  //   api
  //     ._getAuthResource(partUrl, token)
  //     .then((result) => {
  //       setUserWords(result);
  //       setIsLoaded(true);
  //     })
  //     .catch((error) => setError(error.message));
  //   return () => {
  //     setError(null);
  //     setIsLoaded(false);
  //     setUserWords([]);
  //   };
  // }, [api]);

  // if (error) {
  //   return <Error error={error} />;
  // }
  // if (!isLoaded) {
  //   return <Spinner />;
  // }

  // console.log('userWords', userWords);
  // console.log('userId', userId);

  return (
    // <div>
    //   {userWords ? (
    //     <Page
    //       wordsSet={userWords}
    //       handlePageChange={() => { }}
    //       page={0}
    //     />
    //   ) : null}
    // </div>
    <div className="container mt-5">
      <div className="jumborton">
        <div className="row">
          <Tabs />
          <div className="col-md-3">
            <Sections mode="dictionary" />
          </div>
          <div className="col-md-7">
            <TabContent/>
          </div>
          <div className="col-md-2">
            <Button
              path={`/textbook/group/${currentGroup}`}
              text="Учебник"
              style={'fab fa-leanpub'}
            />
          </div>
        </div>
      </div>
    </div>
    // <div className='container mt-5'>
    //   <Tabs/>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.user[0].userId,
    token: state.user.user[0].token,
  };
};

export default connect(mapStateToProps, null)(Dictionary);
