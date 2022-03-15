import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTV, removeTV } from '../../../actions';

import Loading from '../../Loading/Loading';
import { Cards, Card, CardImage, CardBody, CardTitle, CardText, CardFooter, MovieRating, MovieDate } from '../../Card/Cards';
import {
  Detail,
  DetailMain,
  DetailSection,
  Header,
  HeaderActions,
  HeaderSubTitle,
  SectionList,
  SectionListItem,
  SectionParagraph,
  SectionTitle,
} from '../../Detail/Detail';

class TVDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchTV(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchTV(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.removeTV();
  }

  renderListItem = ([key, value], index) => {
    if (!value || value.length === 0) return '';

    const label = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ');
    const newValue = Array.isArray(value) ? value.join(', ') : value;

    return <SectionListItem label={label} value={newValue} key={index} />;
  };

  renderTopCasts = (person, index) => (
    <Card link={`/person/detail/${person.id}`} key={person.id}>
      <CardImage src={person.profile_path} alt={person.title} />
      <CardBody>
        <CardTitle>{person.name.length > 25 ? person.name.slice(0, 25) + '...' : person.name}</CardTitle>
        <CardText>{person.character}</CardText>
      </CardBody>
    </Card>
  );

  renderSimilar = (movie) => (
    <Card link={`/movie/detail/${movie.id}`} key={movie.id}>
      <CardImage src={movie.poster_path} alt={movie.name} />
      <CardBody>
        <CardTitle>{movie.name.length > 25 ? movie.name.slice(0, 25) + '...' : movie.name}</CardTitle>
      </CardBody>
      <CardFooter>
        <MovieRating rating={movie.vote_average.toFixed(1)} />
        <MovieDate date={movie.first_air_date} />
      </CardFooter>
    </Card>
  );

  renderContent = () => {
    if (this.props.tv) {
      return (
        <>
          <Header title={this.props.tv.title} backdrop={this.props.tv.backdrop} poster={this.props.tv.poster}>
            <HeaderSubTitle>
              <span>
                <i className="far fa-calendar"></i>
                {this.props.tv.releaseDate}
              </span>
              <span>
                <i className="fas fa-film"></i>
                {this.props.tv.numberOfSeasons * this.props.tv.numberOfEpisodes} eps
              </span>
              <span>
                <i className="fas fa-layer-group"></i>
                {this.props.tv.genres.join(', ')}
              </span>
            </HeaderSubTitle>
            <HeaderActions>
              <div className="rating">
                <i className="fas fa-star"></i>
                <div className="rating-details">
                  <strong className="rating-details__average">{this.props.tv.voteAverage}</strong>
                  <small className="rating-details__count">{this.props.tv.voteCount}</small>
                </div>
              </div>
              <a className="button button-trailer" href={`https://www.youtube.com/watch?v=${this.props.tv.trailer}`}>
                <i className="fas fa-play"></i>
                Play Trailer
              </a>
            </HeaderActions>
          </Header>
          <DetailMain>
            <DetailSection>
              <SectionTitle>Overview</SectionTitle>
              <SectionParagraph>{this.props.tv.overview}</SectionParagraph>
              <SectionList>{Object.entries(this.props.tv.overviewData).map(this.renderListItem)}</SectionList>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Top Casts</SectionTitle>
              <Cards>{this.props.tv.casts.slice(0, 10).map(this.renderTopCasts)}</Cards>
              <Link className="button button-more" to={`/tv/credits/${this.props.tv.id}`}>
                See All Cast & Crew <i className="fas fa-arrow-right"></i>
              </Link>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Details</SectionTitle>
              <SectionList>{Object.entries(this.props.tv.metadata).map(this.renderListItem)}</SectionList>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Similar Shows</SectionTitle>
              <Cards>{this.props.tv.similar.slice(0, 10).map(this.renderSimilar)}</Cards>
            </DetailSection>
          </DetailMain>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  render() {
    return <Detail>{this.renderContent()}</Detail>;
  }
}

const mapStateToProps = (state) => {
  return { tv: state.tv.tv };
};

export default connect(mapStateToProps, { fetchTV, removeTV })(TVDetails);
