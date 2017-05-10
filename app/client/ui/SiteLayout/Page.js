import React from 'react';
import styles from './SiteLayout.scss';

class Page extends React.Component {

  render() {
    return (
      <div className={styles.page}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = Page;
