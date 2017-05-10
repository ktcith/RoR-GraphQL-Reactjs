import React from 'react';
import LD from 'LD';
import { withRouter } from 'react-router';
import Modal from '../LightningDesign/Modal';

module.exports = withRouter(({ router }) => {
  const onHide = () => {
    router.goBack();
  };

  return (
    <Modal
      opened
      onHide={onHide}
    >
      <Modal.Header title="The page you were looking for doesn't exist." />
      <Modal.Content style={{ padding: '1em' }}>
        <div className="slds-utility-panel__body">
          <LD.Text category="body">You may have mistyped the address or the page may have moved.</LD.Text>
        </div>
      </Modal.Content>
    </Modal>
  );
});
