import React from 'react';
import Mousetrap from 'mousetrap';
import LD from 'LD';

class Button extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      shortcut: props.shortcut
    };
  }

  componentDidMount() {
    this.bindShortcut(this.state.shortcut);
  }

  componentWillReceiveProps(nextProps) {
    // Handle changing shortcut
    if (nextProps.shortcut !== this.state.shortcut) {
      this.unbindShortcut(this.state.shortcut);
      this.bindShortcut(nextProps.shortcut);
      this.setState({ shortcut: nextProps.shortcut });
    }
  }

  componentWillUnmount() {
    this.unbindShortcut(this.state.shortcut);
  }

  bindShortcut = (shortcut) => {
    if (shortcut) {
      // console.log(`Binding ${shortcut}`);
      Mousetrap.bind([shortcut], this.props.onClick);
    }
  };

  unbindShortcut = (shortcut) => {
    if (shortcut) {
      // console.log(`Unbinding ${shortcut}`);
      Mousetrap.unbind([shortcut]);
    }
  };

  render() {
    /* eslint no-unused-vars: 0 */
    const { shortcut, ...ldButtonCompatibleProps } = this.props;
    const { children, text, type } = ldButtonCompatibleProps;
    const restProps = Object.assign({}, ldButtonCompatibleProps);
    delete restProps.shortcut;
    delete restProps.text;

    const biasedType = type || 'neutral';

    if (typeof (text) === "string" && typeof (this.state.shortcut) === "string") {
      /* eslint react/no-danger: 0*/
      return (
        <LD.Button {...restProps} type={biasedType}>
          <span
            dangerouslySetInnerHTML={{
              __html: text.replace(new RegExp(this.state.shortcut, "g"), `<u>${this.state.shortcut}</u>`)
            }}
          />
        </LD.Button>
      );
    }
    // return <LD.Button {...restProps} />;
    return <LD.Button {...ldButtonCompatibleProps} />;
  }

}

module.exports = Button;
