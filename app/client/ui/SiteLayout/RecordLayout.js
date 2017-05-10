import React from 'react';
import styles from './SiteLayout.scss';

class RecordLayout extends React.Component {

  render() {
    return (
      <div className={styles.record_layout}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = RecordLayout;
