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
    let state = this.state;

    return (
      <div>
        <TabbedArea activeTab={state.getIn(['tabs','selectedTab'])}
                    onSelect={actions.tabSwitch}>
          {state.getIn(['tabs','components']).map(tabId => {
            let tab = state.getIn(['components',tabId]);
            return (
              <TabPane
                compId={tabId}
                key={tabId}
                title={tab.get('title')}>
                  {React.createElement(require(tab.get('component')), tab.get('props').toObject())}
              </TabPane>
            )})}
        </TabbedArea>
        <Popups>
          {state.getIn(['popups','components']).map(popupId => {
            let popup = state.getIn(['components',popupId]);
            return (
              <Popup
                compId={popupId}
                key={popupId}
                title={popup.get('title')}
                initPosition={popup.get('initPosition')}
                initSize={popup.get('initSize')}
                onMoveStop={actions.popupMove.bind(this, popupId)}
                onResizeStop={actions.popupResize.bind(this, popupId)}>
                  {React.createElement(require(popup.get('component')), popup.get('props').toObject())}
              </Popup>
            )})}
        </Popups>
      </div>
    );
  }

});

module.exports = Panoptes;
