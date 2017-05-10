import packDirectory from './packDirectory';

const requireContext = require.context('../containers/option_containers', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
