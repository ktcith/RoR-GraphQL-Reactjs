import { React, Relay, Link, UI, LD } from 'StandardImports';
import { CreateIncident } from 'incident_mutations';
import moment from 'moment-timezone';
import IncidentForm from './IncidentForm';

class IncidentCreator extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any,
    commit: React.PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      fields: this.defaultFields(),
      submitting: false,
    };
  }

  onSubmitInvalid = () => {
  };

  onChange = (field, value) => {
    const { fields } = this.state;
    fields[field] = value;
    this.setState({ fields });
  };

  onSubmitValid = () => {
    const fields = this.state.fields;
    const { user } = this.props;
    const { onSuccess } = this.props;
    const mutation = new CreateIncident({ user, fields });
    this.context.commit(mutation, { onSuccess });
  };

  defaultFields = () => ({
    account_id: this.props.user.accounts[0].id,
    name: '',
    started_on: moment(new Date()).format("MM/DD/YYYY"),
    city: '',
    state: '',
    description: '',
    incident_type: 'incident',
    incident_classification: 'type5',
    time_zone: 'America/Chicago',
  });

  render() {
    const { user, root } = this.props;
    return (
      <IncidentForm
        root={root}
        user={user}
        fields={this.state.fields}
        onChange={this.onChange}
        onSubmitValid={this.onSubmitValid}
        onSubmitInvalid={this.onSubmitInvalid}
      />
    );
  }

}

module.exports = Relay.createContainer(IncidentCreator, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        ${IncidentForm.getFragment('root')}
      }`,
    user: () => Relay.QL`
      fragment on User {
        accounts {
          id
        }
        ${IncidentForm.getFragment('user')}
      }`
  }
});
