import packDirectory from './packDirectory';

const requireContext = require.context('../mutations/account_mutations', true, /.*\.jsx?$/);
module.exports = packDirectory(requireContext);
