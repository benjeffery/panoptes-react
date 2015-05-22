const React = require('react');
const _ = require('lodash');

const FluxMixin = require('mixins/FluxMixin');
const StoreWatchMixin = require('mixins/StoreWatchMixin');

const TabbedArea = require('ui/TabbedArea');
const TabPane = require('ui/TabPane');

const forceImport = require('ui/HelloWorld');



let App = React.createClass({
  mixins: [ FluxMixin, StoreWatchMixin('LayoutStore')],

  getStateFromFlux() {
    return this.getFlux().store('LayoutStore').getState();
  },



  render() {
    let actions = this.getFlux().actions.layout;
    let state = this.state.toJS();

    let tabs = _.map(state.tabs.tabs, (tab) =>
      <TabPane
        tabId={tab.tabId}
        key={tab.tabId}
        tabName={tab.name}>
        {React.createElement(require(tab.component), tab.props)}
      </TabPane>);

    return (
      <div>
        <TabbedArea activeTab={state.tabs.selectedTab} onSelect={actions.switchTab}>
          {tabs}
        </TabbedArea>
      </div>
    );
  }

});

module.exports = App;
