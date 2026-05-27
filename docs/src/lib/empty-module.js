// Empty module fallback for Node.js-only modules in browser bundles
// toolmetry uses try/catch require('crypto') which gracefully handles this
module.exports = {};
