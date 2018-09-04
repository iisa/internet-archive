import * as actions from './constants';
import _ from 'lodash';
import { fetchInfo, fetchRelatedInfo } from '../api';


const fetchSuccess = (response) => {
  return {
    type: actions.FETCH_INFO_SUCCESS,
    response: response
  }
};

const fetchFailure = () => {
  return {
    type: actions.FETCH_INFO_FAILURE
  }
};

export function fetchIdentifierInfo (identifier) {
  return dispatch => {
    dispatch({ type: actions.FETCH_INFO_REQUEST });

    fetchInfo(identifier, (response) => {
      const { responseText } = response;
      const res = JSON.parse(responseText);

      if (_.isEmpty(res) || !res.metadata) {
        dispatch(fetchFailure());
      } else {
        dispatch(fetchSuccess(res))
      }
    })
  }
}

const fetchRelatedSuccess = (res) => {
  const parsedRes = JSON.parse(res);
  return {
    type: actions.FETCH_RELATED_SUCCESS,
    response: _.get(parsedRes, 'hits.hits', [])
  }
};

export function fetchRelated (identifier) {
  return dispatch => {
    dispatch({ type: actions.FETCH_RELATED_REQUEST });

    fetchRelatedInfo(identifier, (response) => {
      const { status, responseText } = response;
      if (200 === status) {
        dispatch(fetchRelatedSuccess(responseText))
      }
    })
  }
}

export function resetStore () {
  return dispatch => dispatch({ type: actions.RESTORE_STORE })
}