import React from 'react';
import styles from './SiteLayout.scss';

class RecordSideBar extends React.Component {

  render() {
    return (
      <div className={styles.record_side_bar}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = RecordSideBar;
