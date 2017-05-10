import React from 'react';
import styles from './SiteLayout.scss';

class RecordContent extends React.Component {

  static propTypes = {
    noPadding: React.PropTypes.bool
  };

  static defaultProps = {
    noPadding: false
  };

  render() {
    const className = this.props.noPadding ?
      styles.record_content_noPadding :
      styles.record_content;

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }

}

module.exports = RecordContent;
