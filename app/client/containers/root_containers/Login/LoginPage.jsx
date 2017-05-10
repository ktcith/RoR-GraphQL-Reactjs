import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import LD from 'LD';
import { RegisterUser } from 'root_mutations';
import LoginForm from './LoginForm';
import styles from './LoginPage.scss';

class LoginPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any
  };

  constructor(...params) {
    super(...params);
    console.log({ state: this.state });
    this.state = {
      showLoader: false,
      submittingRegistration: false,
      registrationError: null,
      registrationFields: {
        first_name: '',
        last_name: '',
        email: '',
        company_or_agency: '',
        registration_key: ''
      }
    };
    this.renderForm = this.renderForm.bind(this);
  }

  onRegistrationFormChange = (field, value) => {
    const { registrationFields } = this.state;
    registrationFields[field] = value;
    this.setState({ registrationFields });
  };

  onSubmitValidRegistrationForm = () => {
    const mutation = new RegisterUser({ root: this.props.root, fields: this.state.registrationFields });
    const onFailure = (transaction) => {
      this.setState({
        submittingRegistration: false,
        registrationError: "An unexpected error occurred.  Contact support"
      });
      console.log({ error: transaction.getError() });
    };
    /* globals localStorage window */
    const onSuccess = (response) => {
      if (response.register_user) {
        if (response.register_user.access_token) {
          // Log them in regardless, but also send them to set their password
          localStorage.setItem('accessToken', response.register_user.access_token);
          // window.location = `users/password/edit?reset_password_token=${response.register_user.password_reset_token}`;
          this.context.router.push(`/incidents/${response.register_user.incident_id}`);
          // this.props.relay.forceFetch({}, () => {});
          window.location.reload();
        } else {
          this.setState({
            submittingRegistration: false,
            registrationError: response.register_user && response.register_user.error
          });
        }
      } else {
        this.setState({
          submittingRegistration: false,
          registrationError: "An unexpected error occurred, please contact support."
        });
      }
    };

    Relay.Store.commitUpdate(mutation, { onSuccess, onFailure });
    this.setState({ submittingRegistration: true });
  };

  renderForm() {
    return (
      <div className={styles.outerContainer}>
        { this.state.submittingRegistration ? <LD.Spinner type='brand' size='large' /> : undefined }
        <div className={styles.titleContainer}>
          <div id="title" className={styles.logo}>
            Application™ Login
          </div>
        </div>
        <div className={styles.formContainer}>
          <LoginForm />
          <div className={styles.errorMessage}>
            { this.state.errorMessage }
          </div>
          <Link to='/Public/ForgotPassword'>Forgot Your Password?</Link>
        </div>
      </div>
    );
  }

  /* eslint class-methods-use-this: 0 */
  /* eslint max-len: 0 */
  renderAd() {
    const ad = false;
    let result;
    if (ad) {
      result = (
        <div className={styles.brandSide}>
          <div className={styles.attribution}>
            <a href="https://www.flickr.com/photos/navfac/8552567928/in/photolist-e2L9tJ-8fhTPf-8feBND-fm1EQk-AteTuX-bF1aiH-9Y8iiJ-qj49Lk-qWY1Z7-9Y8iVS-druR2i-9Y5ioz-bs6gKY-bs6iej-ccMAmC-uRDUpy-c7jWZG-9Y8f1N-9rqEiF-oT1A2h-fAzQJw-6fSQGQ-do5auk-jXtiMZ-akpHie-akpGmD-aksypG-aCbn8v-6fSHrC-2k98Vw-cHNwBy-chzs61-fvQ8Xw-akpL2r-fvHfFN-6fNEVF-8AAtwc-8zuqcz-dcCvwY-chzhiC-chzuow-chzybA-8JDAtm-aksujo-6fND18-akpKkX-akswSy-fvHnsE-akpFpr-chyX2S">
              Image by NAVFAC
            </a>
          </div>
        </div>
      );
    } else {
      result = null;
    }
    return result;
  }

  render() {
    console.log({ state: this.state });
    return (
      <div id="application" className={styles.root}>
        <div className={styles.formSide}>{this.renderForm()}</div>
        {this.renderAd()}
      </div>
    );
  }

}

module.exports = LoginPage;
