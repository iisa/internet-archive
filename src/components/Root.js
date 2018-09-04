import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PageContainer from './PageContainer';
import HomeContainer from './HomeContainer';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Redirect from='/collections/:identifier' to='/:identifier'/>
          <Route exact path="/:identifier"  component={PageContainer} />
          <Route component={HomeContainer} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;