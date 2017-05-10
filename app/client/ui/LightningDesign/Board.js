import React from 'react';
import BoardTile from './BoardTile';

class Board extends React.Component {

  static propTypes = {
    // children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(BoardTile)),
    children: React.PropTypes.arrayOf(React.PropTypes.node),
  };

  static defaultProps = {
    children: [],
  };

  render() {
    return (
      <ul className="slds-has-dividers--around-space">
        {this.props.children}
      </ul>
    );
  }

}

module.exports = Board;
