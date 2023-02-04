import React, { useEffect, useState } from 'react'
import Task from '../Task'
import './List.css'

const List = (props) => {
  const [viewAddTask, setViewAddTask] = useState(false)
  const [viewDeleteList, setViewDeleteList] = useState(false)
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')

  useEffect(()=>{
    fetch(`http://localhost:9000/api/list/${props.id}`)
    .then(res => res.json())
    .then(data => setTasks(data))
  },[])

  const showAddTask = () => {
    setTaskInput('')
    setViewAddTask(!viewAddTask)
  }

  const handleTaskInput = (e) => {
    setTaskInput(e.target.value)
  }

  const showDeleteList = () => {
    setViewDeleteList(!viewDeleteList)
  }

  const handleDeleteList = async () => {
    const res = await fetch(`http://localhost:9000/api/list/${props.id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    props.setLists((lists) => lists.filter(list => list._id !== props.id))
  }

  const handleAddTask = async () => {
    const data = {
      id: props.id,
      name: taskInput
    }

    const response = await fetch('http://localhost:9000/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const newTask = await response.json()
    setTasks((tasks) => [...tasks, newTask])
    setTaskInput('')
    setViewAddTask(false)
  }

  return (
    <div className="list" id={props.id}>
      <div className="list-header">
        <div className="list-name">{props.name}</div>
        <div className="more-btn" onClick={showDeleteList}>
          <i className='bx bx-dots-horizontal-rounded'></i>
          {viewDeleteList&&<div className="delete-list" onClick={handleDeleteList}>Delete list?</div>}
        </div>
      </div>
      <div className="list-container">
        {
          tasks.map(task =>
          <Task
            key = {task._id}
            id = {task._id}
            name = {task.name}
            setTasks = {setTasks}
          />)
        }
      </div>
      {viewAddTask && <div className="list-add-task">
        <input type="text" autoFocus className="add-task-name" value={taskInput} onChange={handleTaskInput}/>
        <i className='bx bx-check' onClick={handleAddTask} ></i>
        <i className='bx bx-x' onClick={showAddTask}></i>
      </div>}
      {!viewAddTask&&<div className="btn add-task-btn" onClick={showAddTask}>Add task</div>}
    </div>
  )
}

export default List 