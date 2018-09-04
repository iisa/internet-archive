import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { dateParser } from '../utils';

export const MetaDataDetails = (metadata) => {
  const fields = Object.keys(metadata);
  return (
    <section id="metadata-details" className="metadata-details">
      <h3>Details</h3>
      {
        _.map(fields, (f, i) => {
          const val = metadata[f];
          return <p key={`metadata-${i}`}><strong>{f}</strong> <span>{val}</span></p>;
        })
      }
    </section>
  )
};

export const MediaViewer = ({ identifier }) => {
    return (
      <section id="media-viewer">
        { identifier &&
          <iframe
            allowFullScreen
            width="640"
            height="480"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            autoPlay
            controls
            src={`https://archive.org/embed/${identifier}`}
          />
        }
      </section>
    )
};

const StarRating = (props) => {
  const { starCount } = props;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push(
      <i className="fa fas fa-star" title="starRating" aria-hidden="true" key={`star-${i}`} />
    )
  }

  return (
    <div className="star-rating">
      { stars.map((st) => st) }
    </div>
  )

};

export const Reviews = ({ reviews = [] }) => {
  // todo: add structured data
  // todo: do star average
  return (
    <section id="reviews" className="row">
      <h3>Reviews {!!reviews.length && `- ${reviews.length}`}</h3>
      {!!reviews.length ? reviews.map((rev, i) => {
        const { reviewbody, reviewtitle, reviewdate, reviewer, stars} = rev;
        const date = dateParser(reviewdate);
        return (
        <div key={`reviews-${i}`} className="review col-12">
          <h5>
            {reviewtitle}
            <StarRating starCount={parseInt(stars, 10)} />
          </h5>
          <p>
            {reviewbody}
          </p>
          <span> - <a href={`https://archive.org/details/%40${reviewer}`} target="_blank">{reviewer}</a>, {date}</span>

        </div>
      )
      }) : <p>No reviews yet</p>}
    </section>
  );
};

export const RelatedItems = ({ related, info }) => {
  const mainPageTitle = _.get(info, 'metadata.title', '');
  return (
    <section id="related-items" className="row">
      <h3>Related Media</h3>
      <div className="card-columns">
      {!!related.length && related.map((rel, i) => {
        const { _source, _id } = rel;
        const {
          title,
          description = [],
          mediatype,
          collection
        } = _source;
        const relatedImage = `https://archive.org/services/img/${_id}`;
        const collectionLinks = collection.map((c, i) => <Link key={`related-col-${i}`} to={`/collections/${_id}`}>{c}</Link>);

        return (
          <div key={`related-${i}`} className="related">
            <div className="card">
              <h5 className="card-header">
                <Link to={`/${_id}`}>{ title[0] || 'Untitled' }</Link>
              </h5>
              <div className="card-body">
                <img className="img-thumbnail" src={relatedImage} alt={`Related media for ${mainPageTitle}`} />
              </div>
              <ul className="list-group list-group-flush">
                <li key="item-detail-1" className="list-group-item">
                  {_.truncate(description[0], { length: 130 }) || 'No description. :('}
                </li>
                <li key="item-detail-2" className="list-group-item">
                  <p>Collections:</p>
                  { collectionLinks.reduce((prev, curr) => [[prev, <span> , </span>, curr]]) }
                </li>
              </ul>
              <div className="card-footer">
                <small className="text-muted">Media Type: { mediatype[0] || '' }</small>
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  )
};

export const Breadcrumbs = ({ info = {} }) => {
  const { metadata = {} } = info;
  let collectionLinks = [];
  if (_.isString(metadata.collection)) {
    collectionLinks.push(<a href={`/collections/${metadata.collection}`} itemProp="url"><span itemProp="title">{metadata.collection}</span></a>);
  }

  if (_.isArray(metadata.collection)) {
    collectionLinks = metadata.collection.map((c, i) => {
      const cLink = `/collections/${c}`;
      return <a href={cLink} itemProp="url"><span itemProp="title">{c}</span></a>
    });
  }

  let breadcrumbs = info.metadata ? (
    <div itemScope itemType="http://data-vocabulary.org/Breadcrumb">
      <a href="/" itemProp="url"><span itemProp="title">Curious Archive Plucker</span></a>
      <span> / </span>
      <span itemScope itemType="http://data-vocabulary.org/Breadcrumb" itemProp="child">
            { collectionLinks.reduce((prev, curr) => [[prev, <span> & </span>, curr]]) }
        <span> / </span>
            <span itemScope itemScope itemType="http://data-vocabulary.org/Breadcrumb" itemProp="child">
              <a href={`/${metadata.identifier}`} itemProp="url">
                <span itemProp="title">{ metadata.title }</span>
              </a>
            </span>
          </span>
    </div>
  ) : null;

  return (
    <div id="breadcrumbs">
      { breadcrumbs }
    </div>
  )

};