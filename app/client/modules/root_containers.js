import packDirectory from './packDirectory';

const requireContext = require.context('../containers/root_containers', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
