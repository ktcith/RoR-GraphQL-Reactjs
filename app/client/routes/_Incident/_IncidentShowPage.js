import { React, Relay, Link, UI, LD } from 'StandardImports';
import IncidentHeader from './IncidentHeader';

class IncidentShowPage extends React.Component {

  render() {
    const { root } = this.props;
    const { incident } = root;

    return (
      <UI.Page>
        <IncidentHeader incident={incident} noDetails />
        <UI.RecordLayout>
        </UI.RecordLayout>
      </UI.Page>
    );
  }

}

module.exports = Relay.createContainer(IncidentShowPage, {
  initialVariables: {
    incident_id: null,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        incident(id: $incident_id) {
          time_zone
          ${IncidentHeader.getFragment('incident')}
          incident_classification_text
          state
          started_on
        }
      }`,
  },
});
