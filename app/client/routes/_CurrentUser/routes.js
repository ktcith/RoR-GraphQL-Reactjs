import RootQuery from 'RootQuery';
import { withRouteRender } from 'UI';

module.exports = withRouteRender({
  path: '/home',
  component: require('./_CurrentUserHome'),
  queries: RootQuery,
  childRoutes: [
  ],
});
