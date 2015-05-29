const Constants = require('../constants/Constants');
const LAYOUT = Constants.LAYOUT;

let LayoutActions = {
  notify(notification) {
    this.dispatch(LAYOUT.NOTIFY, notification);
  },

  tabSwitch(compId) {
    debugger;
    this.dispatch(LAYOUT.TAB_SWITCH, {
      compId: compId
    });
  },
  popupMove(compId, pos) {
    this.dispatch(LAYOUT.POPUP_MOVE, {
      compId: compId,
      pos: pos
    });
  },
  popupResize(compId, size) {
    this.dispatch(LAYOUT.POPUP_RESIZE, {
      compId: compId,
      size: size
    });
  }
};

module.exports = LayoutActions;
