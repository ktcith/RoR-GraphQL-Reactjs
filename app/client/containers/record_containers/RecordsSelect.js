import { React, Relay, Link, UI, LD } from 'StandardImports';

class RecordsSelect extends React.Component {

  static propTypes = {
    includeBlank: React.PropTypes.bool
  };

  static defaultProps = {
    includeBlank: true
  };

  render() {
    const { records } = this.props;
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
          this.props.includeBlank ?
            <LD.Option value={null} /> :
            undefined
        }
        {
          records.map(record => (
            <LD.Option
              key={record.id}
              value={record.id}
            >
              { record.to_s }
            </LD.Option>
            ))
        }
      </LD.Select>
    );
  }

}

module.exports = Relay.createContainer(RecordsSelect, {
  fragments: {
    records: () => Relay.QL`
      fragment on Record @relay(plural:true) {
          id
          to_s
      }`
  }
});
