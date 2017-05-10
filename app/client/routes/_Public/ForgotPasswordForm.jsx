import { React, Relay, Link, UI, LD } from 'StandardImports';
import validator from 'validator';
import { validated } from 'react-custom-validation';

class ForgotPasswordForm extends React.Component {

  render() {
    const { fields, onChange, onSubmitValid, onSubmitInvalid } = this.props;
    const { $fieldEvent, $validation, $submit } = this.props;
    return (
      <LD.Form
        id="registrationForm"
        type='stacked'
        onSubmit={() => $submit(onSubmitValid, onSubmitInvalid)}
      >
        <LD.Input
          label='Email'
          value={fields.email || ""}
          type='text'
          onChange={e => onChange('email', e.target.value)}
          onBlur={() => $fieldEvent('blur', 'email')}
          required
          error={$validation.email.show && $validation.email.error.reason}
        />
        <input type="submit" style={{ display: 'None' }} />
        <LD.Button
          type='brand'
          onClick={() => $submit(onSubmitValid, onSubmitInvalid)}
        >
          Send me reset password instructions
        </LD.Button>
      </LD.Form>
    );
  }

}

function validationConfig({ fields }) {
  return {
    fields: [
      'email',
    ],
    validations: {
      email: [
        [x => (validator.isEmpty(x) ? "Email is required" : null), fields.email],
        [x => (validator.isEmail(x) ? null : "Valid email is required"), fields.email],
      ]
    },
  };
}

module.exports = validated(validationConfig)(ForgotPasswordForm);
