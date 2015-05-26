const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

let LayoutActions = {
  switchTab: function(compId) {
    this.dispatch(LAYOUT.TAB_SWITCH, { compId: compId });
  }
};

module.exports = LayoutActions;
