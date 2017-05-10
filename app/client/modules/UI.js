import packDirectory from './packDirectory';

const requireContext = require.context('../ui', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
