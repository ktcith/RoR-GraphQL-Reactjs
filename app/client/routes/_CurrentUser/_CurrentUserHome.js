import { React, Relay, Link, UI, LD } from 'StandardImports';
import { IncidentCreator, IncidentMediaObject } from 'incident_containers';
import { RootLogin } from 'root_containers';
import RootTopBar from './RootTopBar';
import UserHomeHeader from './UserHomeHeader';

class CurrentUserHome extends React.Component {

  state = {
    showForm: false,
    success: null,
    error: null,
  };

  onSuccess = () => {
    this.setState({
      showForm: false,
    });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  actions = () => {
    const { current_user } = this.props.root;
    console.log({ current_user });
    return current_user
      ? <LD.ButtonGroup>
        {current_user.can_create_incident
            ? <UI.Button
              id="create_incident"
              type={this.state.showForm ? 'neutral' : 'brand'}
              onClick={this.toggleForm}
              shortcut={this.state.showForm ? 'c' : 'i'}
              text={this.state.showForm ? 'Cancel' : 'Create Incident'}
            />
            : undefined}
      </LD.ButtonGroup>
      : undefined;
  };

  render() {
    const { root } = this.props;
    const { current_user } = this.props.root;
    return (
      <RootLogin root={root}>
        <UI.SiteSideBar>
          <UI.SiteSideBarLink to="/" category="standard" icon="home">Home</UI.SiteSideBarLink>
        </UI.SiteSideBar>
        {current_user
          ? <UI.SiteContent>
            <RootTopBar root={root} />
            <UI.Page>
              <UserHomeHeader user={root.current_user} />
              <UI.RecordLayout>
                <UI.RecordContent>
                  <UI.Section title="Your Incidents" actions={this.actions()}>
                    {this.state.showForm
                        ? <IncidentCreator
                          root={root}
                          user={current_user}
                          onSuccess={this.onSuccess}
                          onFailure={this.onFailure}
                        />
                        : undefined}
                    {current_user.incidents.map(incident => (
                      <IncidentMediaObject key={incident.__dataID__} incident={incident} />
                      ))}
                  </UI.Section>

                </UI.RecordContent>
                <UI.RecordSideBar />
              </UI.RecordLayout>
            </UI.Page>
          </UI.SiteContent>
          : undefined}
      </RootLogin>
    );
  }

}

module.exports = Relay.createContainer(CurrentUserHome, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        current_user {
          ${UserHomeHeader.getFragment('user')}
          ${IncidentCreator.getFragment('user')}
          can_create_incident
          incidents {
            ${IncidentMediaObject.getFragment('incident')}
          }
        }
        ${IncidentCreator.getFragment('root')}
        ${RootLogin.getFragment('root')}
        ${RootTopBar.getFragment('root')}
      }`,
  },
});
