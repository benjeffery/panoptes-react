const Fluxxor = require('fluxxor');
const Immutable = require('immutable');
const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

var LayoutStore = Fluxxor.createStore({

  initialize: function() {
    this.state = Immutable.fromJS({
          selectedTab:'1'
    });

    this.bindActions(
      LAYOUT.TAB_SWITCH, this.switchTab
    );
  },

  switchTab: function(payload) {
    this.state = this.state.set('selectedTab', payload.tabId);
    this.emit('change');
  },

  getState: function() {
    return this.state;
  }

});

module.exports = LayoutStore;
