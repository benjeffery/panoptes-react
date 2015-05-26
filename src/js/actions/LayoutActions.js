const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

let LayoutActions = {
  tabSwitch: function(compId) {
    this.dispatch(LAYOUT.TAB_SWITCH, {
      compId: compId
    });
  },
  popupMove: function(compId, pos) {
    this.dispatch(LAYOUT.POPUP_MOVE, {
      compId: compId,
      pos: pos
    });
  },
  popupResize: function(compId, size) {
    this.dispatch(LAYOUT.POPUP_RESIZE, {
      compId: compId,
      size: size
    });
  }
};

module.exports = LayoutActions;
