// import 'babel-polyfill';
import React from 'react';
import 'isomorphic-fetch'; // safari needs this
import ReactDOM from 'react-dom';
import Routes from 'routes';
import { Router, applyRouterMiddleware, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import {
  RelayNetworkLayer,
  authMiddleware,
  urlMiddleware,
  retryMiddleware,
  batchMiddleware,
  perfMiddleware,
  loggerMiddleware,
  gqErrorsMiddleware,
} from 'react-relay-network-layer';
import schemaUpdatedOn from './schemaUpdatedOn';

console.log(schemaUpdatedOn);

//   perfMiddleware, gqErrorsMiddleware, loggerMiddleware, retryMiddleware, urlMiddleware

/* globals localStorage document */
/* eslint no-param-reassign: 0 */
//  req.credentials = 'same-origin'; // provide CORS policy to XHR request in fetch method

Relay.injectNetworkLayer(
  new RelayNetworkLayer([
    urlMiddleware({
      url: () => '/graphql',
    }),
    batchMiddleware({
      batchUrl: () => '/graphql',
      batchTimeout: 10,
    }),
    loggerMiddleware(),
    gqErrorsMiddleware(),
    perfMiddleware(),
    retryMiddleware({
      fetchTimeout: 15000,
      retryDelays: attempt => Math.pow(2, attempt + 4) * 100, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
      forceRetry: (cb, delay) => {
        window.forceRelayRetry = cb;
        console.log(`call \`forceRelayRetry()\` for immediately retry! Or wait ${delay} ms.`);
      },
      statusCodes: [500, 503, 504],
    }),
    authMiddleware({
      token: () => localStorage.getItem('accessToken'),
      prefix: '', // default: 'Bearer '
      header: 'Authorization',
      allowEmptyToken: true,
    }),
    next => (req) => {
      // req.headers['X-Request-ID'] = uuid.v4(); // add `X-Request-ID` to request headers
      req.credentials = 'same-origin'; // provide CORS policy to XHR request in fetch method
      return next(req);
    },
  ]),
);

const appHistory = useRouterHistory(createHashHistory)();

ReactDOM.render(
  <Router
    render={applyRouterMiddleware(useRelay)}
    routes={Routes}
    forceFetch
    history={appHistory}
    environment={Relay.Store}
  />,
  document.getElementById('react-app'),
);
