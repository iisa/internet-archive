import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchIdentifierInfo, fetchRelated, resetStore } from '../redux/actions';
import {MediaViewer, Reviews, MetaDataDetails, RelatedItems, Breadcrumbs} from './components';

class PageContainer extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {};
  }

  static getDerivedStateFromProps (props) {
    if (window) {
      const { match: { params }, dispatch, info, isFetching, error } = props;
      if (params.identifier && !info && !isFetching && !error) {
        dispatch(fetchIdentifierInfo(params.identifier));
      }
    }
    return null;
  }

  componentDidUpdate (prevProps) {
    const { match: { params: prevParams }} = prevProps;
    const { match: { params }, dispatch } = this.props;
    if (prevParams.identifier !== params.identifier) {
      dispatch(fetchIdentifierInfo(params.identifier));
      dispatch(fetchRelated(params.identifier))
    }

    if (!prevProps.info && this.props.info) {
      dispatch(fetchRelated(params.identifier));
    }
  }

  componentWillUnmount () {
    const { dispatch } = this.props;
    dispatch(resetStore())
  }
  renderLoadingView (identifier) {
    return (
      <div className="loading">
        <h2 className="text-center">Fetching details for: {identifier}</h2>
        <div className="progress">
          <div className="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar"
               style={{ width: "88%" }}
               aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
        </div>
      </div>
    )
  }

  errorMessage (identifier) {
    return (
      <div className="error text-center">
        <h4>Uh oh, there was an error trying to fetch: {identifier}</h4>
        <Link to="/" className="btn btn-lg btn-info">Let's try again</Link>
      </div>
    )
  }

  render () {
    const { isFetching, info: { metadata = {}, reviews }, match: { params }, error } = this.props;
    const { title } = metadata;
    console.log(this.props);

    if (error) {
      return this.errorMessage(params.identifier);
    }

    if (isFetching) {
      return this.renderLoadingView(params.identifier);
    }
    return (
      <article className="container">
        <h2>{title}</h2>
        <Breadcrumbs { ...this.props }/>
        <MediaViewer {...metadata } />
        <MetaDataDetails {...metadata}/>
        <Reviews reviews={reviews} />
        <RelatedItems {...this.props} />
      </article>
    )
  }
}

PageContainer.propTypes = {
  dispatch: PropTypes.func
};
PageContainer.contextTypes = {
  router: PropTypes.object
};

const  mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(PageContainer);
