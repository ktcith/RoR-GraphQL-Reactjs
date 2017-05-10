function baseName(str) {
  let base = str.substring(str.lastIndexOf('/') + 1);
  if (base.lastIndexOf('.') !== -1) {
    base = base.substring(0, base.lastIndexOf('.'));
  }
  return base;
}

function packDirectory(requireContext, debug = false) {
  const results = {};
  /* eslint no-restricted-syntax: 0 */
  for (const filePath of requireContext.keys()) {
    const m = requireContext(filePath);
    filePath.replace(/\.[^/.]+$/, '');
    if (debug) {
      console.log(filePath);
    }
    results[baseName(filePath)] = m;
  }
  return results;
}

module.exports = packDirectory;
