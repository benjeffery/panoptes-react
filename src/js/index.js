const React = require('react');
const Fluxxor = require('fluxxor');
const Panoptes = require('components/Panoptes.js');
const LayoutStore = require('stores/LayoutStore');
const LayoutActions = require('actions/LayoutActions');

const Metadata = require('panoptes/Metadata');

Metadata.fetchMetadata()
  .then(data => console.log(data))
  .catch(data => console.log(data));

let stores = {
  LayoutStore: new LayoutStore()
};

let actions = {
  layout: LayoutActions
};

let flux = new Fluxxor.Flux(stores, actions);
React.render(<Panoptes flux={flux}/>, document.getElementById('main'));
