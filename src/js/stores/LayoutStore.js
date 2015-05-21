const Fluxxor = require('fluxxor');
const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

var LayoutStore = Fluxxor.createStore({
  initialize: function() {
    this.state = {
      topLevelTab:'1'
    };

    this.bindActions(
      LAYOUT.TAB_SWITCH, this.switchTab
    );
  },

  switchTab: function(payload) {
    this.state.topLevelTab = payload.tabId;
    this.emit('change');
  },

  getState: function() {
    return this.state;
  }

});

module.exports = LayoutStore;
