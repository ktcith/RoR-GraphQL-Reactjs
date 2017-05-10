import React from 'react';
import styles from './Section.scss';

class Section extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    actions: React.PropTypes.node,
    padTop: React.PropTypes.bool,
  };

  static defaultProps = {
    actions: undefined,
    padTop: false,
  };

  render() {
    const containerStyle = {};
    if (this.props.padTop) {
      containerStyle.paddingTop = '1em';
    }
    return (
      <div style={containerStyle}>
        <div className="slds-grid">
          <div className={`slds-col slds-flex slds-align-left ${styles.title}`}>
            {this.props.title}
          </div>
          {this.props.actions
            ? <div className="slds-col slds-flex slds-align-left">
              {this.props.actions}
            </div>
            : undefined}
        </div>
        <div className={styles.sectionContent}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

module.exports = Section;
