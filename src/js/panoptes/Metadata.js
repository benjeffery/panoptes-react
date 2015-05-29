const Network = require('panoptes/Network');
const SQL = require('panoptes/SQL');
const database = "Ag1000G";

function fetchMetadata() {
  let Metadata = {};
  return Network.getRequestJSON({
    datatype: 'custom',
    respmodule:'panoptesserver',
    respid: 'serverstatus'
  })
  .then(status => {
      if ('issue' in status)
        throw Error(status.issue);
      Metadata.userId = status.userid;
  })
  .then(() => Network.pageQuery({
      database: database,
      table: 'chromosomes',
      columns: {id: 'ST', len: 'ST'}
    }))
  .then(data => Metadata.chromosomes = data)
  .then(() => Metadata)
}

module.exports = {
  fetchMetadata: fetchMetadata
};
