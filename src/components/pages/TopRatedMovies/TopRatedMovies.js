import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTopRatedMovies } from '../../../actions';
import { List, ListHeader } from '../../List/Lists';
import MovieListItem from '../../List/MovieListItem';
import Loading from '../../Loading/Loading';

class TopRatedMovies extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchTopRatedMovies();
  }

  renderContent() {
    return this.props.topRatedMovies.map((movie, index) => <MovieListItem movie={movie} index={index} key={index}></MovieListItem>);
  }

  render() {
    return (
      <section className="section">
        <List>
          <ListHeader>Top Rated Movies</ListHeader>
          {this.props.topRatedMovies ? this.renderContent() : <Loading />}
        </List>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topRatedMovies: state.movies.topRatedMovies,
  };
};

export default connect(mapStateToProps, { fetchTopRatedMovies })(TopRatedMovies);
