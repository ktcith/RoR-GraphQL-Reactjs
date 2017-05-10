import React from 'react';
import LD from 'LD';

class TH extends React.Component {

  render() {
    if (this.props.children) {
      return <LD.TableHeaderColumn {...this.props} />;
    }
    return <LD.TableHeaderColumn {...this.props}><span /></LD.TableHeaderColumn>;
  }

}

module.exports = TH;
