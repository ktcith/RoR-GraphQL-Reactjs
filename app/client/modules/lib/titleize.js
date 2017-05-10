module.exports = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, (m) => {
      return m.toUpperCase();
    })
    .replace(/(-|_)/g, ' ');
};
