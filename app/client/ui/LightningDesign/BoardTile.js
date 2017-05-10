import React from 'react';
// import BoardTileIcon from './BoardTileIcon';

class BoardTile extends React.Component {

  renderIcon = () => {
    return this.props.icon;
  };

  renderHeader = () => {
    return this.props.header;
  };

  render() {
    return (
      <li className="slds-item">
        <div className="slds-tile slds-tile--board">
          {this.renderHeader()}
          <div className="slds-tile__detail slds-text-body--small">
            {this.props.children}
            {this.renderIcon()}
          </div>
        </div>
      </li>
    );
  }

}

module.exports = BoardTile;
