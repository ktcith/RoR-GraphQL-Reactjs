import React from 'react';

class PlanningPIcon extends React.Component {

  static propTypes = {
    version: React.PropTypes.string.isRequired,
    height: React.PropTypes.number,
    fillColor: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    version: 'standard',
    height: 32,
    fillColor: '#5a9cdd'
  };

  /* eslint-disable no-mixed-operators */
  render() {
    const { fillColor, height, version } = this.props;
    const width = height;
    const style = { width: `${width}px`, height: `${width}px` };
    let c1;
    let c2;
    if (version === 'utility') {
      c1 = 'none';
      c2 = fillColor;
    } else {
      c1 = fillColor;
      c2 = 'white';
    }

    return (
      <svg
        style={style} version="1.1" id="_x31_" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width={`32px`} height={`32px`} viewBox={`0 0 32 32`} enableBackground={`new 0 0 32 32`}
      >
        <g>
          <path
            fillRule="evenodd" clipRule="evenodd" fill={c1} d="M6.14,0H25.86C29.237,0,32,2.763,32,6.14V25.86
            c0,3.377-2.763,6.14-6.14,6.14H6.14C2.763,32,0,29.237,0,25.86V6.14C0,2.763,2.763,0,6.14,0z"
          />
          <path
            fillRule="evenodd" clipRule="evenodd" fill={c2} d="M16.855,21.383v4.709H6.429v-6.737
            c0.085,0.097,0.173,0.191,0.263,0.282l0.006,0.006c1.076,1.074,2.557,1.741,4.183,1.741H16.855L16.855,21.383z M10.882,6.186
            c-2.449,0-4.452,2.003-4.452,4.453v4.386c0,2.449,2.003,4.453,4.452,4.453h10.236c2.449,0,4.452-2.003,4.452-4.453v-4.386
            c0-2.449-2.003-4.453-4.452-4.453H10.882L10.882,6.186z M14.726,10.959h2.642c0.774,0,1.407,0.633,1.407,1.407v0.869
            c0,0.774-0.633,1.407-1.407,1.407h-2.642c-0.775,0-1.407-0.633-1.407-1.407v-0.869C13.319,11.592,13.951,10.959,14.726,10.959z"
          />
        </g>
      </svg>
    );
  }

}

module.exports = PlanningPIcon;
