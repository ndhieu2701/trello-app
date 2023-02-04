import React, { useEffect, useState } from 'react'
import List from '../List'
import './Board.css'

const Board = (props) => {
  const [lists, setLists] = useState([])
  const [list, setList] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
   fetch(`http://localhost:9000/api/board/${props.id}`)
    .then(res => res.json())
    .then(data => setLists(data))
  }, [])

  let target
  let nodeClone
  let placeHolder
  let positionX
  let positionY
  let changeData = {}
  let taskNextSiblingId
  let flagMove = false
  let isDragging = false

  const handleMouseDown = (e) => {
    // move task 
    if(e.target.closest('.task')||e.target.closest('.task-name')){
      flagMove = true
      //init node clone and target to clone
      target = e.target.closest('.task')
      nodeClone = target.cloneNode(true)

      //get position of mouse when click to the target
      const targetInfo = target.getBoundingClientRect()
      positionX = e.clientX - targetInfo.left
      positionY = e.clientY - targetInfo.top

      //append and style the clone
      e.target.closest('.board-container').append(nodeClone)
      nodeClone.style.position = 'absolute'
      nodeClone.style.pointerEvents = "none"
      nodeClone.style.width = targetInfo.width + "px";
      nodeClone.style.display ="none"

      //create, style and append place holder
      placeHolder = document.createElement('div')
      placeHolder.id = "place-holder"
      e.target.closest('.board-container').append(placeHolder)
      placeHolder.classList.add('task')
      placeHolder.style.width = targetInfo.width + "px"
      placeHolder.style.height = targetInfo.height + "px"
      placeHolder.style.backgroundColor = "#e2dcc8"
      placeHolder.style.display = "none"

      //put fromListId and targetId to change data
      changeData.fromListId = e.target.closest('.list').id
      changeData.taskChangeId = target.id
      // set taskNextSibling id to check to put request 
      taskNextSiblingId = target.nextSibling ? target.nextSibling.id : "null"
    }
    //move list
    if(e.target.matches('.list')||e.target.matches('.list-header')||e.target.closest('.list-name')){
      flagMove = false

      target = e.target.closest('.list')
      nodeClone = target.cloneNode(true)

      //get position of mouse when click to the target
      const targetInfo = target.getBoundingClientRect()
      positionX = e.clientX - targetInfo.left
      positionY = e.clientY - targetInfo.top

      //append and style the clone
      e.target.closest('.board-container').append(nodeClone)
      nodeClone.style.position = 'absolute'
      nodeClone.style.pointerEvents = "none"
      nodeClone.style.width = targetInfo.width + "px";
      nodeClone.style.display ="none"

      //create, style and append place holder
      placeHolder = document.createElement('div')
      placeHolder.id = "place-holder"
      e.target.closest('.board-container').append(placeHolder)
      placeHolder.classList.add('list')
      placeHolder.style.width = targetInfo.width + "px"
      placeHolder.style.height = targetInfo.height + "px"
      placeHolder.style.backgroundColor = "#e2dcc8"
      placeHolder.style.display = "none"
      
      //set list id change for changeData
      changeData.listChange = e.target.closest('.list').id
      changeData.listNextSibling = e.target.closest('.list').nextSibling.id
    }
  }

  const handleMouseMove = (e) => {
    if(nodeClone){
      if(flagMove){
        //set style for clone, target clone and place holder when mouse move
        nodeClone.style.display = "flex"
        placeHolder.style.display = "block"
        nodeClone.style.top = e.clientY - positionY  + "px"
        nodeClone.style.left = e.clientX - positionX + "px"
        target.style.display = "none"
        
        //add place holder
        let positionItem = (e.target.getBoundingClientRect().bottom + e.target.getBoundingClientRect().top) / 2
        if(e.target.closest('.list-container') && e.target.closest('.list-container').hasChildNodes()){
          if(e.clientY > positionItem ) {
            e.target.closest('.task').parentNode.insertBefore(placeHolder, e.target.closest('.task').nextSibling)
          }
          else if(e.clientY < positionItem ) {
            e.target.closest('.task').parentNode.insertBefore(placeHolder, e.target.closest('.task'))
          }
        }
        else if(!e.target.closest('.list-container') && e.target.closest('.list')){
          e.target.closest('.list').querySelector('.list-container').appendChild(placeHolder)
        }
      }
  
      if(!flagMove){
        isDragging = true
        //set style for clone, target clone and place holder when mouse move
        nodeClone.style.display = "block"
        placeHolder.style.display = "block"
        nodeClone.style.top = e.clientY - positionY  + "px"
        nodeClone.style.left = e.clientX - positionX + "px"
        target.style.display = "none"

        //add place holder
        if(e.target.closest('.list')){
          const left = e.target.getBoundingClientRect().left
          const width = e.target.getBoundingClientRect().width
          const checkLeft = e.clientX - width / 2 - left < 0 ? true : false
          if(checkLeft){
            e.target.closest('.list').parentNode.insertBefore(placeHolder,e.target.closest('.list'))
          }
          else {
            e.target.closest('.list').parentNode.insertBefore(placeHolder,e.target.closest('.list').nextSibling)
          }
        }
      }
      //scroll horizontal
      const boardContainer = document.querySelector('.board-container')
      let nodeCloneRight = nodeClone.getBoundingClientRect().right
      let nodeCloneLeft = nodeClone.getBoundingClientRect().left
      let boardRight = boardContainer.getBoundingClientRect().right
      let boardLeft = boardContainer.getBoundingClientRect().left

      if(nodeCloneRight >= boardRight){
        setTimeout( boardContainer.scrollBy(nodeCloneRight - boardRight, 0), 500)
      }
      else if(nodeCloneLeft <= boardLeft){
        setTimeout(boardContainer.scrollBy( nodeCloneLeft - boardLeft  , 0), 500)
      }
    }
  }

  const putData = async (data) => {
    const res = await fetch(`http://localhost:9000/api/${data.changeFrom}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  const handleMouseUp = (e) => {
    if(nodeClone){
      if(flagMove){
        if(e.target.closest('.list-container')){
          //add task to list
          document.getElementById("place-holder").closest('.list-container')?.insertBefore(target, placeHolder)
          target.style.display = "flex"
  
          //set data to put request 
          changeData.toListId = e.target.closest('.list').id
          changeData.toTaskNextSiblingId = e.target.closest('.task').nextSibling ? e.target.closest('.task').nextSibling.id : "null"
          changeData.changeFrom = "list"
          //put request to server
          if(!(changeData.fromListId == changeData.toListId && changeData.toTaskNextSiblingId == taskNextSiblingId)){
            putData(changeData)
          }
        }
        else {
          target.style.display = "flex"
        }
      }
  
      if(!flagMove){
        if(e.target.closest('.list') && isDragging){
          //add task to list
          document.getElementById("place-holder").closest('.board-container')?.insertBefore(target, placeHolder)
          target.style.display = "block"
  
          //set data to put request 
          const nextSibling = e.target.closest('.list').nextSibling
          const addListBtn = document.querySelector('.add-list-controller')
          if(nextSibling != addListBtn){
            changeData.toListChange = nextSibling.id
          }
          else {
            changeData.toListChange = "null"
          }
          changeData.changeFrom = "board"
          //put request to server
          if(nextSibling.id != changeData.listNextSibling){
            putData(changeData)
          }
        }
        else {
          target.style.display = "block"
        }
        isDragging = false
      }
      nodeClone.remove()
      nodeClone = null
      placeHolder.remove()
    }
  }

  const showAddList = () => {
    setInputValue('')
    setList(!list)
  }

  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }
  
  const addList = async () => {
    const data = {
      name: inputValue,
      taskIDs: []
    }
    const res = await fetch(`http://localhost:9000/api/board/${props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const newList = await res.json()
    setLists((lists)=>[...lists, newList])
    setList(false)
    setInputValue('')
  }

  return (
    <div className="board" id={props.id} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="board-header">
        <h2 className="board-name">{props.name}</h2>
      </div>
      <div className="board-container" >
        {
          lists.map(list => 
            <List
              key = {list._id}
              id = {list._id}
              name = {list.name}
              tasks = {list.taskIDs}
              setLists = {setLists}
            />
          )
        }
         <div className="add-list-controller">
            <button className="btn board-btn" onClick={showAddList}>Add list</button>
            {list&&<div className="add-list">
              <input type="text" autoFocus className="add-list-input" value={inputValue} onChange={handleInputValue}/>
              <i className='bx bx-check' onClick={addList} ></i>
              <i className='bx bx-x' onClick={showAddList}></i>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Board
