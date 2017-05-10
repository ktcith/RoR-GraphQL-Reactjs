import React from 'react';
import styles from './RelatedListSection.scss';

class RelatedListSection extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    actions: React.PropTypes.node
  };

  static defaultProps = {
    actions: undefined
  }

  render() {
    return (
      <div>
        <div className="slds-grid">
          <div className={`slds-col slds-flex slds-align-left ${styles.title}`}>
            {this.props.title}
          </div>
          {
          this.props.actions ?
            <div
              className="slds-col slds-flex slds-align-right"
            >
              <div style={{ float: 'right' }}>
                {this.props.actions}
              </div>
            </div> : undefined
        }
        </div>
        <div className={styles.RelatedListSectionContent}>
          {this.props.children}
        </div>
      </div>

    );
  }

}

module.exports = RelatedListSection;
