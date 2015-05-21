const React = require('react');
const FluxMixin = require('mixins/FluxMixin');
const StoreWatchMixin = require('mixins/StoreWatchMixin');

const TabbedArea = require('ui/TabbedArea.jsx');
const TabPane = require('ui/TabPane.jsx');


let App = React.createClass({
  mixins: [ FluxMixin, StoreWatchMixin('LayoutStore')],

  getStateFromFlux() {
    return this.getFlux().store('LayoutStore').getState();
  },

  render() {
    let actions = this.getFlux().actions.layout;
    return (
      <div>
        <TabbedArea activeTab={this.state.topLevelTab} onSelect={actions.switchTab}>
          <TabPane tabId='1' tab='Tab 1'>TabPane 1 content</TabPane>
          <TabPane tabId='2' tab='Tab 2'>TabPane 2 content</TabPane>
          <TabPane tabId='3' tab='Tab 3'>TabPane 3 content</TabPane>
        </TabbedArea>

      </div>
    );
  }

});

module.exports = App;
