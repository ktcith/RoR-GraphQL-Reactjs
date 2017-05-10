import React from 'react';
import Relay from 'react-relay';
import styles from './SiteLayout.scss';

class SiteLayout extends React.Component {

  render() {
    return (
      <div id="application" className={styles.site}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = SiteLayout;
