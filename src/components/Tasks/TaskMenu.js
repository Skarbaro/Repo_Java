import React, { Component, Fragment } from 'react'
import M from 'materialize-css'

class TaskMenu extends Component {
  componentDidMount() {
    this.dropdown = M.Dropdown.init(this._dropdown, {
      alignment: 'right',
      container: document.body
    })
  }

  componentWillUnmount() {
    this.dropdown && this.dropdown.destroy()
  }

  renderTrigger = () => (
    <a
      ref={a => { this._dropdown = a }}
      data-target='task_menu'
      className='dropdown-trigger secondary-content no-autoinit'
      href='#!'
    ><i className='material-icons'>more_vert</i></a>
  );

  renderContent = () => {
    let { task, onRemoveTask, onToggleEditMode } = this.props;

    return (
      <ul id='task_menu' className='dropdown-content'>
        <li><a
          onClick={onToggleEditMode}
          href='#!'
        ><i className='material-icons'>mode_edit</i>Edit</a></li>
        <li><a
          onClick={() => onRemoveTask(task)}
          href='#!'
        ><i className='material-icons'>delete</i>Remove</a></li>
      </ul>
    )
  };

  render() {
    return (
      <Fragment>
        {this.renderTrigger()}
        {this.renderContent()}
      </Fragment>
    )
  }
}

export default TaskMenu
