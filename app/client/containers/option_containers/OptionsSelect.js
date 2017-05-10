import { React, Relay, Link, UI, LD } from 'StandardImports';

class OptionsSelect extends React.Component {

  render() {
    const { options } = this.props;
    return (
      <LD.Select
        name={this.props.label}
        label={this.props.label}
        required={this.props.required}
        value={this.props.value}
        error={this.props.error}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
      >
        {
          options.map(option => (
            <LD.Option
              key={option.value}
              value={option.value}
            >
              { option.label }
            </LD.Option>
            ))
        }
      </LD.Select>
    );
  }

}

module.exports = Relay.createContainer(OptionsSelect, {
  fragments: {
    options: () => Relay.QL`
      fragment on Option @relay(plural:true) {
          value
          label
      }`
  }
});
