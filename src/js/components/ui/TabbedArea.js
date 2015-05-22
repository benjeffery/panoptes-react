const React = require('react');
const ValidComponentChildren = require('../utils/ValidComponentChildren');
const classNames = require('classnames');
const PureRenderMixin = require('mixins/PureRenderMixin');

let TabbedArea = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    activeTab: React.PropTypes.any,
    onSelect: React.PropTypes.func
  },

  renderTab(tab) {
    let id = tab.props.tabId;
    let classes = {
      tab: true,
      active: (id === this.props.activeTab),
      inactive: (id !== this.props.activeTab)
    };
    return (
      <div className={classNames(classes)}
           key = {id}
           onClick={this.handleClick.bind(this, id)}>
        {tab.props.tabName}
      </div>
    )
  },

  renderPane(tab) {
    return React.cloneElement(
      tab,
      {
        active: (tab.props.tabId === this.props.activeTab),
        key: tab.props.tabId
      })
  },

  render() {
    return (
      <div {...this.props} className="tabbed-area">
        <div id={this.props.id} className="tabs">
          {ValidComponentChildren.map(this.props.children, this.renderTab, this)}
        </div>
        <div id={this.props.id} className="tab-content">
          {ValidComponentChildren.map(this.props.children, this.renderPane, this)}
        </div>
      </div>
    )
  },

  handleClick(tabId, e) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(tabId);
    }
  }
});

module.exports = TabbedArea;
