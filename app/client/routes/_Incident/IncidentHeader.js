import React from 'react';
import Relay from 'react-relay';
import LD from 'LD';

class IncidentHeader extends React.Component {

  headerDetail = () => {
    const { incident } = this.props;
    const details = {
      "Started On": incident.started_on,
      City: incident.city,
      State: incident.state,
      "Time Zone": incident.time_zone,
      Complexity: incident.incident_classification_text
    };
    if (details) {
      return (
        <LD.PageHeaderDetail>
          {
            Object.keys(details)
              .map(key => this.detailItem(key, details[key]))
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

  render() {
    const record = this.props.incident;
    // const transactions = this.props.relay.getPendingTransactions(record);

    return (
      <LD.PageHeader>
        <LD.PageHeaderHeading
          legend={record.incident_type}
          title={record.to_s}
          figure={this.figure(record)}
          rightActions={
            <LD.ButtonGroup key={2} className="slds-button-space-left">
              {this.props.children}
            </LD.ButtonGroup>
            }
        />
        {this.props.noDetails ? undefined : this.headerDetail()}
      </LD.PageHeader>
    );
  }

}

module.exports = Relay.createContainer(IncidentHeader, {
  fragments: {
    incident: () => Relay.QL `
      fragment on Incident {
        name
        started_on
        ended_on
        city
        state
        description
        status
        incident_type_text
        incident_classification_text
        time_zone
        to_s
        icon {
          icon
          category
          legend
        }
    }`
  }
});
