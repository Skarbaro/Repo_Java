import React, { Component, lazy, Suspense } from 'react'

import { withTasks } from '../../hocs'

import { Preloader } from '..'

const TaskEditMode = lazy(() => import('./TaskEditMode'));

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  onToggleActive = event => {
    event.preventDefault();
    this.setState(state => ({
      isActive: !state.isActive
    }))
  };

  onCreateTask = (event, text, deadline) => {
    event.preventDefault();
    this.props.onCreateTask(text, deadline);
    this.onToggleActive(event)
  };

  render() {
    let { isActive } = this.state;

    return (
      isActive ?
        <Suspense fallback={<Preloader />}>
          <TaskEditMode
            onSubmit={this.onCreateTask}
            onCancel={this.onToggleActive}
          />
        </Suspense> :
        <button
          onClick={this.onToggleActive}
          className='btn-flat waves-effect waves-teal'
        ><i className='material-icons left'>add</i>New Task</button>
    )
  }
}

export default withTasks(AddTask)
