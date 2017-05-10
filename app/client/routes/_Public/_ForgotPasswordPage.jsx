import { React, Relay, LD, UI, Link } from 'StandardImports';
import { printTransactionErrors } from 'lib';
import styles from './Public.scss';
import ForgotPasswordForm from './ForgotPasswordForm';

class ForgotPasswordPage extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any
  };

  state = {
    submitting: false,
    success: false,
    error: false,
    fields: {
      email: ''
    }
  };

  onChange = (field, value) => {
    const { fields } = this.state;
    fields[field] = value;
    this.setState({ fields });
  };

  onSubmitValid = () => {
    const mutation = new RequestForgotPassword({ fields: this.state.fields });
    const onFailure = (transaction) => {
      this.setState({
        submitting: false,
        error: "An unexpected error occurred.  Contact support"
      });
      printTransactionErrors(transaction);
    };

    const onSuccess = (response) => {
      if (response.request_forgot_password) {
        if (response.request_forgot_password.success) {
          this.setState({
            submitting: false,
            success: true,
            error: false
          });
        } else {
          this.setState({
            submitting: false,
            success: false,
            error: response.request_forgot_password && response.request_forgot_password.error
          });
        }
      } else {
        this.setState({
          submitting: false,
          error: "An unexpected error occured, please contact support."
        });
      }
    };

    Relay.Store.commitUpdate(mutation, { onSuccess, onFailure });
    this.setState({ submitting: true });
  };

  render() {
    console.log({ state: this.state });
    return (
      <div id="application" className={styles.root}>
        <div className={styles.formSide}>
          { this.state.submitting ? <LD.Spinner type='brand' size='large' /> : undefined }
          <div className={styles.outerContainer}>
            { this.state.submittingRegistration ? <LD.Spinner type='brand' size='large' /> : undefined }
            <div className={styles.titleContainer}>
              <div id="title" className={styles.logo}>
                Forgot Password?
              </div>
            </div>
            <div className={styles.formContainer}>
              {
                !this.state.success ?
                  <ForgotPasswordForm
                    fields={this.state.fields}
                    onChange={this.onChange}
                    onSubmitInvalid={() => console.log("Invalid Submit")}
                    onSubmitValid={this.onSubmitValid}
                  /> :
                  <p>
                    Success.  You should receive an email soon with instructions.
                    Some users find it helpfull to check their spam or clutter
                    folders.
                  </p>
              }
              {
                this.state.error ?
                  <p>
                    <b style={{ color: "Red" }}>
                      {this.state.error}
                    </b>
                  </p> :
                  undefined
              }
              <br />
              <Link to='/'>Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

module.exports = ForgotPasswordPage;
