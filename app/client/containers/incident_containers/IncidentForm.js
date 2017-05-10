import { React, Relay, Link, UI, LD } from 'StandardImports';
import { validated } from 'react-custom-validation';
import { RecordsSelect } from 'record_containers';
import { OptionsSelect } from 'option_containers';
import validator from 'validator';
import moment from 'moment-timezone';

class IncidentForm extends React.Component {

  render() {
    const { fields, onChange, onSubmitValid, onSubmitInvalid } = this.props;
    const { $fieldEvent, $validation, $submit } = this.props;
    return (
      <LD.Form type="stacked" onSubmit={() => $submit(onSubmitValid, onSubmitInvalid)}>

        <OptionsSelect
          options={this.props.root.incident_type_options}
          label="Incident Type"
          value={fields.incident_type || ''}
          type="text"
          onChange={e => onChange('incident_type', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'incident_type')}
          required
          error={$validation.incident_type.show && $validation.incident_type.error.reason}
        />

        <OptionsSelect
          options={this.props.root.incident_classification_options}
          label="Incident Classification"
          value={fields.incident_classification || ''}
          type="text"
          onChange={e => onChange('incident_classification', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'incident_classification')}
          required
          error={
            $validation.incident_classification.show &&
              $validation.incident_classification.error.reason
          }
        />

        <RecordsSelect
          records={this.props.user.accounts}
          label="Account"
          value={fields.account_id || ''}
          type="text"
          onChange={e => onChange('account_id', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'account_id')}
          required
          error={$validation.account_id.show && $validation.account_id.error.reason}
        />

        <LD.Input
          label="Name"
          value={fields.name || ''}
          type="text"
          onChange={e => onChange('name', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'name')}
          required
          error={$validation.name.show && $validation.name.error.reason}
        />
        <LD.Input
          label="Started On"
          defaultValue={fields.started_on || ''}
          type="text"
          onChange={e => onChange('started_on', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'started_on')}
          required
          error={$validation.started_on.show && $validation.started_on.error.reason}
        />
        <LD.Input
          label="City"
          value={fields.city || ''}
          type="text"
          onChange={e => onChange('city', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'city')}
          required
          error={$validation.city.show && $validation.city.error.reason}
        />
        <LD.Input
          label="State"
          value={fields.state || ''}
          type="text"
          onChange={e => onChange('state', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'state')}
          required
          error={$validation.state.show && $validation.state.error.reason}
        />
        <LD.Textarea
          label="Description"
          value={fields.description || ''}
          type="text"
          onChange={e => onChange('description', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'description')}
          required={false}
          error={$validation.description.show && $validation.description.error.reason}
        />

        <a onClick={() => this.props.relay.setVariables({ international: true })}>
          Show All Timezones
        </a>

        <OptionsSelect
          options={this.props.root.zone_options}
          label="Time Zone"
          value={fields.time_zone || ''}
          type="text"
          onChange={e => onChange('time_zone', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'time_zone')}
          required
          error={$validation.time_zone.show && $validation.time_zone.error.reason}
        />

        <LD.Button type="brand" onClick={() => $submit(onSubmitValid, onSubmitInvalid)}>
          Submit
        </LD.Button>
      </LD.Form>
    );
  }

}

function validationConfig({ fields }) {
  return {
    fields: [
      'account_id',
      'name',
      'started_on',
      'city',
      'state',
      'description',
      'incident_type',
      'incident_classification',
      'time_zone',
    ],
    validations: {
      name: [[x => validator.isEmpty(x) ? 'Name is required.' : null, fields.name]],
      account_id: [[x => validator.isEmpty(x) ? 'Account is required.' : null, fields.account_id]],
      started_on: [
        [x => validator.isEmpty(x) ? 'Started On is required.' : null, fields.started_on],
        [
          x =>
            moment(x, 'MM/DD/YYYY', true).isValid()
              ? null
              : 'Started On should be formatted as a date.  MM/DD/YYYY',
          fields.started_on,
        ],
      ],
      city: [[x => validator.isEmpty(x) ? 'City is required.' : null, fields.city]],
      state: [[x => validator.isEmpty(x) ? 'State is required.' : null, fields.state]],
      description: [[() => null]],
      incident_type: [
        [x => validator.isEmpty(x) ? 'Incident Type is required.' : null, fields.incident_type],
      ],
      incident_classification: [
        [
          x => validator.isEmpty(x) ? 'Incident Classification is required.' : null,
          fields.incident_classification,
        ],
      ],
      time_zone: [[x => validator.isEmpty(x) ? 'Time Zone is required.' : null, fields.time_zone]],
    },
  };
}

module.exports = Relay.createContainer(validated(validationConfig)(IncidentForm), {
  initialVariables: {
    international: false,
  },
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        incident_type_options {
          ${OptionsSelect.getFragment('options')}
        }
        incident_classification_options {
          ${OptionsSelect.getFragment('options')}
        }
        zone_options (international: $international) {
          ${OptionsSelect.getFragment('options')}
        }
      }`,
    user: () => Relay.QL`
      fragment on User {
          accounts {
            ${RecordsSelect.getFragment('records')}
          }
      }`,
  },
});
