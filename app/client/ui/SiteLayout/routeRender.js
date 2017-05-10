import React from 'react';
import ErrorPage500 from '../ErrorPages/ErrorPage500';
import LoadingBlock from './LoadingBlock';

const routeRender = ({ renderLoading, renderRelayLoading, renderError }) => {
  return (params) => {
    // console.log("routeRender", params);
    const { done, error, element, props } = params;
    if (error) {
      // console.log("routeRender - error");
      if (renderError) {
        return renderError(error);
      }

      return <ErrorPage500 error={error} />;
    } else if (!props) {
      // console.log("routeRender - loading");
      if (renderLoading) {
        return (renderLoading)(params);
      }
      return <LoadingBlock />;
    } else if (!done) {
      // console.log("routeRender - loading (not done)");
      if (renderRelayLoading) {
        return (renderRelayLoading)(params);
      }
    }
    // console.log("routeRender - component");
    return React.cloneElement(element, props);
  };
};

module.exports = routeRender;
