import React from 'react';
import LD from 'LD';

// React Lightning Design TableRowColumn is picky about its children
// TD wraps it converts children
//  null -> &nbsp;
//  strings and valid elements get passed through
//  Non Elements and Non Strings get stringified

class TD extends React.Component {

  render() {
    if (this.props.children === null) {
      return <LD.TableRowColumn {...this.props}>&nbsp;</LD.TableRowColumn>;
    }
    if (typeof (this.props.children) !== "object" &&
      typeof (this.props.children) !== "string" &&
      !React.isValidElement(this.props.children)) {
      return <LD.TableRowColumn {...this.props}>{JSON.stringify(this.props.children, null, 2)}</LD.TableRowColumn>;
    }

    return <LD.TableRowColumn {...this.props}>{this.props.children}</LD.TableRowColumn>;
  }

}

module.exports = TD;
