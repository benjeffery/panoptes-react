const React = require('react');
const TabbedArea = require('./ui/TabbedArea.jsx');
const TabPane = require('./ui/TabPane.jsx');

let App = React.createClass({

  getInitialState() {
    return {
      activeTab: '2'
    }
  },

  //_onChange() {
  //  this.setState(TodoStore.getAll());
  //},
  //
  //componentDidMount() {
  //  TodoStore.addChangeListener(this._onChange);
  //},
  //
  //componentWillUnmount() {
  //  TodoStore.removeChangeListener(this._onChange);
  //},

  //handleAddNewClick(e) {
  //  let title = prompt('Enter task title:');
  //  if (title) {
  //    ActionCreator.addItem(title);
  //  }
  //},
  //
  //handleClearListClick(e) {
  //  ActionCreator.clearList();
  //},
  //
  handleSelect(tabId) {
    this.setState({activeTab: tabId});
  },

  render() {
    let {tasks} = this.state;
    return (
      <div>
        <TabbedArea activeTab={this.state.activeTab} onSelect={this.handleSelect}>
          <TabPane tabId='1' tab='Tab 1'>TabPane 1 content</TabPane>
          <TabPane tabId='2' tab='Tab 2'>TabPane 2 content</TabPane>
          <TabPane tabId='3' tab='Tab 3'>TabPane 3 content</TabPane>
        </TabbedArea>
      </div>
    );
  }

});

module.exports = App;


//Store for UI state, then maybe look at yahoos dispatchr for per large ui component stores.
//Transirory wizards and things don't need stores, they generate actions on the stores.... I think. But have to manage reference to global UI store and component stores.