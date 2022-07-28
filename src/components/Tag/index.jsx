import React, { useState } from 'react'
import './Tag.css'

const Tag = (props) => {
  
  const [update, setUpdate] = useState(false)
  const [updateName, setUpdateName] = useState(props.name)

  const handleTagName = () => {
    setUpdate(!update)
  }

  return (
    <div className="tag" >
    {
      (update) 
      ? <input
        type="text" 
        className="tag-name" 
        autoFocus
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
      />
      : <div className="tag-name">{updateName}</div>
    }
        <div className="tag-icons">
          <div 
            className="tag-icon"
            onClick={handleTagName}
          >
          {
            (update) 
            ? <i className='bx bx-check' ></i>
            : <i className='bx bx-pencil'></i>
          }
          </div>
          <div className="tag-icon">
            <i className='bx bx-trash'></i>
          </div>
        </div>
    </div>
  )
}

export default Tag