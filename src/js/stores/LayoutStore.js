const Fluxxor = require('fluxxor');
const Immutable = require('immutable');

const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

var LayoutStore = Fluxxor.createStore({

  initialize: function () {
    this.state = Immutable.fromJS({
      components: {
        'T1': {
          component: 'ui/HelloWorld',
          title: 'WTF TAB',
          props: {
            msg: 'WTF'
          }
        },
        'T2': {
          component: 'ui/HelloWorld',
          title: 'OMG TAB',
          props: {
            msg: 'OMG'
          }
        },
        'P1': {
          component: 'ui/HelloWorld',
          title: 'WTF POP',
          props: {
            msg: 'WTF'
          }
        },
        'P2': {
          component: 'ui/HelloWorld',
          title: 'OMG POP',
          initPosition: {
            x: 500,
            y: 100,
          },
          initSize: {
            width: 300,
            height: 200
          },
          props: {
            msg: 'OMG'
          }
        }
      },
      tabs: {
        selectedTab: 'T1',
        components: ['T1', 'T2']
      },
      popups: {
        popups: ['P1', 'P2']

      }

    });

    this.bindActions(
      LAYOUT.TAB_SWITCH, this.tabSwitch,
      LAYOUT.POPUP_MOVE, this.popupMove,
      LAYOUT.POPUP_RESIZE, this.popupResize
    );
  },

  tabSwitch: function (payload) {
    this.state = this.state.setIn(['tabs', 'selectedTab'], payload.compId);
    this.emit('change');
  },

  popupMove: function (payload) {
    let {compId, pos} = payload;
    this.state = this.state.mergeIn(['components', compId, 'initPosition'], pos);
    this.emit('change');
  },

  popupResize: function (payload) {
    let {compId, size} = payload;
    this.state = this.state.mergeIn(['components', compId, 'initSize'], size);
    this.emit('change');
  },

  getState: function () {
    return this.state;
  }

});

module.exports = LayoutStore;
