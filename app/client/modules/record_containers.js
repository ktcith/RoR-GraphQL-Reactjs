import packDirectory from './packDirectory';

const requireContext = require.context('../containers/record_containers', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
