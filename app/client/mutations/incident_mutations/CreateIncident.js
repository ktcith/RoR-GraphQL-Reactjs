import Relay from 'react-relay';
import moment from 'moment-timezone';

class CreateIncident extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { create_incident }`;
  }

  getVariables() {
    const { fields } = this.props;

    return {
      name: fields.name,
      account_id: fields.account_id,
      started_on: moment(fields.started_on, "MM/DD/YYYY", true).format(),
      city: fields.city,
      state: fields.state,
      description: fields.description,
      incident_type: fields.incident_type,
      incident_classification: fields.incident_classification,
      time_zone: fields.time_zone,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateIncidentPayload {
        user
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        user: this.props.user.__dataID__
      }
    },
    ];
  }

}

module.exports = CreateIncident;
