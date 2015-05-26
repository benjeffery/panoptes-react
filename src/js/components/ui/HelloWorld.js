const React = require('react');
const PureRenderMixin = require('mixins/PureRenderMixin');

let HelloWorld = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    msg: React.PropTypes.string
  },

  render() {
    let { msg, ...other } = this.props;
    return (
      <div {...other}>
        Hello World! {msg}
      </div>
    );
  }

});

module.exports = HelloWorld;
