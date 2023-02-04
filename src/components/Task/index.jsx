import React from 'react'
import './Task.css'

const Task = (props) => {

  const handleDeleteTask = async () => {
    const res = await fetch(`http://localhost:9000/api/task/${props.id}`,{
      method: 'DELETE'
    })
    const data = await res.json()
    props.setTasks((tasks) => tasks.filter(task => task._id !== props.id))
  }
  
  return (
    <div className="task" id = {props.id}>
        <div className="task-name">{props.name}</div>
        <div className="task-controller">
          <div className="task-btn">
            <i className='bx bx-edit' ></i>
          </div>
          <div className="task-btn" onClick={handleDeleteTask}>
            <i className='bx bx-trash-alt' ></i>
          </div>
        </div>
    </div>
  )
}

export default Task