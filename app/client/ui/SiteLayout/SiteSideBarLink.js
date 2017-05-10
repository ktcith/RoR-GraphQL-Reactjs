import React from 'react';
import { Link } from 'react-router';
import SimpleIcon from '../Icons/SimpleIcon';
import styles from './SiteLayout.scss';

class SiteSideBarLink extends React.Component {

  static propTypes = {
    children: React.PropTypes.string.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? styles.activeSideBarLink : styles.notActiveSideBarLink;
    const iconColor = isActive ? '#0e2444' : '#16325c';
    return (
      <div className={className}>
        <Link to={this.props.to} id={this.props.children}>
          {
            this.props.customIcon ?
              this.props.customIcon :
              <SimpleIcon
                category={this.props.category}
                icon={this.props.icon}
                container="default"
                size={'small'}
                iconColor={iconColor}
                fillColor="#FFFFFF"
              />
          }
        </Link>
      </div>
    );
  }

}

module.exports = SiteSideBarLink;
