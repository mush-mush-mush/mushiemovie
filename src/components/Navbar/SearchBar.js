import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchQuery, removeSearchQuery } from '../../actions';
import ModalSearch from '../ModalSearch/ModalSearch';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  searchContent = (e) => {
    e.preventDefault();
    if (this.state.searchQuery) {
      this.props.searchQuery(this.state.searchQuery);
    }
    document.querySelector('body').style.overflow = 'hidden';
  };

  componentWillUnmount() {
    this.props.removeSearchQuery();
    document.querySelector('body').style.overflow = 'scroll';
  }

  render() {
    return (
      <form className={`search-form ${this.props.show && 'active'}`} onSubmit={(e) => this.searchContent(e)}>
        <input
          className="search-bar"
          placeholder="Search for a movie title or person"
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
          value={this.state.searchQuery}
          autoFocus
        />
        <button type="submit" className="search-submit">
          Search
        </button>
        <button type="button" className="search-close" onClick={this.props.toggleSearchBar}>
          <i className="fas fa-times"></i>
        </button>
        {this.props.searchResults && this.props.show && <ModalSearch content={this.props.searchResults} />}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.results,
  };
};

export default connect(mapStateToProps, { searchQuery, removeSearchQuery })(SearchBar);
