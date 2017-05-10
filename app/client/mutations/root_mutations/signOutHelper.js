import { Relay } from 'StandardImports';
import SignOut from './SignOut';

/* globals window localStorage */

module.exports = () => {
  const onSuccess = (response) => {
    if (response.sign_out.success) {
      if (typeof Raven !== "undefined") {
        Raven.setUserContext();
      }
    }
  };

  const onFailure = (transaction) => {
    console.log("logout failed");
  };

  localStorage.setItem('accessToken', null);
  Relay.Store.commitUpdate(new SignOut(), { onFailure, onSuccess });

  // Return false to cancel any DOM events from onClick etc
  return false;
};
