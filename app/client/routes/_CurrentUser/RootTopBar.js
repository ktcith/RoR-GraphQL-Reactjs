import { React, Relay, Link, UI, LD } from 'StandardImports';
import { signOutHelper } from 'root_mutations';

class RootTopBar extends React.Component {

  render() {
    const { root } = this.props;
    return (
      <header>
        <a className="slds-assistive-text slds-assistive-text--focus">Skip to Navigation</a>
        <a className="slds-assistive-text slds-assistive-text--focus">Skip to Main Content</a>
        <div className="slds-global-header slds-grid slds-grid--align-spread">
          <div className="slds-global-header__item">
            <div className="slds-global-header__logo">
              <UI.CTEHLogo />
            </div>
          </div>
          <div className="slds-global-header__item slds-global-header__item--search">
            <div className="slds-form-element slds-lookup" />
          </div>
          <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">
            <li className="slds-dropdown-trigger slds-dropdown-trigger--click slds-m-left--x-small">
              { root.current_user.to_s }
              &nbsp;
              { /* without href="#" capybara doesn't locate the link */ }
              <Link id="Logout" href="#" onClick={signOutHelper}>Logout</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }

}

module.exports = Relay.createContainer(RootTopBar, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        current_user {
          to_s
        }
      }`
  }
});
