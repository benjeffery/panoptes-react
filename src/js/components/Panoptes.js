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
        <TabbedArea activeTab={state.tabs.selectedTab} onSelect={actions.tabSwitch}>
          {_.map(state.tabs.components, tabId => {
            let tab = state.components[tabId];
            return (
              <TabPane
                compId={tabId}
                key={tabId}
                title={tab.title}>
                  {React.createElement(require(tab.component), tab.props)}
              </TabPane>
            )})}
        </TabbedArea>
        <Popups>
          {_.map(state.popups.popups, popupId => {
            let popup = state.components[popupId];
            return (
              <Popup
                compId={popupId}
                key={popupId}
                title={popup.title}
                initPosition={popup.initPosition}
                initSize={popup.initSize}
                onMoveStop={actions.popupMove.bind(this, popupId)}
                onResizeStop={actions.popupResize.bind(this, popupId)}>
                  {React.createElement(require(popup.component), popup.props)}
              </Popup>
            )})}
        </Popups>
      </div>
    );
  }

});

module.exports = Panoptes;