import React from 'react';
import styles from './SiteLayout.scss';
import MenuIcon from './MenuIcon';

class SiteSideBar extends React.Component {

  render() {
    return (
      <div id="site_side_bar" className={styles.site_side_bar}>
        <MenuIcon
          category={'standard'}
          icon={'dashboard'}
          container="default"
          size={'small'}
          iconColor="#16325c"
          fillColor="#FFFFFF"
        />
        {this.props.children}
      </div>
    );
  }

}

module.exports = SiteSideBar;
