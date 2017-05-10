import React from 'react';
import styles from './HarveyBall.scss';

class HarveyBall extends React.Component {

  static propTypes = {
    status: React.PropTypes.string
  };

  static defaultProps = {
    status: 'open'
  };

  /* eslint-disable class-methods-use-this */
  render() {
    const classNames = {
      open: `${styles.harvey}`,
      partially_complete: `${styles.harvey} ${styles.halfBottom}`,
      complete: `${styles.harvey} ${styles.black}`
    };

    return (
      <div className={classNames[this.props.status]} />
    );
  }

}

module.exports = HarveyBall;
