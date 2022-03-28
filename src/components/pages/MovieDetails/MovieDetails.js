import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { fetchMovie, removeMovie } from '../../../actions';

import Loading from '../../Loading/Loading';
import { Card, CardImage, CardBody, CardTitle, CardText, Cards, CardFooter, MovieRating, MovieDate } from '../../Card/Cards';
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

class Details extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.removeMovie();
      window.scrollTo(0, 0);
      this.props.fetchMovie(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.removeMovie();
  }

  renderListItem = ([key, value]) => {
    if (!value || value.length === 0) return '';

    const label = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ');
    const newValue = Array.isArray(value) ? value.join(', ') : value;

    return <SectionListItem label={label} value={newValue} key={label} />;
  };

  renderTopCasts = (person) => (
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
      <CardImage src={movie.poster_path} alt={movie.title} />
      <CardBody>
        <CardTitle>{movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title}</CardTitle>
      </CardBody>
      <CardFooter>
        <MovieRating rating={movie.vote_average.toFixed(1)} />
        <MovieDate date={movie.release_date} />
      </CardFooter>
    </Card>
  );

  renderContent = () => {
    if (this.props.movie) {
      return (
        <>
          <Helmet>
            <title>{this.props.movie.title}</title>
            <meta name="description" content={this.props.movie.overview} />
          </Helmet>
          <Header title={this.props.movie.title} backdrop={this.props.movie.backdrop} poster={this.props.movie.poster}>
            <HeaderSubTitle>
              <span>
                <i className="far fa-calendar"></i>
                {this.props.movie.releaseDate}
              </span>
              <span>
                <i className="far fa-clock"></i>
                {this.props.movie.runtime}m
              </span>
              <span>
                <i className="fas fa-layer-group"></i>
                {this.props.movie.genres.join(', ')}
              </span>
            </HeaderSubTitle>
            <HeaderActions>
              <div className="rating">
                <i className="fas fa-star"></i>
                <div className="rating-details">
                  <strong className="rating-details__average">{this.props.movie.voteAverage}</strong>
                  <small className="rating-details__count">{this.props.movie.voteCount}</small>
                </div>
              </div>
              {this.props.movie.trailer ? (
                <a
                  className="button button-trailer"
                  href={`https://www.youtube.com/watch?v=${this.props.movie.trailer}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-play"></i>
                  Play Trailer
                </a>
              ) : (
                <p>Trailer is not available.</p>
              )}
            </HeaderActions>
          </Header>
          <DetailMain>
            <DetailSection>
              <SectionTitle>Overview</SectionTitle>
              <SectionParagraph>{this.props.movie.overview}</SectionParagraph>
              <SectionList>{Object.entries(this.props.movie.overviewData).map(this.renderListItem)}</SectionList>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Top Casts</SectionTitle>
              <Cards>{this.props.movie.casts.slice(0, 10).map(this.renderTopCasts)}</Cards>
              <Link className="button button-more" to={`/movies/credits/${this.props.movie.id}`}>
                See All Cast & Crew <i className="fas fa-arrow-right"></i>
              </Link>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Details</SectionTitle>
              <SectionList>{Object.entries(this.props.movie.metadata).map(this.renderListItem)}</SectionList>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Similar Movies</SectionTitle>
              <Cards>{this.props.movie.similar.slice(0, 10).map(this.renderSimilar)}</Cards>
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
  return { movie: state.movies.movie };
};

export default connect(mapStateToProps, { fetchMovie, removeMovie })(Details);
