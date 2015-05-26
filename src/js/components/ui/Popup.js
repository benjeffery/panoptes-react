const React = require('react');
const PureRenderMixin = require('mixins/PureRenderMixin');
const _ = require('lodash');

const Draggable = require('react-draggable');
const Resizable = require('react-resizable').Resizable;


let Popup = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    title: React.PropTypes.string, //Used in title bar
    initPosition: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
    }),
    initSize: React.PropTypes.shape({
      w: React.PropTypes.number,
      h: React.PropTypes.number
    }),
    onMoveStop: React.PropTypes.func,
    onResizeStop: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      title: 'Popup',
      initPosition: {
        x: 100,
        y: 100
      },
      initSize: {
        width: 300,
        height: 200
      }
    };
  },

  getInitialState() {
    return _.clone(this.props.initSize);
  },

  handleResize(event, {element, size}) {
    this.setState(size);
  },
  handleResizeStop(event, {element, size}) {
    if (this.props.onResizeStop)
      this.props.onResizeStop(size);
  },
  handleMoveStop(event, ui) {
    let {left, top} = ui.position;
    if (this.props.onMoveStop)
      this.props.onMoveStop({x:left, y:top})
  },

  render() {
    let { initPosition, initSize, ...other } = this.props;
    return (
      <Draggable handle='.header'
                 start={initPosition}
                 moveOnStartChange={true}
                 onStop={this.handleMoveStop}>
        <Resizable width={initSize.width} height={initSize.height}
                   minConstraints={[150, 150]}
                   maxConstraints={[500, 300]}
                   onResize={this.handleResize}
                   onResizeStop={this.handleResizeStop}>
          <div className="popup"
               style={this.state}
               {...other}>
            <div className="header">
              Header
            </div>
            <div className="body">
              {this.props.children}
            </div>
          </div>
        </Resizable>
      </Draggable>
    );
  }

});

module.exports = Popup;
