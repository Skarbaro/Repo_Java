import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withFirebase } from '../services'

const withTasks = Component => {
  class WithTasks extends React.Component {
    onCreateTask = (text, deadline = null) => {
      this.props.firebase.tasks().push({
        todo: this.props.selectedTodo.uid,
        text: text,
        done: false,
        deadline: deadline,
        dateOfCreation: this.props.firebase.serverValue
      }).then(
        this.props.firebase.todo(this.props.selectedTodo.uid).update({
          quantityTasks: this.props.selectedTodo.quantityTasks + 1
        })
      )
    };

    onRemoveTask = task => {
      this.props.firebase.task(task.uid).remove()
        .then(
          this.props.firebase.todo(this.props.selectedTodo.uid).update({
            quantityTasks: this.props.selectedTodo.quantityTasks - 1
          })
        )
    };

    onExecution = task => {
      this.props.firebase.task(task.uid).update({
        done: !task.done
      })
    };

    onEditTask = (task, text, deadline = null) => {
      this.props.firebase.task(task.uid).update({
        text,
        deadline
      })
    };

    render() {
      return <Component
        {...this.props}
        onCreateTask={this.onCreateTask}
        onRemoveTask={this.onRemoveTask}
        onExecution={this.onExecution}
        onEditTask={this.onEditTask}
      />
    }
  }

  const mapStateToProps = ({ selectedTodo, todosState }) => ({
    selectedTodo,
    tasks: todosState.tasks
  });

  return compose(
    withFirebase,
    connect(mapStateToProps)
  )(WithTasks)
};

export default withTasks
