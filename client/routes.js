import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from '#components/App';
import Landing from '#components/Landing';

import gatheredReducers from './reducers';

// Cause css to get loaded
require('./css');

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers(
    Object.assign({}, gatheredReducers, { 
      routing: routerReducer
    })
  ),
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={Landing} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
