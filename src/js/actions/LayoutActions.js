const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

let LayoutActions = {
  switchTab: function(tabId) {
    this.dispatch(LAYOUT.TAB_SWITCH, { tabId: tabId });
  }
};

module.exports = LayoutActions;
