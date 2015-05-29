const React = require('react');
const _ = require('lodash');
var NotificationSystem = require('react-notification-system');

const FluxMixin = require('mixins/FluxMixin');
const StoreWatchMixin = require('mixins/StoreWatchMixin');

const TabbedArea = require('ui/TabbedArea');
const TabPane = require('ui/TabPane');
const Popups = require('ui/Popups');
const Popup = require('ui/Popup');
const HelloWorld = require('ui/HelloWorld');

let Panoptes = React.createClass({
  mixins: [ FluxMixin, StoreWatchMixin('LayoutStore')],

  componentDidMount() {
    let store = this.getFlux().store('LayoutStore');
    store.on("notify",
      () => this.refs.notificationSystem.addNotification(store.getLastNotification()));
  },

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
            let popup = state.getIn(['components',popupId]).toObject();
            return (
              <Popup
                {...popup}
                compId={popupId}
                key={popupId}
                onMoveStop={actions.popupMove.bind(this, popupId)}
                onResizeStop={actions.popupResize.bind(this, popupId)}>
                  {React.createElement(require(popup.component), popup.props.toObject())}
              </Popup>
            )})}
        </Popups>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }

});

module.exports = Panoptes;
