import React from 'react';
import resolvePathname from 'resolve-pathname';

const removeTrailingSlash = path => path.replace(/\/$/, '') || '/';
const resolvePathnameNoTrailingSlash = (path, currentPath) =>
  removeTrailingSlash(resolvePathname(path, currentPath));

module.exports = (router, to) => {
  if (!router) {
    throw new Error(
      `resolvePath recevied router that is undefined.  Ensure calling component has 'static contextTypes = { router: React.PropTypes.object }'`,
    );
  }
  const currentPath = `${removeTrailingSlash(router.location.pathname)}/index.html`;
  // console.log({ to, currentPath, resolved: resolvePathname(to, currentPath) });
  return resolvePathname(to, currentPath);
};
