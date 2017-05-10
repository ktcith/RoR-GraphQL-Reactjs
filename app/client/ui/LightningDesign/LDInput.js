import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import keycoder from 'keycoder';
import { Icon, FormElement, Text } from 'react-lightning-design-system';

class LDInput extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  onKeyDown(e) {
    const { symbolPattern, onKeyDown } = this.props;
    if (symbolPattern) {
      const { keyCode, shiftKey } = e;
      const value = keycoder.toCharacter(keyCode, shiftKey);
      if (value && !value.match(new RegExp(symbolPattern))) {
        e.preventDefault();
        return;
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  renderAddon(content) {
    return (
      <Text
        tag='span'
        className='slds-form-element__addon'
        category='body'
        type='regular'
      >
        { content }
      </Text>
    );
  }

  renderIcon(icon, align) {
    return (
      React.isValidElement(icon) ? icon :
      <Icon
        icon={icon}
        className={classnames('slds-input__icon', `slds-input__icon--${align}`, 'slds-icon-text-default')}
      />
    );
  }

  renderLDInput(props) {
    const {
      id, readOnly, className, inputRef, type, bare, value, defaultValue, htmlReadOnly,
      ...pprops
    } = props;
    const inputClassNames = classnames(className, bare ? 'slds-input--bare' : 'slds-input');
    return (
      readOnly ?
        <Text
          type='regular'
          category='body'
          className='slds-form-element__static'
          id={id}
        >
          { value }
        </Text> :
        <input
          ref={inputRef}
          className={inputClassNames}
          id={id}
          type={type}
          value={value}
          defaultValue={defaultValue}
          readOnly={htmlReadOnly}
          {...pprops}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
    );
  }

  render() {
    const {
      id = `input-${uuid()}`, label, required, error, readOnly, totalCols, cols, ...props
    } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, readOnly, totalCols, cols };
      return (
        <FormElement {...formElemProps}>
          <LDInput {...{ id, readOnly, ...props }} />
        </FormElement>
      );
    }
    const { iconLeft, iconRight, addonLeft, addonRight, ...pprops } = props;
    delete pprops.symbolPattern;
    const inputProps = { ...pprops, id, readOnly };
    if (iconLeft || iconRight || addonLeft || addonRight) {
      const wrapperClassName = classnames(
        'slds-form-element__control',
        { 'slds-input-has-icon': iconLeft || iconRight },
        { 'slds-input-has-icon--left-right': iconLeft && iconRight },
        { 'slds-input-has-icon--left': iconLeft },
        { 'slds-input-has-icon--right': iconRight },
        { 'slds-input-has-fixed-addon': addonLeft || addonRight },
      );
      return (
        <div className={wrapperClassName}>
          { addonLeft ? this.renderAddon(addonLeft) : undefined }
          { iconLeft ? this.renderIcon(iconLeft, 'left') : undefined }
          { this.renderLDInput(inputProps) }
          { iconRight ? this.renderIcon(iconRight, 'right') : undefined }
          { addonRight ? this.renderAddon(addonRight) : undefined }
        </div>
      );
    }
    return this.renderLDInput(inputProps);
  }

}

LDInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  bare: PropTypes.bool,
  inputRef: PropTypes.func,
  symbolPattern: PropTypes.string,
  readOnly: PropTypes.bool,
  htmlReadOnly: PropTypes.bool,
  iconLeft: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  iconRight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  addonLeft: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  addonRight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

LDInput.isFormElement = true;

module.exports = LDInput;
