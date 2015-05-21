const React = require('react');
const Fluxxor = require('fluxxor');
const Panoptes = require('components/Panoptes.jsx');
const LayoutStore = require('stores/LayoutStore');
const LayoutActions = require('actions/LayoutActions');

let stores = {
  LayoutStore: new LayoutStore()
};

let actions = {
  layout: LayoutActions
};

let flux = new Fluxxor.Flux(stores, actions);
React.render(<Panoptes flux={flux}/>, document.getElementById('main'));
