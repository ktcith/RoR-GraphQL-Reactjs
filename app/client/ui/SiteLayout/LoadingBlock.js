import React from 'react';
import { Spinner } from 'react-lightning-design-system';

const LoadingBlock = () => {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Spinner type="brand" size="large" />
    </div>
  );
};

module.exports = LoadingBlock;
