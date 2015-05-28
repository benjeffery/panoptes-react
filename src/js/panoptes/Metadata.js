const Network = require('panoptes/Network');

function fetchMetadata() {
  let Metadata = {};
  return Network.getRequest(Network.serverURL,'panoptesserver','serverstatus')
  .then(status => {
      if ('issue' in status)
        throw status.issue;
      Metadata.userId = status.userid;
  })
  .then(() => Metadata);
}

module.exports = {
  fetchMetadata: fetchMetadata
};
