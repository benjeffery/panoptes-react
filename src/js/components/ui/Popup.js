const React = require('react');
const PureRenderMixin = require('mixins/PureRenderMixin');

const Draggable = require('react-draggable');
const Resizable = require('react-resizable').Resizable;



let Popup = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    title: React.PropTypes.string, //Used in title bar
    initPosition: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number,
      w: React.PropTypes.number,
      h: React.PropTypes.number
    }),
  },

  getDefaultProps() {
    return {
      title: 'Popup',
      initPosition: {
        x: 100,
        y: 100,
        w: 300,
        h: 200
      }
    };
  },

  getInitialState() {
    return {
      position: this.props.initPosition
    };
  },

  onResize(event, {element, size}) {
    this.setState({position:{w:size.width, h:size.height}});
  },

  render() {
    let { initPosition, ...other } = this.props;
    let {w, h} = this.state.position;
    return (
      <Draggable handle='.header' start={initPosition} moveOnStartChange={true}>
        <Resizable width={initPosition.w} height={initPosition.h}
                   minConstraints={[150, 150]}
                   maxConstraints={[500, 300]}
                   onResize={this.onResize}>
          <div className="popup"
               style={{width: w + 'px', height: h + 'px'}}
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
