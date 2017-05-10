import packDirectory from './packDirectory';

const requireContext = require.context('../mutations/root_mutations', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
