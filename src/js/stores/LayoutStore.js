const Fluxxor = require('fluxxor');
const Immutable = require('immutable');

const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

var LayoutStore = Fluxxor.createStore({

  initialize: function() {
    this.state = Immutable.fromJS({
      tabs: {
        selectedTab:'T1',
        tabs: [
          {
            component: 'ui/HelloWorld',
            title: 'WTF TAB',
            compId: 'T1',
            props: {
              msg: 'WTF'
            }
          },
          {
            component: 'ui/HelloWorld',
            title: 'OMG TAB',
            compId: 'T2',
            props: {
              msg: 'OMG'
            }
          }
        ]
      },
      popups: {
        popups: [
          {
            component: 'ui/HelloWorld',
            title: 'WTF POP',
            compId: 'P1',
            props: {
              msg: 'WTF'
            }
          },
          {
            component: 'ui/HelloWorld',
            title: 'OMG POP',
            compId: 'P2',
            initPosition: {
              x: 500,
              y: 100,
              w: 300,
              h: 200
            },
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
    this.state = this.state.setIn(['tabs','selectedTab'], payload.compId);
    this.emit('change');
  },

  getState: function() {
    return this.state;
  }

});

module.exports = LayoutStore;
