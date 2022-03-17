import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { fetchPerson, removePerson } from '../../../actions';

import { Card, CardImage, CardBody, CardTitle, CardText, Cards } from '../../Card/Cards';
import { Detail, DetailMain, DetailSection, Header, SectionList, SectionListItem, SectionParagraph, SectionTitle } from '../../Detail/Detail';
import Loading from '../../Loading/Loading';

class PersonDetails extends Component {
  componentDidMount() {
    this.props.fetchPerson(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.removePerson();
      window.scrollTo(0, 0);
      this.props.fetchPerson(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.removePerson();
  }

  renderListItem = ([key, value]) => {
    if (!value || value.length === 0) return '';

    const label = (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ');
    const newValue = Array.isArray(value) ? value.join(', ') : value;

    return <SectionListItem label={label} value={newValue} />;
  };

  renderCredits = (movie) => (
    <Card link={`/movie/detail/${movie.id}`} key={movie.id}>
      <CardImage src={movie.poster_path} alt={movie.title} />
      <CardBody>
        <CardTitle>{movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title}</CardTitle>
        <CardText>{movie.character}</CardText>
      </CardBody>
    </Card>
  );

  renderContent = () => {
    if (this.props.person) {
      return (
        <>
          <Helmet>
            <title>{this.props.person.name}</title>
            <meta name="description" content={this.props.person.biography} />
          </Helmet>
          <Header title={this.props.person.name} backdrop={this.props.person.backdrop} poster={this.props.person.poster}>
            <SectionList>{Object.entries(this.props.person.overviewData).map(this.renderListItem)}</SectionList>
          </Header>
          <DetailMain>
            <DetailSection>
              <SectionTitle>Biography</SectionTitle>
              <SectionParagraph>{this.props.person.biography}</SectionParagraph>
            </DetailSection>
            <DetailSection>
              <SectionTitle>Known For</SectionTitle>
              <Cards>{this.props.person.credits.slice(0, 10).map(this.renderCredits)}</Cards>
              <Link className="button button-more" to={`/persons/credits/${this.props.person.id}`}>
                See All Cast & Crew <i className="fas fa-arrow-right"></i>
              </Link>
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
  return {
    person: state.persons.person,
  };
};

export default connect(mapStateToProps, { fetchPerson, removePerson })(PersonDetails);
