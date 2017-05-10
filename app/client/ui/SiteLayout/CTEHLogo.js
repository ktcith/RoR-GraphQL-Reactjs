import React from 'react';

class CTEHLogo extends React.Component {

  static propTypes = {
    height: React.PropTypes.number
  };

  static defaultProps = {
    height: 32
  };

  render() {
    const height = this.props.height;
    const units = 'px';
    const style = {
      fontFamily: 'arial-black',
      height: `${height}${units}`,
      width: `${height * 2}${units}`,
      backgroundColor: '#106ab1',
      color: 'white',
      fontSize: `${height / 2}${units}`,
      lineHeight: `${height}${units}`,
      paddingLeft: '0.5em',
      paddingRight: '0.5em'
    };
    return (
      <div style={style}>
        CTEH
      </div>
    );
  }

}

module.exports = CTEHLogo;
