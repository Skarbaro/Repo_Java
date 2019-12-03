import React, { Component, lazy, Suspense } from 'react'

import TaskInfo from './TaskInfo'
import { Preloader } from '..'

const TaskEditMode = lazy(() => import('./TaskEditMode'));

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
  }

  onToggleEditMode = event => {
    event.preventDefault();
    this.setState(state => ({
      editMode: !state.editMode
    }))
  };

  onEditTask = (event, text, deadline) => {
    event.preventDefault();
    this.props.onEditTask(this.props.task, text, deadline);
    this.onToggleEditMode(event)
  };

  render() {
    let { task, onRemoveTask, onExecution } = this.props;
    let { editMode } = this.state;

    return (
      editMode ?
        <li className='collection-item grey lighten-3'>
          <Suspense fallback={<Preloader />}>
            <TaskEditMode
              task={task}
              onSubmit={this.onEditTask}
              onCancel={this.onToggleEditMode}
            />
          </Suspense>
        </li> :
        <TaskInfo
          task={task}
          onRemoveTask={onRemoveTask}
          onExecution={onExecution}
          onToggleEditMode={this.onToggleEditMode}
        />
    )
  }
}

export default TaskItem
