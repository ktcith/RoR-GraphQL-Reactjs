import { React, Relay, Link, UI, LD } from 'StandardImports';

class SiteWrapper extends React.Component {

  static childContextTypes = {
    commit: React.PropTypes.func,
  };

  getChildContext() {
    return {
      commit: this.commit,
    };
  }
  commit = (...args) => {
    if (this.topbar) {
      this.topbar.commit(...args);
    } else {
      throw new Error('Attempting to call commit method but needed components are not mounted');
    }
  };

  render() {
    return (
      <UI.SiteLayoutWrapper>
        <UI.RelayMutationProgressBar
          ref={(r) => {
            this.topbar = r;
          }}
        />
        {this.props.children}
      </UI.SiteLayoutWrapper>
    );
  }

}

module.exports = SiteWrapper;
