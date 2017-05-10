import React from 'react';
import { Link } from 'react-router';

class LinkButton extends React.Component {

  render() {
    return (
      <Link
        className="slds-button slds-button--neutral"
        to={this.props.to}
      >
        {this.props.children}
      </Link>
    );
  }

}

module.exports = LinkButton;
