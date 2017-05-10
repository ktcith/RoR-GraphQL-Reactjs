import packDirectory from './packDirectory';

const requireContext = require.context('../mutations/incident_mutations', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
