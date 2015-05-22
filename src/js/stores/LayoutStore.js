const Fluxxor = require('fluxxor');
const Immutable = require('immutable');

const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

var LayoutStore = Fluxxor.createStore({

  initialize: function() {
    this.state = Immutable.fromJS({
      tabs: {
        selectedTab:'1',
        tabs: [
          {
            component: 'ui/HelloWorld',
            name: 'WTF TAB',
            tabId: '1',
            props: {
              msg: 'WTF'
            }
          },
          {
            component: 'ui/HelloWorld',
            name: 'OMG TAB',
            tabId: '2',
            props: {
              msg: 'OMG'
            }
          }
        ]
      }

    });

    this.bindActions(
      LAYOUT.TAB_SWITCH, this.switchTab
    );
  },

  switchTab: function(payload) {
    this.state = this.state.setIn(['tabs','selectedTab'], payload.tabId);
    this.emit('change');
  },

  getState: function() {
    return this.state;
  }

});

module.exports = LayoutStore;
