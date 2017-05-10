import React from 'react';
import RootQuery from 'RootQuery';
import { withRouteRender } from 'UI';

module.exports = withRouteRender({
  path: '/',
  component: require('./SiteWrapper'),
  indexRoute: {
    component: require('./_CurrentUser/_CurrentUserHome'),
    queries: RootQuery,
  },
  childRoutes: [
    require('./_Incident/routes'),
    require('./_CurrentUser/routes'),
    require('./_Public/routes'),
    {
      path: '*',
      indexRoute: {
        component: require('./_Public/_ErrorPage404'),
      },
    },
  ],
});
