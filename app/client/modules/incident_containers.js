import packDirectory from './packDirectory';

const requireContext = require.context('../containers/incident_containers', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
