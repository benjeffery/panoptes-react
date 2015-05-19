const React = require('react');
const classNames = require('classnames');

let TabPane = React.createClass({
  propTypes: {
    active: React.PropTypes.bool
  },

  render() {
    let classes = {
      'tab-pane': true,
      'active': this.props.active
    };

    return (
      <div {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = TabPane;
