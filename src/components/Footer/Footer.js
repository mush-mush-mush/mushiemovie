import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className="container footer">
        <div className="footer-left">
          <Link className="footer-brand" to="/">
            mushie<span>movie</span>
          </Link>
          Powered by <a href="https://www.themoviedb.org/">TMDB</a>
        </div>
        <div className="footer-nav"></div>
        <div className="footer-social">
          <a className="social-link" href="https://www.linkedin.com/in/marcello-sebastian-542b2b1b0/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a className="social-link" href="https://github.com/mush-mush-mush">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
        </div>
      </footer>
    );
  }
}
