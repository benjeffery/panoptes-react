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

  renderTab(child, index) {
    let that = this;
    function onClick(e) {
      that.handleClick(e, child.props.tabId)
    }
    let classes = {
      tab: true,
      active: (child.props.tabId === this.props.activeTab),
      inactive: (child.props.tabId !== this.props.activeTab)
    };
    return (
      <div className={classNames(classes)} onClick={onClick}>
        {child.props.tab}
      </div>
    )
  },

  renderPane(child, index) {
    return React.cloneElement(
      child,
      {
        active: (child.props.tabId === this.props.activeTab),
        key: child.key ? child.key : index
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

  handleClick(e, tabId) {
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(tabId);
    }
  }
});

module.exports = TabbedArea;
