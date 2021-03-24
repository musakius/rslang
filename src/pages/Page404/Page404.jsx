import React from 'react';
import classes from './Page404.module.scss';

const Page404 = () => {
  return (
    <main className={`${classes['container-page-404']} main`}>
      <h1 className={classes.title}>WTF are you doing man (not user friendly message) :)</h1>
      <span className={classes.errorNumber}>404</span>
      <span className={classes.errorText}>Page not found</span>
    </main>
  );
};

export default Page404;
