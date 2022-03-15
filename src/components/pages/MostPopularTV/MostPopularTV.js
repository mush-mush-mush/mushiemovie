import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPopularTV } from '../../../actions';
import { List, ListHeader } from '../../List/Lists';
import MovieListItem from '../../List/MovieListItem';
import Loading from '../../Loading/Loading';

class MostPopularTV extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchPopularTV();
  }

  renderContent() {
    return this.props.popularTV.map((movie, index) => <MovieListItem movie={movie} index={index} key={index}></MovieListItem>);
  }

  render() {
    return (
      <section className="section popular-list">
        <List>
          <ListHeader>Most Popular TVs</ListHeader>
          {this.props.popularTV ? this.renderContent() : <Loading />}
        </List>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popularTV: state.tv.popularTV,
  };
};

export default connect(mapStateToProps, { fetchPopularTV })(MostPopularTV);
