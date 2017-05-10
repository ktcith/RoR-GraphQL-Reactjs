import React from 'react';
import routeRender from './routeRender';

// Applies given routeRender to component, indexRoute, and childRoutes of route object
const withRouteRender = (route, routeRenderOptions) => {
  // console.log("withRouteRender", { route });
  const routeRenderFn = routeRender(routeRenderOptions || {}, route);
  const modified = Object.assign({}, { render: routeRenderFn }, route);
  if (modified.indexRoute && !modified.indexRoute.render) {
    modified.indexRoute.render = routeRenderFn;
  }
  if (modified.childRoutes) {
    modified.childRoutes = modified.childRoutes.map(r => Object.assign({}, { render: routeRenderFn }, r));
  }
  // console.log("withRouteRender return", { modified });
  return modified;
};

module.exports = withRouteRender;
