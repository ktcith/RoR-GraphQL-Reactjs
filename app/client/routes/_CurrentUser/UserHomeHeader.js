import React from 'react';
import Relay from 'react-relay';
import LD from 'LD';

class UserHomeHeader extends React.Component {

  render() {
    const record = this.props.user;
    // const transactions = this.props.relay.getPendingTransactions(record);

    return (
      <LD.PageHeader>
        <LD.PageHeaderHeading
          legend="Home Page"
          title={record.to_s}
          figure={<LD.Icon category="utility" icon="home" />}
          rightActions={
            <LD.ButtonGroup key={2} className="slds-button-space-left">
              {this.props.children}
            </LD.ButtonGroup>
            }
        />
      </LD.PageHeader>
    );
  }

}

module.exports = Relay.createContainer(UserHomeHeader, {
  fragments: {
    user: () => Relay.QL `
      fragment on User {
        to_s
        icon {
          icon
          category
          legend
        }
    }`
  }
});
