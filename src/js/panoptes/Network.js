const Qajax = require('qajax');
const _ = require('lodash');

const serverURL = "http://www.malariagen.net/apps/ag1000g/phase1-AR2/api";

//TODO: Refactor server errors to closer to HTTP standard
function filterError(json) {
  if (typeof(json) !== 'object') {
    if (json.indexOf('Authentication')>0)
      throw 'Client is not authenticated';
    throw 'Invalid server response type';
  }
  if ('Error' in json) {
    if (json.Error=='NotAuthenticated') {
      throw "Not Authenticated"
    }
    else
      throw `Error: ${json.Error}`;
  }
  return Promise.resolve(json);
}

function getRequest(serverURL, respmodule, respid, data) {
  data = data || {};
  let url = `${serverURL}?datatype=custom&respmodule=${respmodule}&respid=${respid}`;
  _.forOwn(data,function(val, id) {
    url += `&${id}=${val}`;
  });
  return Qajax({url: url, method: "GET"})
    .then(Qajax.filterSuccess)
    .then(Qajax.toJSON)
    .then(filterError);
}

module.exports = {
  serverURL: serverURL,
  getRequest: getRequest
};