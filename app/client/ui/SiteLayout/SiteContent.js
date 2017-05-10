import React from 'react';
import styles from './SiteLayout.scss';

class SiteContent extends React.Component {

  render() {
    return (
      <div className={styles.site_content}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = SiteContent;
