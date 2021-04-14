import React from 'react';
import classes from './Footer.module.scss';
import PropTypes from 'prop-types';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`${classes.content} container-center`}>
        <span className={classes.year}>&#169; 2021</span>
        <div className={classes['block-github']}>
          <Developer name="musakius" />
          <Developer name="Iragemini" />
          <Developer name="AleksandrZanko" />
          <Developer name="Danila-cmd" />
        </div>
        <a
          className={classes.link}
          href="https://rs.school/js/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={classes['logo-rss']} src="./img/logo-rss.png" alt="logo-rss" />
        </a>
      </div>
    </footer>
  );
};

const Developer = ({name}) => {
  const git = 'https://github.com/' + name;
  return (
    <div className="developer">
      <a className={classes.link} title={name} href={git} target="_blank" rel="noopener noreferrer">
        <img src="./svg/github.svg" alt="github" className={classes['logo-github']} />
        {name}
      </a>
    </div>
  );
};

Developer.propTypes = {
  name: PropTypes.string.isRequired
}

export default Footer;
