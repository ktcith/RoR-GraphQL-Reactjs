import { React, Relay, Link, UI, LD } from 'StandardImports';
import { RootLogin } from 'root_containers';
import RootAndIncidentTopBar from './RootAndIncidentTopBar';

class Incident extends React.Component {

  render() {
    const { root } = this.props;
    const { incident } = root;

    return (
      <RootLogin root={root}>
        <UI.SiteTitle title={incident.to_s} />
        {incident
          ? <UI.SiteSideBar onMenuClick={this.toggleTopBar}>
            <UI.SiteSideBarLink to="/" category="standard" icon="home">
                Home
              </UI.SiteSideBarLink>
            <UI.SiteSideBarLink
              to={`/incidents/${incident.id}`}
              category="standard"
              icon="folder"
            >
                Incident Dashboard
              </UI.SiteSideBarLink>
          </UI.SiteSideBar>
          : undefined}
        {incident
          ? <UI.SiteContent>
            <RootAndIncidentTopBar root={root} incident={incident} />
            {this.props.children}
          </UI.SiteContent>
          : undefined}
      </RootLogin>
    );
  }

}

module.exports = Relay.createContainer(Incident, {
  initialVariables: {
    incident_id: null,
  },

  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        ${RootAndIncidentTopBar.getFragment('root')}
        ${RootLogin.getFragment('root')}
        incident(id: $incident_id) {
          id
          to_s
          icon {
            icon
            category
          }
          ${RootAndIncidentTopBar.getFragment('incident')}
        }
      }`,
  },
});
