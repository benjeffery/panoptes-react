const React = require('react');
const TodoStore = require('../stores/TodoStore');
const ActionCreator = require('../actions/TodoActionCreators');
const TaskList = require('./TaskList.jsx');
const TabbedArea = require('./TabbedArea.jsx');

let App = React.createClass({

  getInitialState() {
    return {
      tasks: []
    }
  },

  _onChange() {
    this.setState(TodoStore.getAll());
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  handleAddNewClick(e) {
    let title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClearListClick(e) {
    ActionCreator.clearList();
  },

  render() {
    let {tasks} = this.state;
    return (
      <div>
        <TabbedArea activeId={this.state.key} onSelect={this.handleSelect}>
          <div id='1' tab='Tab 1'>TabPane 1 content</div>
          <div id='2' tab='Tab 2'>TabPane 2 content</div>
          <div id='3' tab='Tab 3'>TabPane 3 content</div>
        </TabbedArea>
        <h1>Learn Flux</h1>

        <TaskList tasks={tasks} />

        <button onClick={this.handleAddNewClick}>Add New</button>
        <button onClick={this.handleClearListClick}>Clear List</button>
      </div>
    );
  }

});

module.exports = App;
