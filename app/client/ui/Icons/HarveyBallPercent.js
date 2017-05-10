import React from 'react';
import styles from './HarveyBall.scss';

class HarveyBallPercent extends React.Component {

  static propTypes = {
    percent: React.PropTypes.number.isRequired,
  };

  render() {
    const p = this.props.percent;
    if (p > 0.99) {
      return <div className={`${styles.harvey} ${styles.black}`} />;
    }
    if (p > 0.70) {
      return (
        <div className={`${styles.harvey} ${styles.black}`}>
          <div className={`${styles.threeQuarters}`} />
        </div>
      );
    }
    if (p > 0.40) {
      return <div className={`${styles.harvey} ${styles.halfLeft}`} />;
    }
    if (p > 0.20) {
      return (
        <div className={`${styles.harvey}`}>
          <div className={`${styles.upperLeft}`} />
        </div>
      );
    }
    return <div className={`${styles.harvey}`} />;
  }

}

module.exports = HarveyBallPercent;
