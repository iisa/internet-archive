import * as actions from './constants';
import _ from 'lodash';

const initialState = {
  isFetching: false,
  info: '',
  related: [],
  error: false
};

const mainReducer = (state = initialState, updated) => {
  const { type: act, response } = updated;
  switch (act) {
    case actions.FETCH_INFO_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case actions.FETCH_INFO_SUCCESS:
      return Object.assign({}, state, { info: response, isFetching: false });
    case actions.FETCH_INFO_FAILURE:
      return Object.assign({}, state, { error: true, isFetching: false });
    case actions.FETCH_RELATED_SUCCESS:
      return Object.assign({}, state, { related: response });
    case actions.RESTORE_STORE:
      return initialState;
    default:
      return state;
  }

};

export default mainReducer;
