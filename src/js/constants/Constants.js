const keyMirror = require('react/lib/keyMirror');
const _ = require('lodash');

function nameSpace(namespace, obj) {
  let res = {};
  _.forOwn(obj, (key, val) => res[key] = namespace+'_'+val);
  return res;
}

let layout = keyMirror({
  TAB_SWITCH: null
});


module.exports = {
  LAYOUT:nameSpace('LAYOUT', layout)
};
