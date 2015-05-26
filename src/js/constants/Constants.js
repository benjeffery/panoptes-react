const keyMirror = require('react/lib/keyMirror');
const _ = require('lodash');

function nameSpace(namespace, obj) {
  let res = {};
  _.forOwn(obj, (key, val) => res[key] = namespace+'_'+val);
  return res;
}

let layout = keyMirror({
  TAB_SWITCH: null,
  POPUP_MOVE: null,
  POPUP_RESIZE: null
});


module.exports = {
  LAYOUT:nameSpace('LAYOUT', layout)
};
