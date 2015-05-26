const React = require('react');
const _ = require('lodash');

const FluxMixin = require('mixins/FluxMixin');
const StoreWatchMixin = require('mixins/StoreWatchMixin');

const TabbedArea = require('ui/TabbedArea');
const TabPane = require('ui/TabPane');
const Popups = require('ui/Popups');
const Popup = require('ui/Popup');
const HelloWorld = require('ui/HelloWorld');

let Panoptes = React.createClass({
  mixins: [ FluxMixin, StoreWatchMixin('LayoutStore')],

  getStateFromFlux() {
    return this.getFlux().store('LayoutStore').getState();
  },

  render() {
    let actions = this.getFlux().actions.layout;
    let state = this.state.toJS();

    return (
      <div>
        <TabbedArea activeTab={state.tabs.selectedTab} onSelect={actions.switchTab}>
          {_.map(state.tabs.tabs, (tab) =>
            <TabPane
              compId={tab.compId}
              key={tab.compId}
              title={tab.title}>
              {React.createElement(require(tab.component), tab.props)}
            </TabPane>)}
        </TabbedArea>
        <Popups>
          {_.map(state.popups.popups, (popup) =>
            <Popup
              compId={popup.compId}
              key={popup.compId}
              title={popup.title}
              initPosition={popup.initPosition}>
              {React.createElement(require(popup.component), popup.props)}
            </Popup>)}
        </Popups>
      </div>
    );
  }

});

module.exports = Panoptes;