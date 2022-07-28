import React, { useState } from 'react'
import Tag from '../Tag'
import './List.css'

const todos = [
    {
    "_id": "62dfb44f5ea98d7022398598",
    "name": "Learn HTML"
    },
    {
    "_id": "62dfb46a5ea98d7022398599",
    "name": "Learn CSS"
    },
    {
    "_id": "62dfb46d5ea98d702239859a",
    "name": "Learn JavaScript"
    },
    {
    "_id": "62dfb4765ea98d702239859b",
    "name": "Learn ReactJS"
    },
    {
    "_id": "62dfb4a35ea98d702239859c",
    "name": "Learn MongoDB"
    },
    {
    "_id": "62dfb4b15ea98d702239859d",
    "name": "Learn ExpressJS"
    }
]
const List = () => {
    const [showOption, setShowOption] = useState(false)
    const [showAddTag, setShowAddTag] = useState(false)
    const [Tags, setTags] = useState(todos)

    const [name, setName] = useState('')

    const handleShowOption = () => {
        setShowOption(!showOption)
    }

    const handleShowAddTag = () => {
        if(!showAddTag){
            setShowAddTag(!showAddTag)  
        }
    }

    const addTag = () => {
        if(name){
            todos.push({
                _id: Math.random(),
                name: name
            })
            setTags(todos)
            setName('')
            setShowAddTag(!showAddTag)
        }
    }

    const hideTag = () => {
        setName('')
        setShowAddTag(!showAddTag)
    }

    return (
        <div className="list">
            <div className="list-header">
                <p className="list-name">todo list 11111111111</p>
                <div
                    className="more-btn"
                    onClick={handleShowOption}
                >
                    <i className='bx bx-dots-horizontal-rounded'></i>
                    {showOption && <div className="more-options">
                        <div
                            className="more-option"
                            onClick={handleShowAddTag}
                        >Add todo</div>
                        <div className="more-option">Delete list</div>
                    </div>}
                </div>
            </div>
            <div className="list-container">
                {
                    Tags.map((todo,index) => (
                    <Tag 
                        key={index} 
                        index = {index}
                        name={todo.name} 
                        setTags = {setTags}
                    />
                ))}
            </div>
            <div className="add-tag-controller">
                {showAddTag && <div className="input-controller" >
                    <input 
                        type="text" 
                        value={name} 
                        id= '1'
                        autoFocus
                        className="input-todo"
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="input-btn-controller">
                        <div 
                            className="input-btn"
                            onClick={()=>addTag(name)}
                        >
                            <i className='bx bx-check'></i>
                        </div>
                        <div 
                            className="input-btn"
                            onClick={()=>hideTag()}
                        >
                            <i className='bx bx-x' ></i>
                        </div>
                    </div>
                </div>}
                <button
                    className="btn add-tag-btn"
                    onClick={handleShowAddTag}>
                    <i className='bx bx-plus'></i>
                    Add todo
                </button>
            </div>
        </div>
    )
}

export default List