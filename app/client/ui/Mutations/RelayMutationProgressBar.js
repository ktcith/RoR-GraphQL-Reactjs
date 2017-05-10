import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import LD from 'LD';
import ProgressBar from 'react-progress-bar-plus';
import { printTransactionErrors } from 'lib';

class RelayMutationProgressBar extends React.Component {

  state = {
    transactions: {},
  };

  sweep_success = (id) => {
    setTimeout(
      () => {
        const transactions = Object.assign({}, this.state.transactions);
        Object.keys(transactions).forEach((key) => {
          if (key === id && transactions[key].status === 'success') {
            delete transactions[key];
          }
        });
        this.setState({ transactions });
      },
      1500,
    );
  };

  commit = (mutation, { onSuccess, onFailure } = {}) => {
    // console.log({ mutation });
    // console.log({ mutation, onSuccess, onFailure });
    const onThisSuccess = (response) => {
      const id = Object.values(response)[0].clientMutationId;
      const transactions = Object.assign({}, this.state.transactions);
      transactions[id] = { id, status: 'success', transaction: null };
      this.setState({ transactions });
      this.sweep_success(id);
      if (onSuccess) {
        onSuccess(response);
      }
    };

    const onThisFailure = (transaction) => {
      // console.log({ transaction });
      const transactions = Object.assign({}, this.state.transactions);
      const messages = transaction.getError().source.errors.map(e => e.message);
      transactions[transaction._id] = { id: transaction._id, status: 'error', messages };
      printTransactionErrors(transaction);
      this.setState({ transactions });
      if (onFailure) {
        onFailure(transaction);
      }
    };

    // Put the transaction in state so we can track it.
    const rt = Relay.Store.commitUpdate(mutation, { onSuccess: onThisSuccess, onFailure: onThisFailure });
    const transactions = Object.assign({}, this.state.transactions);
    transactions[rt._id] = { id: rt._id, status: 'submitting', transaction: rt };
    this.setState({ transactions });
  };

  status = () => {
    // console.log({ state: this.state });
    const values = Object.values(this.state.transactions);
    const error_count = values.filter(v => v.status === 'error').length;
    const submitting_count = values.filter(v => v.status === 'submitting').length;
    const success_count = values.filter(v => v.status === 'success').length;

    if (submitting_count > 0) {
      return 'submitting';
    }

    if (error_count > 0) {
      return 'error';
    }

    if (success_count > 0) {
      return 'success';
    }

    return null;
  };

  closeError = (id) => {
    const transactions = Object.assign({}, this.state.transactions);
    delete transactions[id];
    this.setState({ transactions });
  };

  renderNotification = ({ id, messages }) => {
    return (
      <LD.Toast key={`${id}`} icon="warning" level="error" onClose={() => this.closeError(id)} alertTexture={false}>
        {messages.join(' ')}
      </LD.Toast>
    );
  };

  renderErrors = () => {
    const errors = Object.values(this.state.transactions).filter(v => v.status === 'error');
    return errors.length > 0
      ? <div style={{ zIndex: '100000', position: 'absolute', top: '1em', right: '10px' }}>
        {errors.map(this.renderNotification)}
      </div>
      : <span />;
  };

  render() {
    const status = this.status();
    // console.log(Object.keys(this.state.transactions));
    return (
      <span>
        {status === 'submitting' ? <ProgressBar spinner={false} autoIncrement intervalTime={200} onTop /> : undefined}
        {status === 'success' ? <ProgressBar percent={100} spinner={false} /> : undefined}
        {this.renderErrors()}
      </span>
    );
  }

}

module.exports = RelayMutationProgressBar;
