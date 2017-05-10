import { React, Relay, Link, UI, LD } from 'StandardImports';
import styles from './IncidentMediaObject.scss';

class IncidentMediaObject extends React.Component {

  render() {
    const { incident } = this.props;
    return (
      <div className={`slds-media ${styles.media}`}>
        <div className="slds-media__figure">
          <LD.Icon
            category={incident.icon.category}
            icon={incident.icon.icon}
            size="small"
          />
        </div>
        <div className="slds-media__body">
          <Link to={`/incidents/${incident.id}`}>
            <h1>{incident.name}</h1>
          </Link>
          <p>{incident.city}, {incident.state}</p>
          {
            incident.description ?
              <p>{incident.description}</p> :
            undefined
          }
        </div>
      </div>
    );
  }

}

module.exports = Relay.createContainer(IncidentMediaObject, {
  fragments: {
    incident: () => Relay.QL`
      fragment on Incident {
        id
        icon {
          icon
          category
        }
        name
        started_on
        ended_on
        city
        state
        description
        status
        incident_type
        incident_classification
        time_zone
      }`
  }
});
