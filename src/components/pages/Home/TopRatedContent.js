import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import MovieListItem from '../../List/MovieListItem';
import { List } from '../../List/Lists';
import { fetchTopRatedMovies } from '../../../actions/movieActions';
import { fetchTopRatedTV } from '../../../actions/tvActions';

class TopRatedContent extends Component {
  state = {
    topRated: 'movie',
  };

  togglePopularContent = (content) => {
    this.setState({
      topRated: content,
    });
  };

  renderLists(movies) {
    return (
      <List>
        {movies.map((movie, index) => (
          <MovieListItem movie={movie} index={index} key={index}></MovieListItem>
        ))}
      </List>
    );
  }

  renderContent() {
    if (this.props.topRatedTV && this.props.topRatedMovies) {
      return (
        <>
          <div className={`${this.state.topRated === 'tv' && 'hidden'}`}>{this.renderLists(this.props.topRatedMovies.slice(0, 5))}</div>
          <div className={`${this.state.topRated === 'movie' && 'hidden'}`}>{this.renderLists(this.props.topRatedTV.slice(0, 5))}</div>
        </>
      );
    } else {
      return <Loading></Loading>;
    }
  }

  componentDidMount() {
    this.props.fetchTopRatedMovies();
    this.props.fetchTopRatedTV();
  }

  render() {
    return (
      <section className="home-section section">
        <aside className="side-content">
          <h2 className="home-section--title">Top Rated</h2>
          <nav className="content-nav">
            <button className={`nav-item ${this.state.topRated === 'movie' && 'active'}`} onClick={() => this.togglePopularContent('movie')}>
              Movies
            </button>
            <button className={`nav-item ${this.state.topRated === 'tv' && 'active'}`} onClick={() => this.togglePopularContent('tv')}>
              TV Shows
            </button>
          </nav>
        </aside>
        <div className="main-content">
          {this.renderContent()}
          <Link className="button-more" to={`/${this.state.topRated}/top`}>
            See More <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topRatedMovies: state.movies.topRatedMovies,
    topRatedTV: state.tv.topRatedTV,
  };
};

export default connect(mapStateToProps, { fetchTopRatedMovies, fetchTopRatedTV })(TopRatedContent);
