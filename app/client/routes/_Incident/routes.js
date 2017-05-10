import RootQuery from 'RootQuery';
import { withRouteRender } from 'UI';

module.exports = withRouteRender({
  path: '/incidents/:incident_id',
  component: require('./_Incident'),
  queries: RootQuery,
  indexRoute: {
    component: require('./_IncidentShowPage'),
    queries: RootQuery
  },
  childRoutes: [
  ],
});
