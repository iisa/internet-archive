import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from './redux/reducers';
import Root from './components/Root';

import './style.scss';

const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Root store={ store }/>,
  document.getElementById('app')
);




if (module.hot) {
  module.hot.accept();
}