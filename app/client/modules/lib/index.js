import packDirectory from '../packDirectory';

const requireContext = require.context('./', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
