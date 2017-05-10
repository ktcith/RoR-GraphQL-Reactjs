import React from 'react';
import Relay from 'react-relay';
import LD from 'LD';

class RecordHeader extends React.Component {

  figure = (record) => {
    const transactions = this.props.relay.getPendingTransactions(record);
    if (transactions && transactions.length > 0) {
      return (<LD.Icon
        category="standard"
        icon="generic_loading"
      />);
    }
    return (<LD.Icon
      category={record.icon.category}
      icon={record.icon.icon}
    />);
  };

  headerDetail = () => {
    console.log(this.props.details);
    if (this.props.details) {
      return (
        <LD.PageHeaderDetail>
          {
            Object.keys(this.props.details)
              .map(key => this.detailItem(key, this.props.details[key]))
          }
        </LD.PageHeaderDetail>
      );
    }
    return undefined;
  };

  detailItem = (label, value) => (
    <LD.PageHeaderDetailItem label={label} key={label}>
      <LD.Text
        category="body"
        type="regular"
        truncate
        title={value}
      >
        {value && value !== '' ? value : <i>Blank</i>}
      </LD.Text>
    </LD.PageHeaderDetailItem>
    );

  render() {
    const { record } = this.props;
    // const transactions = this.props.relay.getPendingTransactions(record);

    return (
      <LD.PageHeader>
        <LD.PageHeaderHeading
          legend={record.icon.legend}
          title={record.to_s}
          figure={this.figure(record)}
          rightActions={
            <LD.ButtonGroup key={2} className="slds-button-space-left">
              {this.props.children}
            </LD.ButtonGroup>
            }
        />
        {this.headerDetail()}
      </LD.PageHeader>
    );
  }

}

module.exports = Relay.createContainer(RecordHeader, {
  fragments: {
    record: () => Relay.QL`
      fragment on Record {
        to_s
        icon {
          icon
          category
          legend
        }
    }`
  }
});
