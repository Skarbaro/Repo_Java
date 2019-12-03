import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withFirebase } from '../../services'
import { setTasks } from '../../actions'

import { Preloader } from '..'
import TasksList from './TasksList'
import AddTask from './AddTask'

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.onListenerTasks(this.props.selectedTodoUid)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedTodoUid !== prevProps.selectedTodoUid) {
      this.props.firebase.tasks().off();
      this.setState({ loading: true });
      this.onListenerTasks(this.props.selectedTodoUid)
    }
  }

  componentWillUnmount() {
    this.props.firebase.tasks().off()
  }

  onListenerTasks = todoUid => {
    this.props.firebase.tasks()
      .orderByChild('todo')
      .equalTo(todoUid)
      .on('value', snapshot => {
        this.props.onSetTasks(snapshot.val());
        this.setState({ loading: false })
      })
  };

  render() {
    let { loading } = this.state;

    return (
      <Fragment>
        { loading ? <Preloader /> : <TasksList /> }
        <AddTask />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSetTasks: tasks => {
    let listTasks = Object.keys(tasks || []).map(key => ({
      ...tasks[key],
      uid: key
    }));
    dispatch(setTasks(listTasks))
  }
});

export default compose(
  withFirebase,
  connect(null, mapDispatchToProps)
)(Tasks)
