import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';


class Textarea extends Component {

  constructor() {
    super();
    this.state = { id: `form-element-${uuid()}` };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, totalCols, cols, ...props } = this.props;
    if (label || required || error || totalCols || cols) {
      const formElemProps = { id, label, required, error, totalCols, cols };
      return (
        <FormElement {...formElemProps}>
          <Textarea {...{ ...props, id }} />
        </FormElement>
      );
    }
    const { className, inputRef, ...pprops } = props;
    const taClassNames = classnames(className, 'slds-input');
    return (
      <textarea
        id={id}
        ref={inputRef}
        className={taClassNames}
        onChange={this.onChange}
        {...pprops}
      />
    );
  }

}

Textarea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: FormElement.propTypes.error,
  totalCols: PropTypes.number,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
};

Textarea.isFormElement = true;

module.exports = Textarea;
