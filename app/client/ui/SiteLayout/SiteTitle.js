import React from 'react';
import { Helmet } from 'react-helmet';

module.exports = ({ title }) => {
  const finalTitle = [title, "Application™"].filter(s => !!s).join(" - ");

  return (
    <Helmet>
      <title>{ finalTitle }</title>
    </Helmet>
  );
};
