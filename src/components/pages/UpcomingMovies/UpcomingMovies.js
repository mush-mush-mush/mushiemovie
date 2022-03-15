import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchUpcomingMovies } from '../../../actions';
import { List, ListHeader } from '../../List/Lists';
import MovieListItem from '../../List/MovieListItem';
import Loading from '../../Loading/Loading';

class UpcomingMovies extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchUpcomingMovies();
  }

  renderContent() {
    return this.props.upcomingMovies.map((movie, index) => <MovieListItem movie={movie} index={index} key={index}></MovieListItem>);
  }

  render() {
    return (
      <section className="section upcoming-list">
        <Helmet>
          <title>Upcoming Movies</title>
        </Helmet>
        <List>
          <ListHeader>Upcoming Movies</ListHeader>
          {this.props.upcomingMovies ? this.renderContent() : <Loading />}
        </List>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.movies.upcomingMovies,
  };
};

export default connect(mapStateToProps, { fetchUpcomingMovies })(UpcomingMovies);
