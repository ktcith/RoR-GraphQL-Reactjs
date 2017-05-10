import React from 'react';
import LD from 'LD';
import { withRouter } from 'react-router';
import Modal from '../LightningDesign/Modal';

const ErrorPage500 = withRouter(({ router }) => {
  const onHide = () => {
    router.goBack();
  };

  return (
    <Modal
      opened
      onHide={onHide}
    >
      <Modal.Header title="An error occurred when loading the page." />
      <Modal.Content style={{ padding: '1em' }}>
        <div className="slds-utility-panel__body">
          <LD.Text category="body">This page could not be loaded due to an unexpected error. You may need to refresh your browser to continue using the site.</LD.Text>
        </div>
      </Modal.Content>
    </Modal>
  );
});

module.exports = ErrorPage500;
