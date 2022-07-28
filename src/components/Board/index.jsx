import React from 'react'
import List from '../List'
import './Board.css'

const Board = () => {
  let nodeClone
  let target
  let mousePositionInX = 0
  let mousePositionInY = 0

  const handleMouseDown = (e) => {
    //tao clone va set position cho clone
    if(e.target.matches('.tag')||e.target.matches('.tag-name')) {
      target = e.target.closest('.tag')
      let targetInfo = target.getBoundingClientRect()
      // mousePositionInX = e.clientX 
      // mousePositionInY = e.clientY
      nodeClone = target.cloneNode(true)
      document.body.appendChild(nodeClone)
      nodeClone.style.width = targetInfo.width + "px"
      nodeClone.style.position = 'absolute'
      nodeClone.style.visibility = 'hidden'
    }
  }

  const handleMouseMove = (e) => {
    if(nodeClone){
      nodeClone.style.visibility = 'visible'
      nodeClone.style.left = e.clientX  + 'px'
      nodeClone.style.top = e.clientY  + 'px'
    }
  }
  
  return (
    <div className="board" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
        <div className="board-header">
            <div className="board-name">To do list</div>
        </div>
        <div className="board-container" >
            <List/>
            <List/>
        </div>
    </div>
  )
}

export default Board